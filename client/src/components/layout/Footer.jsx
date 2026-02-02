import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Mail, 
  Phone,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Send
} from 'lucide-react';
import Button from '../common/Button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    discover: [
      { name: 'Hotels', href: '/search?propertyType=hotel' },
      { name: 'Resorts', href: '/search?propertyType=resort' },
      { name: 'Villas', href: '/search?propertyType=villa' },
      { name: 'Apartments', href: '/search?propertyType=apartment' },
    ],
    destinations: [
      { name: 'Paris', href: '/search?destination=Paris' },
      { name: 'Tokyo', href: '/search?destination=Tokyo' },
      { name: 'New York', href: '/search?destination=New York' },
      { name: 'Dubai', href: '/search?destination=Dubai' },
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Blog', href: '#' },
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-ocean-800 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-ocean-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-heading font-bold mb-2">
                Get travel inspiration & deals
              </h3>
              <p className="text-ocean-300">
                Subscribe to our newsletter for exclusive offers and destination guides.
              </p>
            </div>
            <form className="flex w-full md:w-auto gap-3">
              <div className="relative flex-1 md:w-80">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-ocean-400" size={20} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 bg-ocean-700 border border-ocean-600 rounded-xl text-white placeholder:text-ocean-400 focus:outline-none focus:border-coral-500"
                />
              </div>
              <Button variant="primary" className="shrink-0">
                <Send size={18} />
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-coral-500 to-coral-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <span className="text-2xl font-heading font-bold">Voyager</span>
            </Link>
            <p className="text-ocean-300 mb-6 max-w-xs">
              Discover and book unique stays around the world. Your perfect adventure starts here.
            </p>
            <div className="space-y-3 text-ocean-300">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-coral-500" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-coral-500" />
                <span>hello@voyagerstays.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-coral-500" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Discover</h4>
            <ul className="space-y-3">
              {footerLinks.discover.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-ocean-300 hover:text-coral-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Destinations</h4>
            <ul className="space-y-3">
              {footerLinks.destinations.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-ocean-300 hover:text-coral-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-ocean-300 hover:text-coral-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-ocean-300 hover:text-coral-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ocean-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-ocean-400 text-sm">
              © {currentYear} Voyager Stays. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-ocean-700 rounded-full flex items-center justify-center text-ocean-300 hover:bg-coral-500 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
