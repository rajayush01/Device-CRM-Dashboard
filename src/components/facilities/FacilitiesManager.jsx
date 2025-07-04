import React, { useState } from 'react';
import { Plus, MapPin, Trash2 } from 'lucide-react';
import { mockFacilities } from '../../data/mockData';
import FacilityForm from './FacilityForm';

const FacilitiesManager = ({ darkMode }) => {
  const [facilities, setFacilities] = useState(mockFacilities);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    setSelectedFacility(null);
    setShowForm(true);
  };

  const handleEdit = (facility) => {
    setSelectedFacility(facility);
    setShowForm(true);
  };

  const handleSave = (facility) => {
    setFacilities(prev => {
      const exists = prev.find(f => f.id === facility.id);
      if (exists) {
        return prev.map(f => (f.id === facility.id ? facility : f));
      } else {
        return [...prev, facility];
      }
    });
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this facility?')) {
      setFacilities(prev => prev.filter(f => f.id !== id));
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm`}>
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Facility Management
          </h3>
          <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2 inline" /> Add Facility
          </button>
        </div>
      </div>

      <div className="p-6">
        {showForm && (
          <div className="mb-6">
            <FacilityForm facility={selectedFacility} onSave={handleSave} onCancel={handleCancel} darkmode={darkMode} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map(facility => (
            <div key={facility.id} className={`border rounded-lg p-4 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{facility.name}</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{facility.id}</div>
                </div>
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <div>Location: {facility.location}</div>
                <div>Contact: {facility.contact}</div>
              </div>
              <div className="mt-3 flex space-x-2">
                <button onClick={() => handleEdit(facility)} className="flex-1 bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
                  Edit
                </button>
                <button onClick={() => handleDelete(facility.id)} className="flex-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                  <Trash2 className="w-4 h-4 inline mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacilitiesManager;
