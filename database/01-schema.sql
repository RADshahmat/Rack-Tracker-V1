-- Create racks table
CREATE TABLE IF NOT EXISTS racks (
  id SERIAL PRIMARY KEY,
  tag VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(100),
  capacity INT DEFAULT 42 CHECK (capacity > 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create equipment table (serial_nb and status fields should be added in future iterations)
CREATE TABLE IF NOT EXISTS equipment (
  id SERIAL PRIMARY KEY,
  tag VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50),
  rack_id INT REFERENCES racks(id) ON DELETE SET NULL,
  slot_position INT CHECK (slot_position > 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create trigger function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for both tables
CREATE TRIGGER update_racks_updated_at
  BEFORE UPDATE ON racks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_equipment_updated_at
  BEFORE UPDATE ON equipment
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_racks_tag ON racks(tag);
CREATE INDEX idx_racks_created_at ON racks(created_at DESC);
CREATE INDEX idx_equipment_tag ON equipment(tag);
CREATE INDEX idx_equipment_rack_id ON equipment(rack_id);
CREATE INDEX idx_equipment_created_at ON equipment(created_at DESC);