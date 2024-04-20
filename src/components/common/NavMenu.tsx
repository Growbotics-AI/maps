import { Search, Sliders } from 'lucide-react';
import { AppConfig } from '#lib/AppConfig';

const NavMenu = () => {
  const navIconSize = AppConfig.ui.topBarIconSize;

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex items-center w-full max-w-3xl px-3 py-2 bg-white shadow-sm rounded-md">
        <Search size={navIconSize} className="text-gray-500 mt-1" />
        <input
          className="flex-grow px-4 py-2 ml-2 text-base bg-transparent border-none focus:outline-none placeholder-gray-400"
          type="search"
          placeholder="Search for manufacturing resources..."
        />
        <button className="p-2 ml-2 text-gray-500 bg-gray-200 rounded-full">
          <Sliders size={navIconSize} />
        </button>
      </div>
    </div>
  );
};

export default NavMenu;