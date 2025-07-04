import { useState, useRef } from 'react';
import { AlertTriangle, Camera, QrCode, Eye, Download, Trash2 } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import { Scanner } from '@yudiel/react-qr-scanner';

const AlertsAndPhotos = ({ darkMode }) => {
  const fileInputRef = useRef(null);
  const [showQRScanner, setShowQRScanner] = useState(false);

  const [alerts, setAlerts] = useState([
    {
      id: 'ALT001',
      deviceId: 'DEV002',
      type: 'Battery Low',
      severity: 'High',
      message: 'Battery level critical at 23%',
      timestamp: '2024-07-04 10:30:00',
      status: 'Active'
    },
    {
      id: 'ALT002',
      deviceId: 'DEV003',
      type: 'Maintenance Required',
      severity: 'Medium',
      message: 'Scheduled maintenance overdue',
      timestamp: '2024-07-04 09:15:00',
      status: 'Acknowledged'
    }
  ]);

  const [photos, setPhotos] = useState([
    {
      id: 'PH001',
      deviceId: 'DEV001',
      type: 'Installation',
      filename: 'installation_dev001.jpg',
      uploadDate: '2024-07-01',
      uploadedBy: 'John Smith',
      fileUrl: 'https://www.shutterstock.com/image-photo/these-some-random-photos-260nw-2402066699.jpg'
    },
    {
      id: 'PH002',
      deviceId: 'DEV002',
      type: 'Maintenance',
      filename: 'maintenance_dev002.jpg',
      uploadDate: '2024-07-02',
      uploadedBy: 'Sarah Johnson',
      fileUrl: 'https://www.shutterstock.com/image-photo/these-some-random-photos-260nw-2402066699.jpg'
    }
  ]);

  const handleAcknowledge = (id) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === id ? { ...alert, status: 'Acknowledged' } : alert
    ));
  };

  const handleDeleteAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const handleDeletePhoto = (id) => {
    setPhotos(prev => prev.filter(photo => photo.id !== id));
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newPhoto = {
        id: `PH${Date.now()}`,
        deviceId: 'DEV001',
        type: 'Installation',
        filename: file.name,
        uploadDate: new Date().toISOString().slice(0, 10),
        uploadedBy: 'System Admin',
        fileUrl: URL.createObjectURL(file)
      };
      setPhotos([...photos, newPhoto]);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Alerts */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm`}>
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Active Alerts
          </h3>
        </div>
        <div className="p-6 space-y-4">
          {alerts.map(alert => (
            <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${alert.severity === 'High' ? 'border-red-500 bg-red-50' :
              alert.severity === 'Medium' ? 'border-yellow-500 bg-yellow-50' :
                'border-green-500 bg-green-50'
              }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className={`w-5 h-5 ${alert.severity === 'High' ? 'text-red-500' :
                    alert.severity === 'Medium' ? 'text-yellow-500' :
                      'text-green-500'
                    }`} />
                  <div>
                    <div className="font-medium text-gray-900">{alert.deviceId} - {alert.type}</div>
                    <div className="text-sm text-gray-600">{alert.message}</div>
                    <div className="text-xs text-gray-500">{alert.timestamp}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>{alert.severity}</span>
                  <StatusBadge status={alert.status} />
                  {alert.status === 'Active' && <button onClick={() => handleAcknowledge(alert.id)} className="text-sm text-blue-600 hover:underline">Acknowledge</button>}
                  <button onClick={() => handleDeleteAlert(alert.id)} className="text-sm text-red-600 hover:underline">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Photos */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm`}>
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Photo Documentation</h3>
          <button onClick={handleUploadClick} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
            <Camera className="w-4 h-4 mr-2 inline" /> Upload Photo
          </button>
          <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" />
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map(photo => (
            <div key={photo.id} className={`border rounded-lg p-4 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Camera className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{photo.deviceId}</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{photo.type}</div>
                </div>
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <div>File: {photo.filename}</div>
                <div>Date: {photo.uploadDate}</div>
                <div>By: {photo.uploadedBy}</div>
              </div>
              <div className="mt-3 flex space-x-2">
  <a
    href={photo.fileUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1 inline-flex items-center justify-center bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-blue-700 transition"
  >
    <Eye className="w-4 h-4 mr-1" /> View
  </a>
  <a
    href={photo.fileUrl}
    download={photo.filename}
    className="flex-1 inline-flex items-center justify-center bg-gray-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-gray-700 transition"
  >
    <Download className="w-4 h-4 mr-1" /> Download
  </a>
  <button
    onClick={() => handleDeletePhoto(photo.id)}
    className="flex-1 inline-flex items-center justify-center bg-red-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-red-700 transition"
  >
    <Trash2 className="w-4 h-4 mr-1" /> Delete
  </button>
</div>

            </div>
          ))}
        </div>
      </div>

      {/* QR Code Scanner */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>QR Code Scanner</h3>
          <button onClick={() => setShowQRScanner(!showQRScanner)} className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700">
            <QrCode className="w-4 h-4 mr-2 inline" /> Scan Device
          </button>
        </div>
        {showQRScanner && (
          <div className="py-4">
            <Scanner
              delay={300}
              onError={(err) => console.error(err)}
              onScan={(data) => {
                if (data) {
                  alert(`Scanned Device ID: ${data}`);
                  setShowQRScanner(false);
                }
              }}
              style={{ width: '100%' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsAndPhotos;
