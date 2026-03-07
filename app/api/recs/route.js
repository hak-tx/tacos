import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ttuxfmabkxwxsckvubqe.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0dXhmbWFia3h3eHNja3Z1YnFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NDM1MzEsImV4cCI6MjA4ODQxOTUzMX0.MEgxSIlI2xRjltLmVQ0sQ5SWxFk_iUo6iwBRQsFqk80";

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

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("recommendations")
    .select("*")
    .eq("tour_stop_index", parseInt(stopIndex))
    .order("votes", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

// POST /api/recs
// Body: { stop: 0, name: "...", address: "...", action: "add" | "upvote" | "remove", recId?: "..." }
export async function POST(request) {
  const authHeader = request.headers.get("authorization");
  const supabase = getSupabase(authHeader);
  const body = await request.json();
  const { stop, name, address, action, recId } = body;

  if (action === "add") {
    // Check if already exists for this tour stop
    const { data: existing } = await supabase
      .from("recommendations")
      .select("id, votes")
      .eq("tour_stop_index", stop)
      .ilike("name", name)
      .single();

    if (existing) {
      // Upvote existing
      const { error } = await supabase
        .from("recommendations")
        .update({ votes: existing.votes + 1 })
        .eq("id", existing.id);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ action: "upvoted", id: existing.id });
    }

    // Add new
    const { data, error } = await supabase
      .from("recommendations")
      .insert({ tour_stop_index: stop, name, address, votes: 1 })
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ action: "added", id: data.id });
  }

  if (action === "upvote" && recId) {
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
    const { error } = await supabase
      .from("recommendations")
      .delete()
      .eq("id", recId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ action: "removed" });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
