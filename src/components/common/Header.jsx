import { Menu, Moon, Sun, User } from "lucide-react";

const Header = ({ darkMode, setDarkMode, onMenuClick }) => {
  return (
    <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 py-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
          </button>
          <h1 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} hidden sm:block`}>
            Device Management System
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <div className={`w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium`}>
            A
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
