import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, User, LogOut, Search } from 'lucide-react';
import useAuthStore from '../../stores/authStore';
import useFavoritesStore from '../../stores/favoritesStore';
import Button from '../common/Button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { user, logout } = useAuthStore();
  const { favoriteIds } = useFavoritesStore();
  
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${isScrolled || !isHome 
      ? 'bg-white/95 backdrop-blur-md shadow-sm' 
      : 'bg-transparent'}
  `;

  const linkClasses = `
    font-medium transition-colors duration-200
    ${isScrolled || !isHome ? 'text-ocean-800 hover:text-coral-500' : 'text-white hover:text-coral-300'}
  `;

  const logoClasses = `
    text-2xl font-heading font-bold
    ${isScrolled || !isHome ? 'text-ocean-800' : 'text-white'}
  `;

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-coral-500 to-coral-600 rounded-xl flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <span className="text-white font-bold text-xl">V</span>
            </motion.div>
            <span className={logoClasses}>Voyager</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/search" className={linkClasses}>
              <span className="flex items-center gap-2">
                <Search size={18} />
                Explore
              </span>
            </Link>
            
            {user ? (
              <>
                <Link to="/favorites" className={`${linkClasses} relative`}>
                  <Heart size={20} />
                  {favoriteIds.size > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-coral-500 text-white text-xs rounded-full flex items-center justify-center">
                      {favoriteIds.size}
                    </span>
                  )}
                </Link>
                
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className={`flex items-center gap-2 ${linkClasses}`}
                  >
                    <div className="w-9 h-9 bg-gradient-to-br from-ocean-600 to-ocean-800 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-dropdown overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-sand-200">
                          <p className="font-medium text-ocean-800">{user.name}</p>
                          <p className="text-sm text-ocean-500 truncate">{user.email}</p>
                        </div>
                        <Link
                          to="/favorites"
                          className="flex items-center gap-3 px-4 py-3 text-ocean-700 hover:bg-sand-50"
                        >
                          <Heart size={18} />
                          Saved Hotels
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
                        >
                          <LogOut size={18} />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className={linkClasses}>
                  Sign In
                </Link>
                <Button 
                  variant={isScrolled || !isHome ? 'primary' : 'white'} 
                  size="sm"
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg ${isScrolled || !isHome ? 'text-ocean-800' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-sand-200"
          >
            <div className="px-4 py-6 space-y-4">
              <Link
                to="/search"
                className="flex items-center gap-3 px-4 py-3 text-ocean-800 hover:bg-sand-50 rounded-xl"
              >
                <Search size={20} />
                Explore Hotels
              </Link>
              
              {user ? (
                <>
                  <Link
                    to="/favorites"
                    className="flex items-center gap-3 px-4 py-3 text-ocean-800 hover:bg-sand-50 rounded-xl"
                  >
                    <Heart size={20} />
                    Saved Hotels
                    {favoriteIds.size > 0 && (
                      <span className="ml-auto bg-coral-500 text-white text-xs px-2 py-1 rounded-full">
                        {favoriteIds.size}
                      </span>
                    )}
                  </Link>
                  <div className="border-t border-sand-200 pt-4 mt-4">
                    <div className="px-4 py-2">
                      <p className="font-medium text-ocean-800">{user.name}</p>
                      <p className="text-sm text-ocean-500">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl"
                    >
                      <LogOut size={20} />
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-3 pt-4 border-t border-sand-200">
                  <Link to="/login">
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="primary" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
