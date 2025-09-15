-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create devices table
CREATE TABLE IF NOT EXISTS devices (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  device_address TEXT UNIQUE NOT NULL,
  device_type TEXT NOT NULL DEFAULT '未知',
  status TEXT CHECK (status IN ('online', 'offline', 'shutdown')) DEFAULT 'offline',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create experiment_data table
CREATE TABLE IF NOT EXISTS experiment_data (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
  current NUMERIC(10, 5) NOT NULL,
  voltage NUMERIC(10, 5) NOT NULL,
  power NUMERIC(10, 5) NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create file_records table
CREATE TABLE IF NOT EXISTS file_records (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  filename TEXT NOT NULL,
  file_url TEXT NOT NULL,
  upload_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  data_count INTEGER DEFAULT 0,
  status TEXT CHECK (status IN ('processing', 'completed', 'failed')) DEFAULT 'processing'
);

-- Create anomaly_records table
CREATE TABLE IF NOT EXISTS anomaly_records (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
  anomaly_type TEXT NOT NULL,
  anomaly_value JSONB NOT NULL,
  detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create simulation_records table
CREATE TABLE IF NOT EXISTS simulation_records (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  input_voltage NUMERIC(10, 2) NOT NULL,
  input_current NUMERIC(10, 2) NOT NULL,
  output_voltage NUMERIC(10, 2) NOT NULL,
  output_current NUMERIC(10, 2) NOT NULL,
  shutdown_time NUMERIC(10, 3) NOT NULL,
  simulation_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_experiment_data_device_id ON experiment_data(device_id);
CREATE INDEX idx_experiment_data_timestamp ON experiment_data(timestamp);
CREATE INDEX idx_devices_status ON devices(status);
CREATE INDEX idx_anomaly_records_device_id ON anomaly_records(device_id);
CREATE INDEX idx_anomaly_records_detected_at ON anomaly_records(detected_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for devices table
CREATE TRIGGER update_devices_updated_at BEFORE UPDATE
  ON devices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for experiment files
INSERT INTO storage.buckets (id, name, public)
VALUES ('experiment-files', 'experiment-files', true)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiment_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE anomaly_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulation_records ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since we don't have auth yet)
CREATE POLICY "Allow public read access" ON devices FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON devices FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON devices FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access" ON devices FOR DELETE USING (true);

CREATE POLICY "Allow public read access" ON experiment_data FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON experiment_data FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON experiment_data FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access" ON experiment_data FOR DELETE USING (true);

CREATE POLICY "Allow public read access" ON file_records FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON file_records FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON file_records FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access" ON file_records FOR DELETE USING (true);

CREATE POLICY "Allow public read access" ON anomaly_records FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON anomaly_records FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON anomaly_records FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access" ON anomaly_records FOR DELETE USING (true);

CREATE POLICY "Allow public read access" ON simulation_records FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON simulation_records FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON simulation_records FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access" ON simulation_records FOR DELETE USING (true);

-- Insert sample data
INSERT INTO devices (device_address, device_type, status) VALUES 
  ('1', '光伏关断器-A型', 'online'),
  ('2', '光伏关断器-B型', 'online'),
  ('3', '光伏关断器-C型', 'offline'),
  ('4', '光伏关断器-A型', 'shutdown'),
  ('5', '光伏关断器-B型', 'online')
ON CONFLICT (device_address) DO NOTHING;