import React, { useState } from 'react';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import { GlobeAltIcon } from '@heroicons/react/24/solid';

const GameProviders = () => {
  const [language, setLanguage] = useState('bangla');

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'bangla' : 'english');
  };

  // Bangla Content
  const banglaContent = {
    title: "গেম প্রদানকারী",
    subtitle: "Genzz.casino-এ আমাদের প্রিমিয়াম গেম প্রদানকারীদের সাথে পরিচিত হন",
    heroTitle: "বিশ্বের সেরা গেম প্রদানকারীদের সাথে অংশীদারিত্ব",
    heroText: "আমরা শুধুমাত্র শিল্পের সবচেয়ে বিশ্বস্ত এবং উদ্ভাবনী গেম ডেভেলপারদের সাথে কাজ করি, আপনাকে সেরা গেমিং অভিজ্ঞতা প্রদান করতে।",
    providersTitle: "আমাদের গেম প্রদানকারীরা",
    providers: [
      {
        name: "Playtech",
        image: "https://casinoapidemo.vercel.app/playtech.png",
        description: "শিল্পের অন্যতম প্রধান নাম, স্লট, লাইভ ক্যাসিনো এবং বিনোদন গেমের বিশাল সংগ্রহ প্রদান করে।",
        games: "500+ গেম"
      },
      {
        name: "Ezugi",
        image: "https://casinoapidemo.vercel.app/ezugi.png",
        description: "লাইভ ক্যাসিনো গেমের বিশেষজ্ঞ, অনন্য টেবিল গেম এবং স্থানীয় বাজারের জন্য কাস্টমাইজড অভিজ্ঞতা প্রদান করে।",
        games: "50+ লাইভ গেম"
      },
      {
        name: "Evolution",
        image: "https://casinoapidemo.vercel.app/evolution.png",
        description: "বিশ্বের নেতৃস্থানীয় লাইভ ক্যাসিনো প্রদানকারী, অসাধারণ গ্রাফিক্স এবং ইনোভেটিভ গেম শো সহ।",
        games: "300+ লাইভ গেম"
      },
      {
        name: "OneTouch",
        image: "https://casinoapidemo.vercel.app/ongaming.png",
        description: "মোবাইল-ফার্স্ট গেমিং সমাধানের জন্য পরিচিত, মসৃণ গেমপ্লে এবং স্বজ্ঞাত ইন্টারফেস প্রদান করে।",
        games: "100+ গেম"
      },
      {
        name: "Big Time Gaming",
        image: "https://casinoapidemo.vercel.app/bigtimegamingasia.png",
        description: "MEGAWAYS™ মেকানিকের উদ্ভাবক, উচ্চ-প্রদানকারী স্লট গেমের জন্য বিখ্যাত।",
        games: "50+ স্লট"
      },
      {
        name: "Mancala Gaming",
        image: "https://casinoapidemo.vercel.app/mancala.png",
        description: "এশিয়ান বাজারের জন্য বিশেষভাবে ডিজাইন করা অনন্য থিম এবং গেম মেকানিক্স অফার করে।",
        games: "80+ গেম"
      },
      {
        name: "NetEnt",
        image: "https://casinoapidemo.vercel.app/netent.png",
        description: "প্রিমিয়াম কোয়ালিটি স্লট গেমের জন্য বিখ্যাত, অসাধারণ গ্রাফিক্স এবং বোনাস ফিচার সহ।",
        games: "200+ গেম"
      }
    ],
    whyUsTitle: "কেন আমাদের গেম প্রদানকারীদের বেছে নেবেন?",
    whyUsPoints: [
      "নিয়মিতভাবে নতুন গেম যোগ করা হয়",
      "সব গেম ন্যায্যতা এবং নিরাপত্তার জন্য পরীক্ষিত",
      "মোবাইল এবং ডেস্কটপ উভয়ের জন্য অপ্টিমাইজড",
      "বিভিন্ন বাজেটের জন্য গেম",
      "উচ্চ RTP (রিটার্ন টু প্লেয়ার) হার"
    ],
    ctaTitle: "আজই খেলুন এবং জিতুন!",
    ctaText: "আমাদের গেম প্রদানকারীদের বিশাল সংগ্রহ থেকে আপনার পছন্দের গেম খুঁজে নিন।",
    ctaButton: "সব গেম দেখুন"
  };

  // English Content
  const englishContent = {
    title: "Game Providers",
    subtitle: "Meet our premium game providers at Genzz.casino",
    heroTitle: "Partnered with the world's best game providers",
    heroText: "We work only with the most trusted and innovative game developers in the industry to bring you the best gaming experience.",
    providersTitle: "Our Game Providers",
    providers: [
      {
        name: "Playtech",
        image: "https://casinoapidemo.vercel.app/playtech.png",
        description: "One of the industry's biggest names, offering a vast collection of slots, live casino and entertainment games.",
        games: "500+ games"
      },
      {
        name: "Ezugi",
        image: "https://casinoapidemo.vercel.app/ezugi.png",
        description: "Specialists in live casino games, offering unique table games and customized experiences for local markets.",
        games: "50+ live games"
      },
      {
        name: "Evolution",
        image: "https://casinoapidemo.vercel.app/evolution.png",
        description: "The world's leading live casino provider, with spectacular graphics and innovative game shows.",
        games: "300+ live games"
      },
      {
        name: "OneTouch",
        image: "https://casinoapidemo.vercel.app/ongaming.png",
        description: "Known for mobile-first gaming solutions, delivering smooth gameplay and intuitive interfaces.",
        games: "100+ games"
      },
      {
        name: "Big Time Gaming",
        image: "https://casinoapidemo.vercel.app/bigtimegamingasia.png",
        description: "Innovators of the MEGAWAYS™ mechanic, famous for high-paying slot games.",
        games: "50+ slots"
      },
      {
        name: "Mancala Gaming",
        image: "https://casinoapidemo.vercel.app/mancala.png",
        description: "Offers unique themes and game mechanics specially designed for Asian markets.",
        games: "80+ games"
      },
      {
        name: "NetEnt",
        image: "https://casinoapidemo.vercel.app/netent.png",
        description: "Renowned for premium quality slot games with outstanding graphics and bonus features.",
        games: "200+ games"
      }
    ],
    whyUsTitle: "Why Choose Our Game Providers?",
    whyUsPoints: [
      "New games added regularly",
      "All games tested for fairness and security",
      "Optimized for both mobile and desktop",
      "Games for all budgets",
      "High RTP (Return To Player) rates"
    ],
    ctaTitle: "Play and Win Today!",
    ctaText: "Find your favorite game from our providers' vast collection.",
    ctaButton: "View All Games"
  };

  const content = language === 'bangla' ? banglaContent : englishContent;
