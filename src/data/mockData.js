const mockDevices = [
  {
    id: 'DEV001',
    type: 'Ventilator',
    facility: 'City Hospital',
    status: 'Online',
    battery: 85,
    lastService: '2024-06-15',
    amcStatus: 'Active',
    amcExpiry: '2025-01-15',
    location: 'ICU-01'
  },
  {
    id: 'DEV002',
    type: 'Patient Monitor',
    facility: 'Metro Medical',
    status: 'Offline',
    battery: 23,
    lastService: '2024-06-10',
    amcStatus: 'Expiring',
    amcExpiry: '2024-07-20',
    location: 'Ward-A'
  },
  {
    id: 'DEV003',
    type: 'Infusion Pump',
    facility: 'Regional Hospital',
    status: 'Maintenance',
    battery: 0,
    lastService: '2024-06-01',
    amcStatus: 'Expired',
    amcExpiry: '2024-06-30',
    location: 'Surgery'
  }
];

const mockServiceLogs = [
  {
    id: 'SL001',
    deviceId: 'DEV001',
    date: '2024-06-15',
    engineer: 'John Smith',
    type: 'Preventive',
    notes: 'Routine maintenance completed',
    status: 'Completed'
  },
  {
    id: 'SL002',
    deviceId: 'DEV002',
    date: '2024-06-10',
    engineer: 'Sarah Johnson',
    type: 'Breakdown',
    notes: 'Battery replacement required',
    status: 'Pending'
  }
];

const mockFacilities = [
  { id: 'FAC001', name: 'City Hospital', location: 'Downtown', contact: '+1234567890' },
  { id: 'FAC002', name: 'Metro Medical', location: 'Midtown', contact: '+1234567891' },
  { id: 'FAC003', name: 'Regional Hospital', location: 'Suburbs', contact: '+1234567892' }
];

const mockInstallations = [
  {
    deviceId: "DEV001",
    deviceType: "Ventilator",
    facility: "City Hospital",
    location: "ICU-01",
    engineer: "John Doe",
    installDate: "2024-11-15",
    notes: "Successfully installed with full checklist completion.",
    checklist: {
      unboxing: true,
      testing: true,
      calibration: true,
      training: true,
      documentation: true
    }
  },
  {
    deviceId: "DEV002",
    deviceType: "Patient Monitor",
    facility: "Sunrise Clinic",
    location: "Ward-B",
    engineer: "Priya Sharma",
    installDate: "2024-10-30",
    notes: "Calibration pending, rest done.",
    checklist: {
      unboxing: true,
      testing: true,
      calibration: false,
      training: true,
      documentation: true
    }
  },
  {
    deviceId: "DEV003",
    deviceType: "Infusion Pump",
    facility: "Green Valley Hospital",
    location: "ER-02",
    engineer: "Alex Kim",
    installDate: "2024-12-05",
    notes: "Training scheduled for next week.",
    checklist: {
      unboxing: true,
      testing: true,
      calibration: true,
      training: false,
      documentation: true
    }
  }
];

export { mockDevices, mockServiceLogs, mockFacilities, mockInstallations };