/*
  # Create AutoQA Test Results Table

  1. New Tables
    - `test_results`
      - `id` (uuid, primary key) - Unique identifier for each test
      - `url` (text) - Target website URL that was tested
      - `instructions` (text) - Test instructions provided by user
      - `status` (text) - Test result status: 'passed', 'failed', 'running'
      - `steps` (jsonb) - Array of execution steps with timestamps
      - `screenshot_url` (text) - Placeholder for screenshot reference
      - `created_at` (timestamptz) - When the test was created
      - `completed_at` (timestamptz) - When the test completed

  2. Security
    - Enable RLS on `test_results` table
    - Add policy for all users to read all test results (public app simulation)
    - Add policy for all users to insert test results
*/

CREATE TABLE IF NOT EXISTS test_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  instructions text NOT NULL,
  status text NOT NULL DEFAULT 'running',
  steps jsonb DEFAULT '[]'::jsonb,
  screenshot_url text,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view test results"
  ON test_results
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert test results"
  ON test_results
  FOR INSERT
  WITH CHECK (true);