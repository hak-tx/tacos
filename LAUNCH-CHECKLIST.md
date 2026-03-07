# TACOS SETLIST — PRE-LAUNCH SECURITY CHECKLIST
## Complete these steps before sharing the live URL

---

## 1. SET VERCEL ENVIRONMENT VARIABLES
Go to: https://vercel.com/hak-txs-projects/tacos/settings/environment-variables

Add these two variables (all environments: Production, Preview, Development):

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ttuxfmabkxwxsckvubqe.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0dXhmbWFia3h3eHNja3Z1YnFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NDM1MzEsImV4cCI6MjA4ODQxOTUzMX0.MEgxSIlI2xRjltLmVQ0sQ5SWxFk_iUo6iwBRQsFqk80` |

After adding, click "Redeploy" on the latest deployment to pick them up.

---

## 2. RESTRICT MAPKIT JWT (STOP WILDCARD ORIGIN)
Your current Apple MapKit JWT has `"origin": "*"` which means anyone can use it.

### Steps:
1. Go to https://developer.apple.com/account/resources/authkeys/list
2. Find your MapKit JS key (Key ID: P35KKKC9LQ, Team ID: 9S372WGPR4)
3. Generate a new JWT token using your private key with this payload:
   ```json
   {
     "iss": "9S372WGPR4",
     "iat": <current_unix_timestamp>,
     "exp": <timestamp_1_year_from_now>,
     "origin": "https://tacos-lime.vercel.app"
   }
   ```
4. You can generate it with this Node.js script (save as `gen-mapkit-jwt.js`):
   ```js
   const jwt = require('jsonwebtoken');
   const fs = require('fs');
   
   // Your private key file from Apple Developer portal
   const privateKey = fs.readFileSync('./AuthKey_P35KKKC9LQ.p8');
   
   const token = jwt.sign({}, privateKey, {
     algorithm: 'ES256',
     expiresIn: '365d',
     issuer: '9S372WGPR4',
     header: {
       kid: 'P35KKKC9LQ',
       typ: 'JWT',
       alg: 'ES256'
     }
   });
   
   // Add origin claim manually or use payload:
   const tokenWithOrigin = jwt.sign(
     { origin: 'https://tacos-lime.vercel.app' },
     privateKey,
     {
       algorithm: 'ES256',
       expiresIn: '365d',
       issuer: '9S372WGPR4',
       header: { kid: 'P35KKKC9LQ', typ: 'JWT', alg: 'ES256' }
     }
   );
   
   console.log(tokenWithOrigin);
   ```
5. Replace the token on line 324 of `app/TacoTourApp.jsx`
6. Commit and push

---

## 3. CREATE RICH'S ADMIN ACCOUNT IN SUPABASE
Go to: https://supabase.com/dashboard (select your tacos project)

### Step 3a: Run the schema (if not already done)
Go to SQL Editor → New Query → paste the contents of `setup-supabase.sql` → Run

### Step 3b: Create Rich's user account
Go to Authentication → Users → "Add User" → "Create New User"
- Email: rich@richotoole.com
- Password: (use a STRONG password, NOT GodTexasTacos2026)
- Check "Auto Confirm User"

### Step 3c: Set Rich as admin
Go to SQL Editor → New Query → Run:
```sql
-- Set Rich as admin (run AFTER creating the user above)
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb), 
  '{role}', 
  '"admin"'
)
WHERE email = 'rich@richotoole.com';

-- Also update the profiles table
UPDATE profiles 
SET role = 'admin', name = 'Rich O''Toole', city = 'Houston, TX'
WHERE email = 'rich@richotoole.com';
```

---

## 4. REVOKE EXPOSED GITHUB TOKEN
Go to: https://github.com/settings/tokens

1. Find the token starting with `ghp_SCIr...`
2. Click "Delete" to revoke it
3. Create a new token:
   - Click "Generate new token (classic)"
   - Name: "Tacos Deploy" 
   - Expiration: 90 days
   - Scopes: check `repo` only
   - Copy the new token and save it securely
4. Update the project memory in Claude with the new token

---

## 5. CONFIGURE SUPABASE AUTH SETTINGS
Go to: https://supabase.com/dashboard → Authentication → URL Configuration

Set these:
- **Site URL**: `https://tacos-lime.vercel.app`
- **Redirect URLs**: Add `https://tacos-lime.vercel.app` and `https://tacos-lime.vercel.app/**`

This ensures password reset emails link back to the correct site.

### Email Templates (optional but recommended):
Go to Authentication → Email Templates
- Customize the "Reset Password" template with Tacos Setlist branding
- Customize the "Confirm Signup" template

---

## 6. VERIFY RLS POLICIES ARE ACTIVE
Go to SQL Editor → New Query → Run:
```sql
-- Check all tables have RLS enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Should show 'true' for: profiles, recommendations, votes, fan_ratings, spot_votes
```

If any show `false`, run:
```sql
ALTER TABLE <tablename> ENABLE ROW LEVEL SECURITY;
```

---

## STATUS AFTER COMPLETING ALL STEPS:
- ✅ No hardcoded passwords in source code
- ✅ Real bcrypt auth via Supabase (not localStorage)
- ✅ Password reset via email
- ✅ MapKit JWT restricted to your domain only
- ✅ GitHub token rotated (old one revoked)
- ✅ API rate-limited and input-validated
- ✅ RLS policies active on all tables
- ✅ Supabase auth redirects configured
- ✅ Environment variables set in Vercel (not hardcoded fallbacks)

---

## REMAINING NICE-TO-HAVES (post-launch):
- Replace stock Unsplash photos with Rich's real taco photos
- Integrate Bandsintown API for live tour date updates
- Upload Canva OG image (Option D) as static PNG
- Build out fan leaderboard with real Supabase data
- Add email verification requirement for signups
