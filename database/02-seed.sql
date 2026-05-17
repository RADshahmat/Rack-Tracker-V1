-- Seed racks
INSERT INTO racks (tag, name, location, capacity) VALUES
  ('RACK-A1', 'Production Rack A1', 'Data Center - Row A', 42),
  ('RACK-A2', 'Production Rack A2', 'Data Center - Row A', 42),
  ('RACK-B1', 'Development Rack B1', 'Data Center - Row B', 24),
  ('RACK-B2', 'Staging Rack B2', 'Data Center - Row B', 24),
  ('RACK-C1', 'Storage Rack C1', 'Data Center - Row C', 48);

-- Seed equipment
INSERT INTO equipment (tag, name, type, rack_id, slot_position) VALUES
  -- Rack A1 equipment
  ('SRV-001', 'Web Server 01', 'server', 1, 1),
  ('SRV-002', 'Web Server 02', 'server', 1, 3),
  ('SRV-003', 'Database Primary', 'server', 1, 5),
  ('SW-001', 'Core Switch 01', 'switch', 1, 10),
  
  -- Rack A2 equipment
  ('SRV-004', 'App Server 01', 'server', 2, 1),
  ('SRV-005', 'App Server 02', 'server', 2, 3),
  ('SRV-006', 'Database Replica', 'server', 2, 5),
  ('SW-002', 'Distribution Switch', 'switch', 2, 10),
  
  -- Rack B1 equipment
  ('DEV-001', 'Dev Server 01', 'server', 3, 1),
  ('DEV-002', 'Dev Server 02', 'server', 3, 3),
  ('DEV-003', 'Test Database', 'server', 3, 5),
  
  -- Rack B2 equipment
  ('STG-001', 'Staging Server 01', 'server', 4, 1),
  ('STG-002', 'Staging Server 02', 'server', 4, 3),
  
  -- Rack C1 equipment
  ('STO-001', 'NAS Storage 01', 'storage', 5, 1),
  ('STO-002', 'NAS Storage 02', 'storage', 5, 5),
  ('STO-003', 'Backup Storage', 'storage', 5, 10),
  
  -- Unassigned equipment
  ('SRV-007', 'Spare Web Server', 'server', NULL, NULL),
  ('SW-003', 'Spare Switch', 'switch', NULL, NULL),
  ('SRV-008', 'Spare App Server', 'server', NULL, NULL);