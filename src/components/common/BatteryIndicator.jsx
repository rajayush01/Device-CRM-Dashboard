import { Battery } from "lucide-react";

const BatteryIndicator = ({ level }) => {
  const getColor = () => {
    if (level > 50) return 'text-green-500';
    if (level > 20) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="flex items-center space-x-1">
      <Battery className={`w-4 h-4 ${getColor()}`} />
      <span className="text-sm">{level}%</span>
    </div>
  );
};

export default BatteryIndicator;