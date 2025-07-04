import { CheckCircle, Download } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

const ContractTracker = ({ devices, darkMode }) => {
  const contractData = devices.map(device => ({
    ...device,
    daysToExpiry: Math.ceil((new Date(device.amcExpiry) - new Date()) / (1000 * 60 * 60 * 24))
  }));

  const expiringContracts = contractData.filter(device => device.daysToExpiry <= 30);

  const handleExport = () => {
    const csvContent = [
      ['Device ID', 'Type', 'Facility', 'Location', 'AMC Status', 'AMC Expiry', 'Days to Expiry'],
      ...contractData.map(device => [
        device.id,
        device.type,
        device.facility,
        device.location,
        device.amcStatus,
        device.amcExpiry,
        device.daysToExpiry <= 0 ? 'Expired' : device.daysToExpiry
      ])
    ]
      .map(e => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'contract_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Expiry Alerts */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Contract Expiry Alerts
          </h3>
          <button
            onClick={handleExport}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
          >
            <Download className="w-4 h-4 mr-2 inline" />
            Export Report
          </button>
        </div>

        {expiringContracts.length > 0 ? (
          <div className="space-y-3">
            {expiringContracts.map(device => (
              <div key={device.id} className={`p-4 rounded-lg border-l-4 ${
                device.daysToExpiry <= 0 ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">
                      {device.id} - {device.type}
                    </div>
                    <div className="text-sm text-gray-600">
                      {device.facility} | Expires: {device.amcExpiry}
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${
                    device.daysToExpiry <= 0 ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {device.daysToExpiry <= 0 ? 'Expired' : `${device.daysToExpiry} days left`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              No contracts expiring in the next 30 days
            </p>
          </div>
        )}
      </div>

      {/* All Contracts Table */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm overflow-hidden`}>
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            All Contracts
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  Device Info
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  Contract Type
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  Expiry Date
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  Status
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  Days Left
                </th>
              </tr>
            </thead>
            <tbody className={`${darkMode ? 'bg-gray-800' : 'bg-white'} divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {contractData.map(device => (
                <tr key={device.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {device.id}
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      {device.type} - {device.facility}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    AMC
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    {device.amcExpiry}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={device.amcStatus} />
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    device.daysToExpiry <= 0 ? 'text-red-600' :
                    device.daysToExpiry <= 30 ? 'text-yellow-600' :
                    darkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {device.daysToExpiry <= 0 ? 'Expired' : `${device.daysToExpiry} days`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContractTracker;
