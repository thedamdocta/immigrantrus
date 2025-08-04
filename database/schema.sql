-- ImmigrantsRUs CRM Database Schema
-- This can be run in Supabase or any PostgreSQL database

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50) NOT NULL,
    notes TEXT DEFAULT '',
    practice_areas TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);

-- Create index on created_at for ordering
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- Create index on practice_areas for filtering
CREATE INDEX IF NOT EXISTS idx_contacts_practice_areas ON contacts USING GIN(practice_areas);

-- Add RLS (Row Level Security) policies if using Supabase
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policy to allow all operations for authenticated users (adjust as needed)
CREATE POLICY "Allow all operations for authenticated users" ON contacts
    FOR ALL USING (true);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional)
INSERT INTO contacts (email, phone, notes, practice_areas) VALUES 
('john.doe@example.com', '+1-555-0123', 'Initial consultation completed', ARRAY['Immigration', 'Real Estate']),
('jane.smith@example.com', '+1-555-0124', 'Needs will and estate planning', ARRAY['Wills and Trust', 'Estate Planning'])
ON CONFLICT (email) DO NOTHING;
