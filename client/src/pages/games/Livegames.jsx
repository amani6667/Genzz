import React from 'react';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import BannerSlider from '../../components/banner/BannerSlider';
import Footer from '../../components/footer/Footer';
import CategorySlider from '../../components/category/CategorySlider';
import Hotgamescard from '../../components/gamespart/Hotgamescard';
import Livegamespart from '../../components/gamespart/live/Livegamespart';

const Livegames = () => {
  return (
    <section className="min-h-screen font-anek bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header with dark glass morphism effect */}
      <Header className="bg-gray-900/90 backdrop-blur-sm border-b border-gray-700 " />
      
      <div className="flex">
        {/* Fixed Sidebar with dark glass morphism */}
        <div className="hidden md:block  ">
          <Sidebar />
        </div>

        {/* Scrollable Content */}
        <div className="ml-0 md:ml-[330px] w-full pt-2 md:pt-6">
          {/* Main content container */}
          <div className="mx-auto md:px-4">
           <Livegamespart/>
            
         
          </div>
          
          {/* Dark themed footer */}
          <Footer className="mt-12 bg-gray-900/90 border-t border-gray-700" />
        </div>
      </div>
    </section>
  );
};

export default Livegames;