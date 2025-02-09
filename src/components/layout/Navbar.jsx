import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBook, FaHeart, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Accueil', path: '/', icon: FaHome },
    { name: 'Recettes', path: '/recettes', icon: FaBook },
    { name: 'Favoris', path: '/favoris', icon: FaHeart },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden sm:flex flex-col fixed left-0 top-0 h-screen w-64 bg-white shadow-lg">
        <div className="p-6">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-orange-500">LetsCook</span>
          </Link>
        </div>
        <div className="flex-1 px-4">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ease-in-out
                  ${isActive(item.path)
                    ? 'text-orange-500 bg-orange-50'
                    : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
                  }`}
              >
                <item.icon className="mr-3 text-xl" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="sm:hidden fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
        <div className="px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-orange-500">LetsCook</span>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-orange-500 focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-lg
                    ${isActive(item.path)
                      ? 'text-orange-500 bg-orange-50'
                      : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
                    }`}
                >
                  <item.icon className="mr-3" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
