import { useState } from 'react';
import { Upload, Save } from 'lucide-react'; 
import { mockFacilities } from '../../data/mockData';

const InstallationForm = ({ darkMode, onSubmit }) => {
  const [formData, setFormData] = useState({
    deviceId: '',
    deviceType: '',
    facility: '',
    location: '',
    engineer: '',
    installDate: '',
    notes: '',
    checklist: {
      unboxing: false,
      testing: false,
      calibration: false,
      training: false,
      documentation: false
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChecklistChange = (item) => {
    setFormData({
      ...formData,
      checklist: {
        ...formData.checklist,
        [item]: !formData.checklist[item]
      }
    });
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
      <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        New Installation
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Device ID
            </label>
            <input
              type="text"
              value={formData.deviceId}
              onChange={(e) => setFormData({...formData, deviceId: e.target.value})}
              className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Device Type
            </label>
            <select
              value={formData.deviceType}
              onChange={(e) => setFormData({...formData, deviceType: e.target.value})}
              className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              required
            >
              <option value="">Select Type</option>
              <option value="Ventilator">Ventilator</option>
              <option value="Patient Monitor">Patient Monitor</option>
              <option value="Infusion Pump">Infusion Pump</option>
              <option value="Defibrillator">Defibrillator</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Facility
            </label>
            <select
              value={formData.facility}
              onChange={(e) => setFormData({...formData, facility: e.target.value})}
              className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              required
            >
              <option value="">Select Facility</option>
              {mockFacilities.map(facility => (
                <option key={facility.id} value={facility.name}>{facility.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              placeholder="e.g., ICU-01, Ward-A"
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Engineer
            </label>
            <input
              type="text"
              value={formData.engineer}
              onChange={(e) => setFormData({...formData, engineer: e.target.value})}
              className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Installation Date
            </label>
            <input
              type="date"
              value={formData.installDate}
              onChange={(e) => setFormData({...formData, installDate: e.target.value})}
              className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              required
            />
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Installation Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            placeholder="Installation notes and observations..."
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Installation Checklist
          </label>
          <div className="space-y-3">
            {Object.entries(formData.checklist).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleChecklistChange(key)}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Upload Photos
          </label>
          <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
            <div className="space-y-1 text-center">
              <Upload className={`mx-auto h-12 w-12 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Upload files</span>
                  <input type="file" className="sr-only" multiple accept="image/*" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className={`px-4 py-2 border rounded-md text-sm font-medium ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
          >
            <Save className="w-4 h-4 mr-2 inline" />
            Save Installation
          </button>
        </div>
      </form>
    </div>
  );
};

export default InstallationForm;