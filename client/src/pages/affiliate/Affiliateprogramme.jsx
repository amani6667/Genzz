import React, { useState } from 'react';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { GlobeAltIcon, CurrencyDollarIcon, ChartBarIcon, UserGroupIcon, CreditCardIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

const Affiliateprogramme = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [language, setLanguage] = useState('bangla');

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'bangla' : 'english');
  };

  // Bangla Content
  const banglaContent = {
    title: "অ্যাফিলিয়েট প্রোগ্রাম",
    subtitle: "Genzz.casino-এর সাথে অর্থ উপার্জন করুন",
    heroTitle: "আমাদের অ্যাফিলিয়েট প্রোগ্রামে যোগ দিন এবং উচ্চ কমিশন উপার্জন করুন",
    heroText: "আপনার নেটওয়ার্কের খেলোয়াড়দের Genzz.casino-এ রেফার করুন এবং তাদের প্রতিটি ডিপোজিট থেকে 25%-45% কমিশন পান।",
    ctaButton: "এখনই নিবন্ধন করুন",
    featuresTitle: "আমাদের অ্যাফিলিয়েট প্রোগ্রামের সুবিধাগুলি",
    features: [
      {
        icon: <CurrencyDollarIcon className="h-10 w-10 text-purple-400" />,
        title: "উচ্চ কমিশন হার",
        description: "আমরা শিল্পের মধ্যে সবচেয়ে প্রতিযোগিতামূলক কমিশন হার অফার করি, 25% থেকে 45% পর্যন্ত।"
      },
      {
        icon: <ChartBarIcon className="h-10 w-10 text-cyan-400" />,
        title: "বাস্তব সময়ের পরিসংখ্যান",
        description: "আমাদের উন্নত ড্যাশবোর্ডের মাধ্যমে আপনার পারফরম্যান্স ট্র্যাক করুন বাস্তব সময়ে।"
      },
      {
        icon: <UserGroupIcon className="h-10 w-10 text-green-400" />,
        title: "বহু স্তরের প্রোগ্রাম",
        description: "আপনার সরাসরি রেফারেল ছাড়াও আপনার সাব-অ্যাফিলিয়েটদের রেফারেল থেকে উপার্জন করুন।"
      },
      {
        icon: <CreditCardIcon className="h-10 w-10 text-yellow-400" />,
        title: "নিয়মিত অর্থপ্রদান",
        description: "সাপ্তাহিক বা মাসিক ভিত্তিতে আপনার উপার্জন উত্তোলন করুন।"
      },
      {
        icon: <ArrowPathIcon className="h-10 w-10 text-red-400" />,
        title: "লাইফটাইম রেফারেল",
        description: "আপনার রেফার করা খেলোয়াড়দের থেকে আজীবন উপার্জন করুন।"
      }
    ],
    howItWorksTitle: "এটি কিভাবে কাজ করে",
    howItWorksSteps: [
      "আমাদের অ্যাফিলিয়েট প্রোগ্রামে নিবন্ধন করুন",
      "আপনার অনন্য রেফারেল লিঙ্ক পান",
      "সোশ্যাল মিডিয়া, ব্লগ বা অন্যান্য চ্যানেলে আপনার লিঙ্ক শেয়ার করুন",
      "আপনার রেফারেল খেলোয়াড়দের ডিপোজিট থেকে কমিশন উপার্জন করুন"
    ],
    faqTitle: "সচরাচর জিজ্ঞাসিত প্রশ্ন",
    faqs: [
      {
        question: "আমি কিভাবে অ্যাফিলিয়েট প্রোগ্রামে যোগ দিতে পারি?",
        answer: "আমাদের ওয়েবসাইটে অ্যাফিলিয়েট সেকশনে গিয়ে নিবন্ধন ফর্ম পূরণ করুন। অনুমোদনের পর, আপনি লগইন করে আপনার রেফারেল লিঙ্ক পাবেন।"
      },
      {
        question: "আমি কতটা উপার্জন করতে পারি?",
        answer: "আপনার উপার্জন আপনার রেফারেল খেলোয়াড়দের গেমিং কার্যকলাপের উপর নির্ভর করে। আমাদের শীর্ষ অ্যাফিলিয়েটরা প্রতি মাসে $10,000+ উপার্জন করে।"
      },
      {
        question: "পেমেন্ট কখন পাব?",
        answer: "আমরা প্রতি সোমবার পেমেন্ট প্রক্রিয়া করি যদি আপনার ব্যালেন্স ন্যূনতম $100 হয়।"
      },
      {
        question: "আমি কি একাধিক অ্যাকাউন্ট তৈরি করতে পারি?",
        answer: "না, একাধিক অ্যাকাউন্ট তৈরি করা আমাদের নীতির লঙ্ঘন এবং সমস্ত অ্যাকাউন্ট বন্ধ করার কারণ হবে।"
      }
    ],
    ctaSectionTitle: "আজই শুরু করুন এবং উপার্জন করুন!",
    ctaSectionText: "আমাদের অ্যাফিলিয়েট প্রোগ্রামে যোগ দিন এবং আপনার আয়ের সম্ভাবনা উন্মুক্ত করুন।",
    ctaButton: "এখনই নিবন্ধন করুন"
  };

  // English Content
  const englishContent = {
    title: "Affiliate Program",
    subtitle: "Earn with Genzz.casino",
    heroTitle: "Join our Affiliate Program and earn high commissions",
    heroText: "Refer players from your network to Genzz.casino and earn 25%-45% commission from each of their deposits.",
    ctaButton: "Register Now",
    featuresTitle: "Benefits of our Affiliate Program",
    features: [
      {
        icon: <CurrencyDollarIcon className="h-10 w-10 text-purple-400" />,
        title: "High Commission Rates",
        description: "We offer the most competitive commission rates in the industry, from 25% up to 45%."
      },
      {
        icon: <ChartBarIcon className="h-10 w-10 text-cyan-400" />,
        title: "Real-time Statistics",
        description: "Track your performance in real-time through our advanced dashboard."
      },
      {
        icon: <UserGroupIcon className="h-10 w-10 text-green-400" />,
        title: "Multi-tier Program",
        description: "Earn from referrals of your sub-affiliates in addition to your direct referrals."
      },
      {
        icon: <CreditCardIcon className="h-10 w-10 text-yellow-400" />,
        title: "Regular Payouts",
        description: "Withdraw your earnings weekly or monthly."
      },
      {
        icon: <ArrowPathIcon className="h-10 w-10 text-red-400" />,
        title: "Lifetime Referrals",
        description: "Earn lifetime revenue from players you refer."
      }
    ],
    howItWorksTitle: "How It Works",
    howItWorksSteps: [
      "Register for our affiliate program",
      "Get your unique referral link",
      "Share your link on social media, blogs or other channels",
      "Earn commission from your referred players' deposits"
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        question: "How do I join the affiliate program?",
        answer: "Go to the affiliate section on our website and complete the registration form. After approval, you can log in to get your referral links."
      },
      {
        question: "How much can I earn?",
        description: "Your earnings depend on the gaming activity of your referred players. Our top affiliates earn $10,000+ per month."
      },
      {
        question: "When will I get paid?",
        answer: "We process payments every Monday if your balance reaches the minimum $100 threshold."
      },
      {
        question: "Can I create multiple accounts?",
        answer: "No, creating multiple accounts violates our policy and will result in all accounts being closed."
      }
    ],
    ctaSectionTitle: "Start Earning Today!",
    ctaSectionText: "Join our affiliate program and unlock your earning potential.",
    ctaButton: "Register Now"
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
                className="flex items-center gap-2 px-4 cursor-pointer py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700"
              >
                <GlobeAltIcon className="h-5 w-5" />
                <span>{language === 'bangla' ? 'English' : 'বাংলা'}</span>
              </button>
            </div>

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 rounded-xl p-8 md:p-12 mb-16 border border-gray-700">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{content.heroTitle}</h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl">{content.heroText}</p>
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-cyan-700 transition-all">
                {content.ctaButton}
              </button>
            </div>

            {/* Features Section */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                {content.featuresTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {content.features.map((feature, index) => (
                  <div key={index} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-cyan-400 transition-all">
                    <div className="mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works Section */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-8 text-center">{content.howItWorksTitle}</h2>
              <div className="relative">
                <div className="absolute left-4 md:left-1/2 h-full w-1 bg-gradient-to-b from-purple-500 to-cyan-500 -translate-x-1/2"></div>
                <div className="space-y-8">
                  {content.howItWorksSteps.map((step, index) => (
                    <div key={index} className="relative pl-12 md:pl-0">
                      <div className="flex items-start">
                        <div className="hidden md:flex md:w-1/2 md:pr-12 md:justify-end">
                          {index % 2 === 0 && (
                            <div className="text-right pr-8 pt-2">
                              <p className="text-lg font-medium">{step}</p>
                            </div>
                          )}
                        </div>
                        <div className="absolute left-0 md:left-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 -translate-x-1/2">
                          <span className="text-white font-bold">{index + 1}</span>
                        </div>
                        <div className="hidden md:flex md:w-1/2 md:pl-12">
                          {index % 2 !== 0 && (
                            <div className="pl-8 pt-2">
                              <p className="text-lg font-medium">{step}</p>
                            </div>
                          )}
                        </div>
                        <div className="md:hidden pl-4 pt-1">
                          <p className="text-lg font-medium">{step}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-8 text-center">{content.faqTitle}</h2>
              <div className="space-y-4 max-w-3xl mx-auto">
                {content.faqs.map((faq, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700">
                    <button
                      className="w-full px-6 py-4 text-left flex cursor-pointer  justify-between items-center hover:bg-gray-700/50 transition-colors"
                      onClick={() => toggleFAQ(index)}
                    >
                      <span className="font-medium text-lg">{faq.question}</span>
                      {activeIndex === index ? (
                        <ChevronUpIcon className="h-5 w-5 text-cyan-400" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5 text-cyan-400" />
                      )}
                    </button>
                    {activeIndex === index && (
                      <div className="px-6 pb-4 pt-2 text-gray-300">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 rounded-xl p-8 md:p-12 border border-gray-700">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">{content.ctaSectionTitle}</h2>
              <p className="text-xl text-gray-300 mb-8 text-center max-w-3xl mx-auto">{content.ctaSectionText}</p>
              <div className="text-center">
                <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-cyan-700 transition-all">
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

export default Affiliateprogramme;