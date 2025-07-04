import { useState } from 'react';
import { mockFacilities } from '../../data/mockData';

const DeviceForm = ({ device, onSave, onCancel, darkMode }) => {
  const [formData, setFormData] = useState(device || {
    id: '',
    type: '',
    facility: '',
    status: 'Online',
    battery: 100,
    lastService: '',
    amcStatus: 'Active',
    amcExpiry: '',
    location: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const inputClasses = `w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {[
          { label: 'Device ID', type: 'text', key: 'id' },
          { label: 'Location', type: 'text', key: 'location' },
          { label: 'Battery Level', type: 'number', key: 'battery' },
          { label: 'Last Service', type: 'date', key: 'lastService' },
          { label: 'AMC Expiry', type: 'date', key: 'amcExpiry' }
        ].map(({ label, type, key }) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              type={type}
              value={formData[key]}
              onChange={(e) => setFormData({ ...formData, [key]: type === 'number' ? parseInt(e.target.value) : e.target.value })}
              className={inputClasses}
              required={key !== 'lastService' && key !== 'amcExpiry'}
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className={inputClasses}
            required
          >
            <option value="">Select Type</option>
            {['Ventilator', 'Patient Monitor', 'Infusion Pump', 'Defibrillator'].map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Facility</label>
          <select
            value={formData.facility}
            onChange={(e) => setFormData({ ...formData, facility: e.target.value })}
            className={inputClasses}
            required
          >
            <option value="">Select Facility</option>
            {mockFacilities.map(f => (
              <option key={f.id} value={f.name}>{f.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className={inputClasses}
          >
            {['Online', 'Offline', 'Maintenance'].map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className={`px-4 py-2 border rounded-md ${darkMode ? 'text-white border-gray-600 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default DeviceForm;
