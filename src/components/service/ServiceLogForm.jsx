import { useState } from 'react';

const ServiceLogForm = ({ serviceLog, onSave, onCancel, devices, darkMode }) => {
  const [formData, setFormData] = useState(serviceLog || {
    id: '',
    deviceId: '',
    date: '',
    engineer: '',
    type: 'Preventive',
    notes: '',
    status: 'Pending'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const inputClasses = `w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`;
  const labelClass = `block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>
        <div>
          <label className={labelClass}>Service ID</label>
          <input
            type="text"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            className={inputClasses}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Device ID</label>
          <select
            value={formData.deviceId}
            onChange={(e) => setFormData({ ...formData, deviceId: e.target.value })}
            className={inputClasses}
            required
          >
            <option value="">Select Device</option>
            {devices.map(device => (
              <option key={device.id} value={device.id}>
                {device.id} - {device.type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className={inputClasses}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Engineer</label>
          <input
            type="text"
            value={formData.engineer}
            onChange={(e) => setFormData({ ...formData, engineer: e.target.value })}
            className={inputClasses}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className={inputClasses}
          >
            <option value="Preventive">Preventive</option>
            <option value="Breakdown">Breakdown</option>
            <option value="Calibration">Calibration</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className={inputClasses}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
          className={`${inputClasses} resize-none`}
        />
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

export default ServiceLogForm;
