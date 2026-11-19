/*
# Create project_inquiries table

1. New Tables
- `project_inquiries`: stores contact-form submissions from the LazyXTech website.
  - `id` (uuid, primary key)
  - `name` (text, not null) — sender's name
  - `email` (text, not null) — sender's work email
  - `company` (text) — company name, optional
  - `project_type` (text, not null) — one of: Website Development, Web Application, E-commerce, Backend & API, Other
  - `budget` (text) — estimated budget range, optional
  - `description` (text, not null) — project description
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `project_inquiries`.
- Grant INSERT only to `anon` + `authenticated` (visitors submit inquiries without an account).
- No SELECT/UPDATE/DELETE for anon or authenticated: inquiries are write-only for visitors and read only by the agency through a privileged (service_role) connection. This prevents anyone from reading other visitors' submissions.
3. Notes
- Single-tenant, no sign-in app: no user_id column, no auth.uid() usage.
*/

CREATE TABLE IF NOT EXISTS project_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  project_type text NOT NULL,
  budget text,
  description text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE project_inquiries ENABLE ROW LEVEL SECURITY;

GRANT INSERT (name, email, company, project_type, budget, description) ON project_inquiries TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_project_inquiries" ON project_inquiries;
CREATE POLICY "anon_insert_project_inquiries"
ON project_inquiries FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(name) <= 200
  AND length(email) <= 320
  AND (company IS NULL OR length(company) <= 200)
  AND project_type IN ('Website Development', 'Web Application', 'E-commerce', 'Backend & API', 'Other')
  AND (budget IS NULL OR length(budget) <= 100)
  AND length(description) <= 5000
);
