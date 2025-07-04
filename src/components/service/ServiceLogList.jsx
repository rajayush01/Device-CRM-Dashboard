import { Wrench } from "lucide-react";
import StatusBadge from "../common/StatusBadge";

const ServiceLogList = ({ serviceLogs, darkMode }) => {
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm`}>
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Service Logs
        </h3>
      </div>
      <div className="divide-y divide-gray-200">
        {serviceLogs.map((log) => (
          <div key={log.id} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${log.type === 'Preventive' ? 'bg-blue-100' : 'bg-red-100'}`}>
                  <Wrench className={`w-4 h-4 ${log.type === 'Preventive' ? 'text-blue-600' : 'text-red-600'}`} />
                </div>
                <div>
                  <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {log.deviceId} - {log.type} Maintenance
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    Engineer: {log.engineer} | Date: {log.date}
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {log.notes}
                  </div>
                </div>
              </div>
              <StatusBadge status={log.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceLogList;