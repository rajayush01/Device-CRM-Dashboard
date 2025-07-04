import { Moon, Sun, User } from "lucide-react";

const Header = ({ darkMode, setDarkMode, user = 'Admin User' }) => {
  return (
    <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border-b`}>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <h1 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Medical Device Management
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <div className="flex items-center space-x-2">
            <User className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
            <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-600'}`}>{user}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;