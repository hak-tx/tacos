import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ttuxfmabkxwxsckvubqe.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0dXhmbWFia3h3eHNja3Z1YnFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NDM1MzEsImV4cCI6MjA4ODQxOTUzMX0.MEgxSIlI2xRjltLmVQ0sQ5SWxFk_iUo6iwBRQsFqk80";

// Simple in-memory rate limiter (resets on cold start, fine for serverless)
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 20; // max 20 POST requests per IP per minute

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now - entry.start > RATE_LIMIT_WINDOW) {
    rateLimit.set(ip, { start: now, count: 1 });
    return true;
  }
  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) return false;
  return true;
}

function sanitize(str, maxLen = 200) {
  if (typeof str !== "string") return "";
  return str.trim().slice(0, maxLen).replace(/[<>]/g, "");
}

function getSupabase(authHeader) {
  if (authHeader) {
    return createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

// GET /api/recs?stop=0
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const stopIndex = searchParams.get("stop");
  if (stopIndex === null) return NextResponse.json({ error: "stop param required" }, { status: 400 });

  const stopNum = parseInt(stopIndex);
  if (isNaN(stopNum) || stopNum < 0 || stopNum > 50) {
    return NextResponse.json({ error: "Invalid stop index" }, { status: 400 });
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("recommendations")
    .select("*")
    .eq("tour_stop_index", stopNum)
    .order("votes", { ascending: false })
    .limit(50);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

// POST /api/recs
// Body: { stop: 0, name: "...", address: "...", action: "add" | "upvote" | "remove", recId?: "..." }
export async function POST(request) {
  // Rate limiting
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests. Try again in a minute." }, { status: 429 });
  }

  const authHeader = request.headers.get("authorization");
  const supabase = getSupabase(authHeader);

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { stop, name, address, action, recId } = body;

  // Validate action
  if (!["add", "upvote", "remove"].includes(action)) {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  // Validate stop index
  const stopNum = parseInt(stop);
  if (isNaN(stopNum) || stopNum < 0 || stopNum > 50) {
    return NextResponse.json({ error: "Invalid stop index" }, { status: 400 });
  }

  if (action === "add") {
    const cleanName = sanitize(name, 150);
    const cleanAddress = sanitize(address, 300);
    if (!cleanName || cleanName.length < 2) {
      return NextResponse.json({ error: "Name is required (2+ characters)" }, { status: 400 });
    }

    // Check if already exists for this tour stop
    const { data: existing } = await supabase
      .from("recommendations")
      .select("id, votes")
      .eq("tour_stop_index", stopNum)
      .ilike("name", cleanName)
      .single();

    if (existing) {
      const { error } = await supabase
        .from("recommendations")
        .update({ votes: existing.votes + 1 })
        .eq("id", existing.id);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ action: "upvoted", id: existing.id });
    }

    const { data, error } = await supabase
      .from("recommendations")
      .insert({ tour_stop_index: stopNum, name: cleanName, address: cleanAddress, votes: 1 })
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ action: "added", id: data.id });
  }

  if (action === "upvote" && recId) {
    if (typeof recId !== "string" || recId.length > 100) {
      return NextResponse.json({ error: "Invalid recId" }, { status: 400 });
    }
    const { data: rec } = await supabase
      .from("recommendations")
      .select("votes")
      .eq("id", recId)
      .single();
    if (!rec) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const { error } = await supabase
      .from("recommendations")
      .update({ votes: rec.votes + 1 })
      .eq("id", recId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ action: "upvoted" });
  }

  if (action === "remove" && recId) {
    if (typeof recId !== "string" || recId.length > 100) {
      return NextResponse.json({ error: "Invalid recId" }, { status: 400 });
    }
    const { error } = await supabase
      .from("recommendations")
      .delete()
      .eq("id", recId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ action: "removed" });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
