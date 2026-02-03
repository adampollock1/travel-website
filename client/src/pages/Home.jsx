import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Clock, Globe } from 'lucide-react';
import { SearchWidget } from '../components/search';
import { HotelCard, DestinationCard } from '../components/hotels';
import { SkeletonCard } from '../components/common';
import Button from '../components/common/Button';
import hotelService from '../services/hotelService';

const Home = () => {
  const [featuredHotels, setFeaturedHotels] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hotelsData, destinationsData] = await Promise.all([
          hotelService.getFeaturedHotels(),
          hotelService.getDestinations(),
        ]);
        setFeaturedHotels(hotelsData);
        setDestinations(destinationsData);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const features = [
    {
      icon: Shield,
      title: 'Best Price Guarantee',
      description: 'Find a lower price? We\'ll match it and give you 10% off.',
    },
    {
      icon: Clock,
      title: 'Free Cancellation',
      description: 'Plans change. Cancel most bookings for free up to 24 hours before.',
    },
    {
      icon: Globe,
      title: '1M+ Properties',
      description: 'From boutique hotels to luxury resorts, find your perfect stay.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80)',
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-900/70 via-ocean-900/50 to-ocean-900/70" />
        
        {/* Animated shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-coral-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-40 right-20 w-96 h-96 bg-ocean-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sand-100 text-sm mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Sparkles size={16} className="text-coral-400" />
              Discover amazing places to stay
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight">
              Find Your Perfect
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-400 to-coral-500">
                Stay Anywhere
              </span>
            </h1>
            
            <p className="text-xl text-sand-200 max-w-2xl mx-auto">
              Book unique hotels, resorts, and villas in over 150 countries.
              Your next adventure starts here.
            </p>
          </motion.div>

          {/* Search Widget */}
          <div className="max-w-5xl mx-auto relative z-50">
            <SearchWidget variant="hero" />
          </div>

          {/* Quick stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 mt-12 text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-center">
              <span className="block text-3xl font-bold text-white">150+</span>
              <span className="text-sm">Countries</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-bold text-white">1M+</span>
              <span className="text-sm">Properties</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-bold text-white">50M+</span>
              <span className="text-sm">Happy Guests</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative z-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center p-8 rounded-2xl bg-sand-50 hover:bg-white hover:shadow-card transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-coral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={28} className="text-coral-500" />
                </div>
                <h3 className="font-heading font-bold text-xl text-ocean-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-ocean-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-sand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-end justify-between mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-ocean-800 mb-2">
                Popular Destinations
              </h2>
              <p className="text-ocean-600">
                Explore trending cities loved by travelers worldwide
              </p>
            </div>
            <Link to="/search" className="hidden md:flex items-center gap-2 text-coral-500 font-medium hover:text-coral-600">
              View all destinations
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-sand-200 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((destination, index) => (
                <DestinationCard 
                  key={destination.city} 
                  destination={destination}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-end justify-between mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-ocean-800 mb-2">
                Featured Stays
              </h2>
              <p className="text-ocean-600">
                Hand-picked hotels for an unforgettable experience
              </p>
            </div>
            <Link to="/search" className="hidden md:flex items-center gap-2 text-coral-500 font-medium hover:text-coral-600">
              View all hotels
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredHotels.slice(0, 8).map((hotel, index) => (
                <HotelCard key={hotel._id} hotel={hotel} index={index} />
              ))}
            </div>
          )}

          <div className="text-center mt-10 md:hidden">
            <Link to="/search">
              <Button variant="outline">
                View All Hotels
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-ocean-800 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              Ready for your next adventure?
            </h2>
            <p className="text-xl text-ocean-200 mb-10 max-w-2xl mx-auto">
              Join millions of travelers who trust Voyager Stays to find and book their perfect accommodations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/search">
                <Button variant="primary" size="lg">
                  Start Exploring
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-ocean-800">
                  Create Free Account
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
