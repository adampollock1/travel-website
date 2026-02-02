import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { List, Map, SlidersHorizontal, ChevronDown } from 'lucide-react';
import useSearchStore from '../stores/searchStore';
import { SearchWidget } from '../components/search';
import FilterSidebar from '../components/search/FilterSidebar';
import { HotelCard } from '../components/hotels';
import { SkeletonCard } from '../components/common';
import MapView from '../components/map/MapView';
import hotelService from '../services/hotelService';

const sortOptions = [
  { value: 'rating', label: 'Top Rated' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'stars', label: 'Star Rating' },
];

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hotels, setHotels] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  
  const {
    destination,
    setDestination,
    filters,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
  } = useSearchStore();

  // Sync URL params with store on mount
  useEffect(() => {
    const urlDestination = searchParams.get('destination');
    if (urlDestination) {
      setDestination(urlDestination);
    }
  }, []);

  // Fetch hotels when search params change
  useEffect(() => {
    const fetchHotels = async () => {
      setIsLoading(true);
      try {
        const params = {
          destination: destination || undefined,
          minPrice: filters.minPrice > 0 ? filters.minPrice : undefined,
          maxPrice: filters.maxPrice < 2000 ? filters.maxPrice : undefined,
          stars: filters.stars.length ? filters.stars.join(',') : undefined,
          amenities: filters.amenities.length ? filters.amenities.join(',') : undefined,
          propertyType: filters.propertyTypes.length ? filters.propertyTypes.join(',') : undefined,
          sort: sortBy,
          page: pagination.page,
          limit: 12,
        };

        // Remove undefined values
        Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);

        const response = await hotelService.searchHotels(params);
        setHotels(response.hotels);
        setPagination(response.pagination);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotels();
  }, [destination, filters, sortBy]);

  const activeFiltersCount = 
    (filters.stars.length) +
    (filters.propertyTypes.length) +
    (filters.amenities.length) +
    (filters.minPrice > 0 ? 1 : 0) +
    (filters.maxPrice < 2000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-sand-50 pt-24">
      {/* Search Bar */}
      <div className="bg-white shadow-sm border-b border-sand-200 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <SearchWidget variant="compact" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-heading font-bold text-ocean-800">
              {destination ? `Hotels in ${destination}` : 'All Hotels'}
            </h1>
            <p className="text-ocean-600">
              {isLoading ? 'Searching...' : `${pagination.total} properties found`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-sand-300 rounded-xl text-ocean-700 hover:border-coral-500 transition-colors"
            >
              <SlidersHorizontal size={18} />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-coral-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-sand-300 rounded-xl text-ocean-700 hover:border-coral-500 transition-colors"
              >
                <span className="text-sm">
                  {sortOptions.find(o => o.value === sortBy)?.label}
                </span>
                <ChevronDown size={18} className={`transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showSortDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-dropdown overflow-hidden z-20 min-w-[180px]"
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setShowSortDropdown(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm hover:bg-sand-50 transition-colors ${
                          sortBy === option.value ? 'bg-coral-50 text-coral-600' : 'text-ocean-700'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* View Toggle */}
            <div className="hidden md:flex bg-white border border-sand-300 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-ocean-800 text-white' 
                    : 'text-ocean-600 hover:bg-sand-50'
                }`}
              >
                <List size={20} />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2.5 transition-colors ${
                  viewMode === 'map' 
                    ? 'bg-ocean-800 text-white' 
                    : 'text-ocean-600 hover:bg-sand-50'
                }`}
              >
                <Map size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-72 shrink-0">
            <FilterSidebar />
          </div>

          {/* Mobile Filters */}
          <FilterSidebar
            isOpen={showMobileFilters}
            onClose={() => setShowMobileFilters(false)}
            isMobile
          />

          {/* Results */}
          <div className="flex-1">
            {viewMode === 'list' ? (
              <>
                {isLoading ? (
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <SkeletonCard key={i} />
                    ))}
                  </div>
                ) : hotels.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 bg-sand-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Map size={32} className="text-ocean-400" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-ocean-800 mb-2">
                      No hotels found
                    </h3>
                    <p className="text-ocean-600 mb-4">
                      Try adjusting your search or filters
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {hotels.map((hotel, index) => (
                      <HotelCard key={hotel._id} hotel={hotel} index={index} />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="flex justify-center gap-2 mt-10">
                    {[...Array(pagination.pages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPagination(prev => ({ ...prev, page: i + 1 }))}
                        className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                          pagination.page === i + 1
                            ? 'bg-coral-500 text-white'
                            : 'bg-white text-ocean-700 hover:bg-sand-100'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="h-[calc(100vh-300px)] min-h-[500px] rounded-2xl overflow-hidden">
                <MapView hotels={hotels} isLoading={isLoading} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
