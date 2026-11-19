/*
# Create project_inquiries table (single-tenant, public contact form)

1. New Tables
- `project_inquiries`
  - `id` (uuid, primary key)
  - `name` (text, not null) — submitter's full name
  - `email` (text, not null) — work email
  - `company` (text) — company name, optional
  - `project_type` (text, not null) — one of: Website Development, Web Application, E-commerce, Backend & API, Other
  - `budget` (text) — estimated budget range, optional
  - `description` (text, not null) — project description
  - `status` (text, default 'new') — inquiry status for future admin handling
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `project_inquiries`.
- Grant INSERT to `anon, authenticated` so the public contact form can submit without signing in.
- Allow public INSERT (anyone can submit an inquiry). No SELECT/UPDATE/DELETE grants for anon — only the service role / dashboard can read or manage inquiries.
- Add an INSERT policy for anon + authenticated with a lightweight CHECK that required fields are non-empty, to reject malformed submissions at the DB layer.
*/

CREATE TABLE IF NOT EXISTS project_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  project_type text NOT NULL,
  budget text,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE project_inquiries ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON project_inquiries TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_inquiry" ON project_inquiries;
CREATE POLICY "anon_insert_inquiry"
ON project_inquiries FOR INSERT
TO anon, authenticated
WITH CHECK (
  name IS NOT NULL AND length(btrim(name)) > 0
  AND email IS NOT NULL AND length(btrim(email)) > 0
  AND project_type IS NOT NULL AND length(btrim(project_type)) > 0
  AND description IS NOT NULL AND length(btrim(description)) > 0
);