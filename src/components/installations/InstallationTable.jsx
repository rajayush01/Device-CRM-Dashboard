import React from 'react';
import { Eye } from 'lucide-react';

const InstallationTable = ({ installations, darkMode, onView }) => {
  const tdClass = `px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm overflow-hidden`}>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <tr>
              {[
                'Device ID', 'Type', 'Facility', 'Location',
                'Engineer', 'Install Date', 'Checklist', 'Actions'
              ].map((header, idx) => (
                <th
                  key={idx}
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className={`${darkMode ? 'bg-gray-800' : 'bg-white'} divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {installations.map((inst, idx) => (
              <tr key={idx}>
                <td className={`${tdClass} font-medium`}>{inst.deviceId}</td>
                <td className={tdClass}>{inst.deviceType}</td>
                <td className={tdClass}>{inst.facility}</td>
                <td className={tdClass}>{inst.location}</td>
                <td className={tdClass}>{inst.engineer}</td>
                <td className={tdClass}>{inst.installDate}</td>
                <td className={tdClass}>
                  {Object.entries(inst.checklist)
                    .filter(([_, val]) => val)
                    .map(([key]) => (
                      <span
                        key={key}
                        className={`inline-block text-xs px-2 py-1 mr-1 mb-1 rounded 
                          ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}
                      >
                        {key}
                      </span>
                    ))}
                </td>
                <td className={tdClass}>
                  <button
                    onClick={() => onView(inst)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Eye className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstallationTable;
