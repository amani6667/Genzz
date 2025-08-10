import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import axios from 'axios';
import { FaStar, FaFire, FaBaby, FaCalendarAlt, FaFutbol, FaLeaf, FaDragon, FaBowlingBall, FaGamepad, FaDice } from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_KEY_Base_URL;

// Category Item Component
// Updated CategoryItem component
const CategoryItem = ({ item, index, selectedIndex, onClick, isMobile = false }) => (
  <div className={`relative flex-shrink-0 ${isMobile ? 'w-20' : 'w-24'}`}>
    <div 
      className={`group relative flex flex-col items-center justify-center ${
        isMobile ? 'w-20 h-20' : 'w-24 h-24'
      } cursor-pointer transition-all duration-300 active:scale-95`}
      onClick={() => onClick(index)}
    >
      {/* Background with glow effect when selected */}
      <div
        className={`absolute inset-0 rounded-xl transition-all duration-300 ${
          selectedIndex === index
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg border border-cyan-400/30 shadow-cyan-400/20'
            : 'bg-gray-800 border border-gray-700 hover:border-cyan-400/30 hover:shadow-md hover:shadow-cyan-400/10'
        }`}
      >
        {!isMobile && selectedIndex === index && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-cyan-400/10 to-transparent opacity-60"></div>
        )}
      </div>

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center h-full w-full p-2 transform transition-all duration-300 ${
          selectedIndex === index 
            ? (isMobile ? 'scale-105' : 'scale-110') 
            : 'group-hover:scale-105'
        }`}
      >
        <div
          className={`${isMobile ? 'text-xl' : 'text-2xl'} mb-1 transition-colors duration-300 ${
            selectedIndex === index 
              ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(10,200,200,0.6)]' 
              : 'text-gray-300 group-hover:text-cyan-300'
          }`}
        >
          {/* Show icon for "All" category (index 0), image for others */}
          {index === 0 ? (
            item.icon
          ) : (
            <img
              src={`${API_BASE_URL}/${item.imageUrl}`}
              alt={item.name}
              className="w-[40px]"
            />
          )}
        </div>
        <span
          className={`text-xs text-center font-medium transition-colors duration-300 ${
            selectedIndex === index 
              ? 'text-cyan-400 font-semibold' 
              : 'text-gray-300 group-hover:text-white'
          }`}
        >
          {item.name}
        </span>
      </div>

      {/* Active indicator */}
      {selectedIndex === index && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-1 bg-cyan-400 rounded-full"></div>
      )}
    </div>
  </div>
);

// Game Card Component
const GameCard = ({ game }) => (
  <div className="relative group overflow-hidden rounded-xl bg-[#0a1920] shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-teal-900/30 hover:scale-[1.03] border border-gray-800">
    {/* Image */}
    <img
      src={`${API_BASE_URL}/images/${game.imageUrl}`}
      alt={game.gameName}
      className="w-full h-full min-h-[120px] sm:min-h-[160px] md:min-h-[200px] lg:min-h-[260px] object-cover transition-transform duration-300 group-hover:scale-105"
    />

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

    {/* Star Icon for featured games */}
    {game.isFeatured && (
      <div className="absolute top-2 right-2 text-yellow-400 text-lg z-10">
        <FaStar className="bg-black/30 backdrop-blur-sm rounded-full p-1 w-6 h-6 sm:w-7 sm:h-7 border border-yellow-300/50" />
      </div>
    )}

    {/* Hover Buttons - Hidden on mobile, shown on hover for larger screens */}
    <div className="hidden sm:absolute sm:inset-0 sm:z-10 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 sm:flex flex-col items-center justify-center gap-2 px-2">
      <button className="bg-teal-500 hover:bg-teal-400 cursor-pointer text-black font-semibold text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl shadow-[0_4px_0_#0d9488] hover:-translate-y-1 transition-transform w-full max-w-[90%]">
        এখন খেলুন
      </button>
      <button className="bg-black/30 backdrop-blur-md cursor-pointer text-teal-300 font-semibold text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl border border-teal-500 hover:-translate-y-1 transition-transform w-full max-w-[90%]">
        ফ্রি ট্রায়াল
      </button>
    </div>

    {/* Info */}
    <div className="absolute bottom-0 left-0 right-0 z-10 p-2 sm:p-3 text-white">
      <h3 className="font-bold text-xs sm:text-sm md:text-base truncate">{game.gameName}</h3>
      <p className="text-[10px] sm:text-xs text-gray-400">{game.providerName}</p>
    </div>

    {/* Category Badge */}
    <div className="absolute top-2 left-2 z-10">
      <span className="bg-black/60 text-teal-300 text-[10px] px-2 py-1 rounded-md border border-teal-500/30">
        {game.category}
      </span>
    </div>

    {/* Mobile Buttons - Always visible on mobile */}
    <div className="sm:hidden absolute bottom-10 left-0 mb-[7px] right-0 z-10 px-2 flex gap-1">
      <button className="bg-teal-500 text-black font-semibold text-[10px] px-2 py-1 rounded-lg shadow-[0_2px_0_#0d9488] flex-1">
        খেলুন
      </button>
      <button className="bg-black/30 backdrop-blur-md text-teal-300 font-semibold text-[10px] px-2 py-1 rounded-lg border border-teal-500 flex-1">
        ট্রায়াল
      </button>
    </div>
  </div>
);

// Game Grid Section Component
const GameGridSection = ({ title, gameList }) => (
  <div className="py-3 sm:py-4">
    <h2 className="text-sm sm:text-lg md:text-xl font-bold text-teal-400 mb-2 sm:mb-4 flex items-center gap-1 sm:gap-2">
      <span className="text-xs sm:text-base">🔥</span> {title}
    </h2>
    <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
      {gameList.map((game, index) => (
        <GameCard key={`${game._id}-${index}`} game={game} />
      ))}
    </div>
  </div>
);

// Main Component
const Mainpagegame = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
    loop: false,
  });
  
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [categories, setCategories] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories and games
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Using axios.all to make parallel requests
        const [categoriesResponse, gamesResponse] = await axios.all([
          axios.get(`${API_BASE_URL}/api/categories`),
          axios.get(`${API_BASE_URL}/api/games`)
        ]);
        
        if (categoriesResponse.data.success && gamesResponse.data.success) {
          setCategories(categoriesResponse.data.data);
          setGames(gamesResponse.data.data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Carousel functions
  const scrollTo = useCallback((index) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
      setSelectedCategoryIndex(index);
    }
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedCategoryIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi, onSelect]);

  // Group games by category
  const groupByCategory = (games) => {
    return games.reduce((acc, game) => {
      const key = game.category;
      if (!acc[key]) acc[key] = [];
      acc[key].push(game);
      return acc;
    }, {});
  };

  // Filter games by selected category
  const getFilteredGames = () => {
    if (selectedCategoryIndex === 0) {
      // Show all games grouped by category
      return groupByCategory(games);
    } else {
      // Show games from selected category only
      const selectedCategory = allCategories[selectedCategoryIndex];
      return {
        [selectedCategory.name]: games.filter(game => game.category === selectedCategory.name)
      };
    }
  };

  // Default icons for categories
  const categoryIcons = {
    'গরম খেলা': <FaFire className="text-orange-400" />,
    'প্রিয়': <FaBaby className="text-pink-400" />,
    'স্লট': <FaCalendarAlt className="text-blue-400" />,
    'লাইভ': <FaFutbol className="text-green-400" />,
    'পোকার': <FaLeaf className="text-emerald-400" />,
    'ফিশিং': <FaDragon className="text-purple-400" />,
    'স্পোর্টস': <FaBowlingBall className="text-red-400" />,
    'ই-স্পোর্টস': <FaGamepad className="text-indigo-400" />,
    'লটারি': <FaDice className="text-yellow-400" />
  };

  // Add default "All" category with icon mapping
  const allCategories = [
    { 
      name: "সকল খেলা", 
      icon: <FaGamepad className="text-cyan-400" />,
      _id: "all"
    },
    ...categories.map(cat => ({
      ...cat,
      icon: categoryIcons[cat.name] || <FaGamepad className="text-gray-300" />
    }))
  ];

  if (loading) {
    return (
      <div className="container mx-auto py-8 text-center text-teal-400">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-400 mb-2"></div>
        <p>লোড হচ্ছে...</p>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="container mx-auto py-8 text-center text-red-400">
  //       <p>Error: {error}</p>
  //       <button 
  //         onClick={() => window.location.reload()}
  //         className="mt-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded"
  //       >
  //         আবার চেষ্টা করুন
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <div className="container mx-auto py-3 sm:py-5">
      {/* Category Slider */}
      <div className="w-full pt-2 md:pt-4 relative mb-6">
        {/* Desktop Grid View - hidden on mobile */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-11 gap-4">
            {allCategories.map((item, index) => (
              <CategoryItem 
                key={item._id || index} 
                item={item} 
                index={index} 
                selectedIndex={selectedCategoryIndex} 
                onClick={(idx) => {
                  setSelectedCategoryIndex(idx);
                }}
              />
            ))}
          </div>
        </div>

        {/* Mobile Carousel View - shown only on mobile */}
        <div className="md:hidden px-2">
          {/* Carousel container */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y gap-3">
              {allCategories.map((item, index) => (
                <CategoryItem 
                  key={item._id || index} 
                  item={item} 
                  index={index} 
                  selectedIndex={selectedCategoryIndex} 
                  onClick={scrollTo}
                  isMobile={true}
                />
              ))}
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-4 gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedCategoryIndex 
                    ? 'bg-cyan-400 w-4 shadow-[0_0_6px_rgba(10,200,200,0.7)]' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Games Display */}
      {Object.entries(getFilteredGames()).map(([category, gameList]) => (
        gameList.length > 0 && (
          <GameGridSection 
            key={category} 
            title={category} 
            gameList={gameList} 
          />
        )
      ))}

      {/* Empty state */}
      {Object.keys(getFilteredGames()).length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p>এই বিভাগে কোনো গেম পাওয়া যায়নি</p>
        </div>
      )}
    </div>
  );
};

export default Mainpagegame;