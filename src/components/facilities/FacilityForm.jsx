import { useState } from 'react';

const FacilityForm = ({ facility, onSave, onCancel, darkmode }) => {
  const [formData, setFormData] = useState(facility || {
    id: '',
    name: '',
    location: '',
    contact: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const labelClass = darkmode ? 'text-gray-300' : 'text-gray-700';
  const inputClass = darkmode
    ? 'bg-gray-700 text-white border-gray-600'
    : 'bg-white text-black border-gray-300';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={`block text-sm font-medium mb-1 ${labelClass}`}>Facility ID</label>
        <input
          type="text"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          className={`w-full px-3 py-2 border rounded-md ${inputClass}`}
          required
        />
      </div>
      <div>
        <label className={`block text-sm font-medium mb-1 ${labelClass}`}>Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`w-full px-3 py-2 border rounded-md ${inputClass}`}
          required
        />
      </div>
      <div>
        <label className={`block text-sm font-medium mb-1 ${labelClass}`}>Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className={`w-full px-3 py-2 border rounded-md ${inputClass}`}
          required
        />
      </div>
      <div>
        <label className={`block text-sm font-medium mb-1 ${labelClass}`}>Contact</label>
        <input
          type="text"
          value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          className={`w-full px-3 py-2 border rounded-md ${inputClass}`}
          required
        />
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className={`px-4 py-2 border rounded-md ${
            darkmode ? 'text-gray-300 border-gray-500 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
          }`}
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

export default FacilityForm;
