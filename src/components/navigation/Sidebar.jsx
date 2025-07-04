import React from 'react';
import { Home, Package, Settings, Wrench, ClipboardList, Bell, MapPin } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, darkMode }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'devices', label: 'Device Inventory', icon: Package },
    { id: 'installations', label: 'Installations', icon: Settings },
    { id: 'service', label: 'Service Logs', icon: Wrench },
    { id: 'contracts', label: 'AMC/CMC Tracker', icon: ClipboardList },
    { id: 'alerts', label: 'Alerts & Photos', icon: Bell },
    { id: 'facilities', label: 'Facilities', icon: MapPin }
  ];

  return (
    <div className={`w-64 h-screen ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className="p-4">
        <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Device CRM
        </h2>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
                activeTab === item.id
                  ? darkMode
                    ? 'bg-blue-900 text-blue-200'
                    : 'bg-blue-50 text-blue-600'
                  : darkMode
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;