import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-4 sm:px-8 mt-[50px] lg:px-16 py-10 text-sm border-t border-gray-800">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {/* Column 1 */}
        <div>
          <h3 className="text-lg text-cyan-400 font-semibold mb-2">ক্যাসিনো</h3>
          <ul className="space-y-1">
            <li className="hover:text-cyan-400 cursor-pointer transition-colors">অফার</li>
            <li className="hover:text-cyan-400 cursor-pointer transition-colors">মিশন</li>
            <li className="hover:text-cyan-400 cursor-pointer transition-colors">পুরস্কার কেন্দ্র</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-lg text-cyan-400 font-semibold mb-2">খেলা</h3>
          <ul className="space-y-1">
            <li className="hover:text-cyan-400 cursor-pointer transition-colors">ক্যাসিনো</li>
            <li className="hover:text-cyan-400 cursor-pointer transition-colors">ফিশিং</li>
            <li className="hover:text-cyan-400 cursor-pointer transition-colors">পোকার</li>
            <li className="hover:text-cyan-400 cursor-pointer transition-colors">লাইভ</li>
            <li className="hover:text-cyan-400 cursor-pointer transition-colors">স্পোর্টস</li>
            <li className="hover:text-cyan-400 cursor-pointer transition-colors">ই-স্পোর্টস</li>
            <li className="hover:text-cyan-400 cursor-pointer transition-colors">লটারি</li>
            <li className="hover:text-cyan-400 cursor-pointer transition-colors">মুরগির যুদ্ধ</li>
            <li className="hover:text-cyan-400 cursor-pointer transition-colors">প্রিয় আইটেমস</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-lg text-cyan-400 font-semibold mb-2">SUPPORT</h3>
          <ul className="space-y-1">
            <li className="hover:text-cyan-400 cursor-pointer transition-colors">গ্রাহক সেবা</li>
            <li className="hover:text-cyan-400 cursor-pointer transition-colors">FAQ</li>
          </ul>
        </div>

        {/* Column 4 - Description */}
        <div>
          <p className="text-gray-400 leading-relaxed">
            Zenzz.casino is one of the world's most renowned online gambling operators, offering a thrilling and entertaining range of games, including live casino, chess, slot games, fishing, lottery, and sports betting. It is authorized and regulated by the government of Curaçao and operates under license number Antillephone issued to 8048/JAZ. It has passed all compliance checks and holds legal authorization to conduct all gaming operations involving opportunities and betting.
          </p>
        </div>
      </div>

      {/* Vendor Logos */}
      <div className="flex flex-wrap justify-center items-center gap-6 mb-6">
        <img 
          src="https://images.6949393020.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PG-COLOR.png" 
          alt="PG" 
          className="h-6 filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" 
        />
        <img 
          src="https://images.6949393020.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/EG2-COLOR.png" 
          alt="EG" 
          className="h-6 filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" 
        />
        <img 
          src="https://images.6949393020.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/JDB-COLOR.png" 
          alt="JDB" 
          className="h-6 filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" 
        />
        <img 
          src="https://images.6949393020.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/CQ9-COLOR.png" 
          alt="CQ9" 
          className="h-6 filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" 
        />
        <img 
          src="https://images.6949393020.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/FC-COLOR.png" 
          alt="FC" 
          className="h-6 filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" 
        />
        <img 
          src="https://images.6949393020.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/JL-COLOR.png" 
          alt="JL" 
          className="h-6 filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" 
        />
        <img 
          src="https://images.6949393020.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/BGS-COLOR.png" 
          alt="BGS" 
          className="h-6 filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" 
        />
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-xs border-t border-gray-800 pt-6">
        <p>কপিরাইট © 2025 Zenzz.casino সমস্ত অধিকার সংরক্ষিত।</p>
        <div className="flex justify-center gap-4 mt-2">
          <span className="hover:text-cyan-400 cursor-pointer transition-colors">Terms of Service</span>
          <span className="hover:text-cyan-400 cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-cyan-400 cursor-pointer transition-colors">Responsible Gaming</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;