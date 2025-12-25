-- Core multi-tenant schema

-- Tenants (each agency/workspace)
CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Profiles (maps to your auth user id later)
-- id should match the auth user UUID (Supabase Auth or your auth provider)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'client_user')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Clients (belong to a tenant)
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'onboarding', 'inactive')),
  industry TEXT NULL,
  owner_profile_id UUID NULL REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Client access (which client_user can see which client)
CREATE TABLE IF NOT EXISTS client_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (client_id, profile_id)
);
-- =========================
-- Meetings (MVP)
-- =========================

CREATE TABLE IF NOT EXISTS meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,

  title TEXT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  duration_minutes INT NOT NULL DEFAULT 30 CHECK (duration_minutes > 0 AND duration_minutes <= 480),

  -- Jitsi identifiers
  room_slug TEXT NOT NULL,
  public_id TEXT NOT NULL UNIQUE, -- used in the public join URL

  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'completed', 'failed')),

  recording_status TEXT NOT NULL DEFAULT 'none'
    CHECK (recording_status IN ('none', 'processing', 'ready', 'failed')),
  transcript_status TEXT NOT NULL DEFAULT 'none'
    CHECK (transcript_status IN ('none', 'processing', 'ready', 'failed')),

  recording_url TEXT NULL,
  transcript_url TEXT NULL,

  created_by UUID NOT NULL REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Helpful index for client profile meeting lists
CREATE INDEX IF NOT EXISTS idx_meetings_client_start_time
  ON meetings (client_id, start_time DESC);
