import React, { useState } from 'react';
import DashboardStats from './components/dashboard/DashboardStats';
import DeviceTable from './components/devices/DeviceTable';
import ServiceLogList from './components/service/ServiceLogList';
import InstallationForm from './components/installations/InstallationForm';
import ContractTracker from './components/contracts/ContractTracker';
import FacilitiesManager from './components/facilities/FacilitiesManager';
import Header from './components/common/Header';
import { Plus, Search } from 'lucide-react';
import Sidebar from './components/navigation/Sidebar';
import AlertsAndPhotos from './components/alerts/AlertAndPhotos';
import { mockDevices, mockInstallations } from './data/mockData';
import { mockServiceLogs } from './data/mockData';
import DeviceForm from './components/devices/DeviceForm';
import InstallationTable from './components/installations/InstallationTable';
import ServiceLogForm from './components/service/ServiceLogForm';

const DeviceCRMDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [devices, setDevices] = useState(mockDevices || []);
  const [showDeviceForm, setShowDeviceForm] = useState(false);
  const [showInstallationForm, setShowInstallationForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [serviceLogs, setServiceLogs] = useState(mockServiceLogs);
  const [installations, setInstallations] = useState(mockInstallations || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');


  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.facility.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || device.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleDeviceSave = (device) => {
    setDevices((prev) => {
      const exists = prev.some((d) => d.id === device.id);
      if (exists) {
        return prev.map((d) => (d.id === device.id ? device : d));
      }
      return [...prev, device];
    });
    setShowDeviceForm(false);
    setSelectedDevice(null);
  };

  const handleDeviceEdit = (device) => {
    setSelectedDevice(device);
    setShowDeviceForm(true);
  };

  const handleDeviceDelete = (deviceId) => {
    setDevices(devices.filter(d => d.id !== deviceId));
  };

  const handleDeviceView = (device) => {
    alert(`Viewing Device:\n\n${JSON.stringify(device, null, 2)}`);
  };

  const handleDeviceAdd = () => {
    setSelectedDevice(null);
    setShowDeviceForm(true);
  };

  const handleInstallationAdd = () => setShowInstallationForm(true);

  const handleInstallationSave = (data) => {
    setInstallations(prev => [...prev, data]);
    setShowInstallationForm(false);
  };
  const handleInstallationView = (record) => {
    alert(JSON.stringify(record, null, 2));
  };

  const handleServiceLogAdd = () => setShowServiceForm(true);

  const handleServiceLogSave = (newLog) => {
    const existing = serviceLogs.find((log) => log.id === newLog.id);
    if (existing) {
      setServiceLogs((prev) =>
        prev.map((log) => (log.id === newLog.id ? newLog : log))
      );
    } else {
      setServiceLogs((prev) => [...prev, newLog]);
    }
    setShowServiceForm(false);
  };

  const handleServiceCancel = () => setShowServiceForm(false);


  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <DashboardStats darkMode={darkMode} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DeviceTable
                devices={devices.slice(0, 5)}
                darkMode={darkMode}
                onEdit={handleDeviceEdit}
                onDelete={handleDeviceDelete}
                onView={handleDeviceView}
              />
              <ServiceLogList serviceLogs={serviceLogs} darkMode={darkMode} />
            </div>
          </div>
        );

      case 'devices':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Device Inventory
              </h2>
              <button
                onClick={handleDeviceAdd}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2 inline" />
                Add Device
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search devices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 border rounded-md w-full ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`px-4 py-2 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              >
                <option value="all">All Status</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            {showDeviceForm ? (
              <DeviceForm
                device={selectedDevice}
                onSave={handleDeviceSave}
                onCancel={() => setShowDeviceForm(false)}
                darkMode={darkMode}
              />
            ) : (
              <DeviceTable
                devices={filteredDevices}
                darkMode={darkMode}
                onEdit={handleDeviceEdit}
                onDelete={handleDeviceDelete}
                onView={handleDeviceView}
              />
            )}
          </div>
        );

      case 'installations':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Installation & Training
              </h2>
              <button onClick={handleInstallationAdd} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                + New Installation
              </button>
            </div>
            {showInstallationForm ? (
              <InstallationForm darkMode={darkMode} onSubmit={handleInstallationSave} />
            ) : (
              <InstallationTable installations={installations} darkMode={darkMode} onView={handleInstallationView} />
            )}
          </div>
        );

      case 'service':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Service Visit Logs
              </h2>
              <button
                onClick={handleServiceLogAdd}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2 inline" />
                Log Visit
              </button>
            </div>
            {showServiceForm ? (
              <ServiceLogForm
                serviceLog={null}
                onSave={handleServiceLogSave}
                onCancel={handleServiceCancel}
                devices={mockDevices}
                darkMode={darkMode}
              />
            ) : (
              <ServiceLogList serviceLogs={serviceLogs} darkMode={darkMode} />
            )}
          </div>
        );

      case 'contracts':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                AMC/CMC Contract Tracker
              </h2>
            </div>
            <ContractTracker devices={devices} darkMode={darkMode} />
          </div>
        );

      case 'alerts':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Alerts & Photo Documentation
              </h2>
            </div>
            <AlertsAndPhotos darkMode={darkMode} />
          </div>
        );

      case 'facilities':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Facility Management
              </h2>
            </div>
            <FacilitiesManager darkMode={darkMode} />
          </div>
        );

      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} darkMode={darkMode} isOpen={sidebarOpen} setIsOpen={setSidebarOpen}/>

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} onMenuClick={()=>setSidebarOpen(true)}/>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DeviceCRMDashboard;
