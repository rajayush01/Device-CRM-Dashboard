import BatteryIndicator from "../common/BatteryIndicator";
import StatusBadge from "../common/StatusBadge";
import { Edit, Eye, Trash2 } from "lucide-react";

const DeviceTable = ({ devices, darkMode, onEdit, onDelete, onView }) => {
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm overflow-hidden`}>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                Device Info
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                Status
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                Battery
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                Last Service
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                AMC Status
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={`${darkMode ? 'bg-gray-800' : 'bg-white'} divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {devices.map((device) => (
              <tr key={device.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {device.id}
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      {device.type} - {device.facility}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                      {device.location}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={device.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <BatteryIndicator level={device.battery} />
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  {device.lastService}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={device.amcStatus} />
                  <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                    Exp: {device.amcExpiry}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onView(device)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(device)}
                      className="text-yellow-600 hover:text-yellow-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(device.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeviceTable;