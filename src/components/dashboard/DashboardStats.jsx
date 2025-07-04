import { Package, Wifi, Wrench, AlertTriangle } from 'lucide-react';

const DashboardStats = ({ darkMode }) => {
  const stats = [
    { title: 'Total Devices', value: '156', change: '+12%', icon: Package, color: 'blue' },
    { title: 'Online Devices', value: '142', change: '+5%', icon: Wifi, color: 'green' },
    { title: 'Pending Service', value: '8', change: '-2%', icon: Wrench, color: 'yellow' },
    { title: 'Contract Expiring', value: '5', change: '+1%', icon: AlertTriangle, color: 'red' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {stat.title}
                </p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </p>
                <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                <Icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;