// ---------------sidebar-part-------------------
    const [showPopup, setShowPopup] = useState(false);
    const [activeLeftTab, setActiveLeftTab] = useState('আমার অ্যাকাউন্ট');
  return (
    <section className="min-h-screen font-anek bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Header with dark glass morphism effect */}
   <Header 
        className="bg-gray-900/90 backdrop-blur-sm border-b border-gray-700"
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        activeLeftTab={activeLeftTab}
        setActiveLeftTab={setActiveLeftTab}
      />
      <div className="flex">
        {/* Fixed Sidebar with dark glass morphism */}
        <div className="hidden md:block">
         <Sidebar 
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            activeLeftTab={activeLeftTab}
            setActiveLeftTab={setActiveLeftTab}
          />
        </div>

        {/* Scrollable Content */}
        <div className="ml-0 md:ml-[330px] flex-1 p-6 md:p-10 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Language Toggle Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700"
              >
                <GlobeAltIcon className="h-5 w-5" />
                <span>{language === 'bangla' ? 'English' : 'বাংলা'}</span>
              </button>
            </div>

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl p-8 md:p-12 mb-16 border border-gray-700">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{content.heroTitle}</h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl">{content.heroText}</p>
            </div>

            {/* Providers Section */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                {content.providersTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {content.providers.map((provider, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-400 transition-all hover:shadow-lg">
                    <div className="p-6">
                      <div className="flex justify-center mb-6">
                        <img 
                          src={provider.image} 
                          alt={provider.name} 
                          className="h-20 object-contain"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/200x80?text=Provider+Logo";
                            e.target.className = "h-20 object-contain opacity-50";
                          }}
                        />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-center">{provider.name}</h3>
                      <p className="text-gray-400 mb-4 text-center">{provider.description}</p>
                      <div className="bg-gray-900/50 rounded-lg px-4 py-2 text-center">
                        <span className="text-blue-400 font-medium">{provider.games}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Us Section */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-8 text-center">
                {content.whyUsTitle}
              </h2>
              <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 max-w-4xl mx-auto">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.whyUsPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-400 mr-2 mt-1">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl p-8 md:p-12 border border-gray-700">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">{content.ctaTitle}</h2>
              <p className="text-xl text-gray-300 mb-8 text-center max-w-3xl mx-auto">{content.ctaText}</p>
              <div className="text-center">
                <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                  {content.ctaButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameProviders;