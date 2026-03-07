-- ============================================
-- TACOS SETLIST - SUPABASE SCHEMA + RLS
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. PROFILES (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Taco Fan',
  email TEXT,
  city TEXT DEFAULT 'Texas',
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  review_count INT DEFAULT 0,
  agree_count INT DEFAULT 0,
  xp INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Anyone can read profiles (leaderboards, etc)
CREATE POLICY "Profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile on signup
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. RECOMMENDATIONS (fan picks per tour stop)
CREATE TABLE IF NOT EXISTS recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_stop_index INT NOT NULL,
  name TEXT NOT NULL,
  address TEXT DEFAULT '',
  votes INT DEFAULT 1,
  added_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;

-- Anyone can read recommendations
CREATE POLICY "Recommendations are viewable by everyone" ON recommendations
  FOR SELECT USING (true);

-- Logged-in users can add recommendations
CREATE POLICY "Logged-in users can add recommendations" ON recommendations
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Users can delete their own recommendations, admins can delete any
CREATE POLICY "Users can delete own recommendations" ON recommendations
  FOR DELETE USING (
    auth.uid() = added_by 
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Anyone can update vote count (upvotes)
CREATE POLICY "Anyone logged in can upvote" ON recommendations
  FOR UPDATE USING (auth.uid() IS NOT NULL);

-- 3. VOTES (track who voted on what, prevent duplicates)
CREATE TABLE IF NOT EXISTS votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recommendation_id UUID NOT NULL REFERENCES recommendations(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, recommendation_id)
);

ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Users can see their own votes
CREATE POLICY "Users can view own votes" ON votes
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own votes
CREATE POLICY "Users can insert own votes" ON votes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can delete their own votes
CREATE POLICY "Users can delete own votes" ON votes
  FOR DELETE USING (auth.uid() = user_id);

-- 4. FAN RATINGS (per-user rating on each spot)
CREATE TABLE IF NOT EXISTS fan_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  spot_id INT NOT NULL,
  rating NUMERIC(3,1) NOT NULL CHECK (rating >= 1 AND rating <= 10),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, spot_id)
);

ALTER TABLE fan_ratings ENABLE ROW LEVEL SECURITY;

-- Anyone can read ratings (for aggregate scores)
CREATE POLICY "Fan ratings are viewable by everyone" ON fan_ratings
  FOR SELECT USING (true);

-- Users can insert their own ratings
CREATE POLICY "Users can insert own ratings" ON fan_ratings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own ratings
CREATE POLICY "Users can update own ratings" ON fan_ratings
  FOR UPDATE USING (auth.uid() = user_id);

-- 5. SPOT VOTES (agree/disagree on Rich's reviews)
CREATE TABLE IF NOT EXISTS spot_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  spot_id INT NOT NULL,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('agree', 'disagree')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, spot_id)
);

ALTER TABLE spot_votes ENABLE ROW LEVEL SECURITY;

-- Anyone can read spot votes (for counts)
CREATE POLICY "Spot votes are viewable by everyone" ON spot_votes
  FOR SELECT USING (true);

-- Users can insert their own votes
CREATE POLICY "Users can insert own spot votes" ON spot_votes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own votes (change agree/disagree)
CREATE POLICY "Users can update own spot votes" ON spot_votes
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete own votes
CREATE POLICY "Users can delete own spot votes" ON spot_votes
  FOR DELETE USING (auth.uid() = user_id);

-- 6. Create a function to handle new user signups
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, name, email, city, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'Taco Fan'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'city', 'Texas'),
    'user'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

