import React, { useState } from 'react';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { GlobeAltIcon, StarIcon, GiftIcon, ShieldCheckIcon, ClockIcon, TicketIcon, UserCircleIcon } from '@heroicons/react/24/solid';

const Vipclub = () => {
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
    title: "ভিআইপি ক্লাব",
    subtitle: "Genzz.casino-এর এক্সক্লুসিভ ভিআইপি অভিজ্ঞতা",
    heroTitle: "Genzz.casino ভিআইপি ক্লাবে উন্নীত হন",
    heroText: "আমাদের ভিআইপি সদস্যদের জন্য বিশেষ পুরস্কার, উচ্চতর উত্তোলন সীমা, ব্যক্তিগত অ্যাকাউন্ট ম্যানেজার এবং আরও অনেক কিছু আনলক করুন।",
    ctaButton: "ভিআইপি হওয়ার যোগ্যতা পরীক্ষা করুন",
    levelsTitle: "ভিআইপি স্তরসমূহ",
    levels: [
      {
        name: "ব্রোঞ্জ",
        requirements: "মাসিক ৳1,000 ডিপোজিট",
        benefits: [
          "১০% সাপ্তাহিক ক্যাশব্যাক",
          "বিশেষ ব্রোঞ্জ বোনাস",
          "২৪/৭ প্রাথমিক সহায়তা"
        ]
      },
      {
        name: "সিলভার",
        requirements: "মাসিক ৳5,000 ডিপোজিট",
        benefits: [
          "১৫% সাপ্তাহিক ক্যাশব্যাক",
          "বিশেষ সিলভার বোনাস",
          "দ্রুত উত্তোলন প্রক্রিয়াকরণ",
          "ব্যক্তিগত বোনাস অফার"
        ]
      },
      {
        name: "গোল্ড",
        requirements: "মাসিক ৳15,000 ডিপোজিট",
        benefits: [
          "২০% সাপ্তাহিক ক্যাশব্যাক",
          "বিশেষ গোল্ড বোনাস",
          "নিবেদিত অ্যাকাউন্ট ম্যানেজার",
          "উচ্চ উত্তোলন সীমা",
          "উপহার এবং সারপ্রাইজ"
        ]
      },
      {
        name: "প্লাটিনাম",
        requirements: "মাসিক ৳50,000 ডিপোজিট",
        benefits: [
          "২৫% সাপ্তাহিক ক্যাশব্যাক",
          "বিশেষ প্লাটিনাম বোনাস",
          "২৪/৭ নিবেদিত সহায়তা",
          "এক্সক্লুসিভ ইভেন্ট আমন্ত্রণ",
          "লাক্সারী উপহার",
          "কাস্টমাইজড রিওয়ার্ডস"
        ]
      }
    ],
    benefitsTitle: "ভিআইপি সদস্যদের সুবিধাসমূহ",
    benefits: [
      {
        icon: <StarIcon className="h-10 w-10 text-yellow-400" />,
        title: "এক্সক্লুসিভ বোনাস",
        description: "ভিআইপি সদস্যদের জন্য বিশেষ ডিপোজিট বোনাস এবং ক্যাশব্যাক অফার।"
      },
      {
        icon: <GiftIcon className="h-10 w-10 text-purple-400" />,
        title: "ব্যক্তিগত উপহার",
        description: "জন্মদিনের উপহার, বার্ষিকী বোনাস এবং বিশেষ অনুষ্ঠানের জন্য সারপ্রাইজ।"
      },
      {
        icon: <ShieldCheckIcon className="h-10 w-10 text-cyan-400" />,
        title: "উচ্চ উত্তোলন সীমা",
        description: "ভিআইপি স্তর অনুযায়ী দৈনিক এবং মাসিক উত্তোলন সীমা বৃদ্ধি পায়।"
      },
      {
        icon: <ClockIcon className="h-10 w-10 text-green-400" />,
        title: "দ্রুত উত্তোলন",
        description: "ভিআইপি সদস্যদের উত্তোলন অগ্রাধিকার ভিত্তিতে প্রক্রিয়াকরণ করা হয়।"
      },
      {
        icon: <TicketIcon className="h-10 w-10 text-red-400" />,
        title: "এক্সক্লুসিভ ইভেন্ট",
        description: "ভিআইপি-মাত্র স্পোর্টস ইভেন্ট, কনসার্ট এবং ভিআইপি পার্টির আমন্ত্রণ।"
      },
      {
        icon: <UserCircleIcon className="h-10 w-10 text-blue-400" />,
        title: "ব্যক্তিগত ম্যানেজার",
        description: "গোল্ড এবং প্লাটিনাম সদস্যদের জন্য নিবেদিত অ্যাকাউন্ট ম্যানেজার।"
      }
    ],
    faqTitle: "সচরাচর জিজ্ঞাসিত প্রশ্ন",
    faqs: [
      {
        question: "আমি কিভাবে ভিআইপি ক্লাবে যোগদান করতে পারি?",
        answer: "ভিআইপি ক্লাবে স্বয়ংক্রিয়ভাবে আমন্ত্রণ করা হয় যখন আপনি নির্দিষ্ট মাসিক ডিপোজিট প্রয়োজনীয়তা পূরণ করেন। আপনি আপনার অ্যাকাউন্টে লগ ইন করে আপনার ভিআইপি স্ট্যাটাস চেক করতে পারেন।"
      },
      {
        question: "ভিআইপি স্তর কিভাবে নির্ধারণ করা হয়?",
        answer: "ভিআইপি স্তর আপনার ৩০ দিনের রোলিং ডিপোজিট ভলিউমের উপর ভিত্তি করে নির্ধারিত হয়। প্রতিটি স্তরের জন্য নির্দিষ্ট ডিপোজিট থ্রেশহোল্ড রয়েছে।"
      },
      {
        question: "ভিআইপি সুবিধাগুলো কি?",
        answer: "ভিআইপি সদস্যদের উচ্চতর ক্যাশব্যাক শতাংশ, বিশেষ বোনাস, দ্রুত উত্তোলন, ব্যক্তিগত অ্যাকাউন্ট ম্যানেজার এবং এক্সক্লুসিভ ইভেন্ট আমন্ত্রণ সহ বিভিন্ন সুবিধা দেওয়া হয়।"
      },
      {
        question: "আমি কি ভিআইপি স্ট্যাটাস হারাতে পারি?",
        answer: "হ্যাঁ, যদি আপনি তিন মাস ধরে আপনার ভিআইপি স্তরের প্রয়োজনীয়তা পূরণ না করেন, তাহলে আপনি একটি নিম্ন স্তরে অবনমিত হতে পারেন।"
      }
    ],
    ctaSectionTitle: "আজই ভিআইপি ক্লাবে যোগ দিন!",
    ctaSectionText: "আমাদের ভিআইপি প্রোগ্রামে যোগদান করুন এবং এক্সক্লুসিভ সুবিধা ও পুরস্কার উপভোগ করুন।",
    ctaButton: "আমার ভিআইপি স্ট্যাটাস চেক করুন"
  };

  // English Content
  const englishContent = {
    title: "VIP Club",
    subtitle: "Exclusive VIP experience at Genzz.casino",
    heroTitle: "Elevate to Genzz.casino VIP Club",
    heroText: "Unlock special rewards, higher withdrawal limits, personal account manager and much more for our VIP members.",
    ctaButton: "Check VIP Eligibility",
    levelsTitle: "VIP Levels",
    levels: [
      {
        name: "Bronze",
        requirements: "Monthly ৳1,000 deposit",
        benefits: [
          "10% weekly cashback",
          "Special bronze bonus",
          "24/7 basic support"
        ]
      },
      {
        name: "Silver",
        requirements: "Monthly ৳5,000 deposit",
        benefits: [
          "15% weekly cashback",
          "Special silver bonus",
          "Faster withdrawal processing",
          "Personal bonus offers"
        ]
      },
      {
        name: "Gold",
        requirements: "Monthly ৳15,000 deposit",
        benefits: [
          "20% weekly cashback",
          "Special gold bonus",
          "Dedicated account manager",
          "Higher withdrawal limits",
          "Gifts and surprises"
        ]
      },
      {
        name: "Platinum",
        requirements: "Monthly ৳50,000 deposit",
        benefits: [
          "25% weekly cashback",
          "Special platinum bonus",
          "24/7 dedicated support",
          "Exclusive event invitations",
          "Luxury gifts",
          "Customized rewards"
        ]
      }
    ],
    benefitsTitle: "VIP Member Benefits",
    benefits: [
      {
        icon: <StarIcon className="h-10 w-10 text-yellow-400" />,
        title: "Exclusive Bonuses",
        description: "Special deposit bonuses and cashback offers for VIP members."
      },
      {
        icon: <GiftIcon className="h-10 w-10 text-purple-400" />,
        title: "Personal Gifts",
        description: "Birthday presents, anniversary bonuses and surprises for special occasions."
      },
      {
        icon: <ShieldCheckIcon className="h-10 w-10 text-cyan-400" />,
        title: "Higher Withdrawal Limits",
        description: "Increased daily and monthly withdrawal limits according to VIP level."
      },
      {
        icon: <ClockIcon className="h-10 w-10 text-green-400" />,
        title: "Faster Withdrawals",
        description: "VIP members' withdrawals are processed on priority basis."
      },
      {
        icon: <TicketIcon className="h-10 w-10 text-red-400" />,
        title: "Exclusive Events",
        description: "Invitations to VIP-only sports events, concerts and parties."
      },
      {
        icon: <UserCircleIcon className="h-10 w-10 text-blue-400" />,
        title: "Personal Manager",
        description: "Dedicated account manager for Gold and Platinum members."
      }
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        question: "How do I join the VIP Club?",
        answer: "Invitation to the VIP Club is automatic when you meet specific monthly deposit requirements. You can check your VIP status by logging into your account."
      },
      {
        question: "How are VIP levels determined?",
        answer: "VIP levels are based on your 30-day rolling deposit volume. Each tier has specific deposit thresholds."
      },
      {
        question: "What are the VIP benefits?",
        answer: "VIP members receive various benefits including higher cashback percentages, special bonuses, faster withdrawals, personal account managers and invitations to exclusive events."
      },
      {
        question: "Can I lose my VIP status?",
        answer: "Yes, if you don't meet your VIP tier requirements for three consecutive months, you may be downgraded to a lower level."
      }
    ],
    ctaSectionTitle: "Join the VIP Club Today!",
    ctaSectionText: "Enroll in our VIP program and enjoy exclusive benefits and rewards.",
    ctaButton: "Check My VIP Status"
  };

  const content = language === 'bangla' ? banglaContent : englishContent;
// ------------------------sidebar-part-------------------
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
            <div className="bg-gradient-to-r from-purple-900/50 to-yellow-900/50 rounded-xl p-8 md:p-12 mb-16 border border-gray-700">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{content.heroTitle}</h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl">{content.heroText}</p>
              <button className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-purple-600 rounded-lg font-bold text-lg hover:from-yellow-700 hover:to-purple-700 transition-all">
                {content.ctaButton}
              </button>
            </div>

            {/* VIP Levels Section */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-purple-500">
                {content.levelsTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {content.levels.map((level, index) => (
                  <div key={index} className={`bg-gray-800/50 p-6 rounded-xl border ${index === 0 ? 'border-yellow-600' : index === 1 ? 'border-gray-400' : index === 2 ? 'border-yellow-400' : 'border-purple-400'} hover:shadow-lg transition-all`}>
                    <h3 className={`text-2xl font-bold mb-4 ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : index === 2 ? 'text-yellow-300' : 'text-purple-300'}`}>
                      {level.name}
                    </h3>
                    <div className="mb-4 p-4 bg-gray-900/50 rounded-lg">
                      <h4 className="font-semibold mb-2">{language === 'bangla' ? "প্রয়োজনীয়তা" : "Requirements"}</h4>
                      <p>{level.requirements}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">{language === 'bangla' ? "সুবিধাসমূহ" : "Benefits"}</h4>
                      <ul className="space-y-2">
                        {level.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2 mt-1">•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits Section */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-12 text-center">
                {content.benefitsTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.benefits.map((benefit, index) => (
                  <div key={index} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-yellow-400 transition-all">
                    <div className="mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-400">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-8 text-center">{content.faqTitle}</h2>
              <div className="space-y-4 max-w-3xl mx-auto">
                {content.faqs.map((faq, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700">
                    <button
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-700/50 transition-colors"
                      onClick={() => toggleFAQ(index)}
                    >
                      <span className="font-medium text-lg">{faq.question}</span>
                      {activeIndex === index ? (
                        <ChevronUpIcon className="h-5 w-5 text-yellow-400" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5 text-yellow-400" />
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
            <div className="bg-gradient-to-r from-purple-900/50 to-yellow-900/50 rounded-xl p-8 md:p-12 border border-gray-700">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">{content.ctaSectionTitle}</h2>
              <p className="text-xl text-gray-300 mb-8 text-center max-w-3xl mx-auto">{content.ctaSectionText}</p>
              <div className="text-center">
                <button className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-purple-600 rounded-lg font-bold text-lg hover:from-yellow-700 hover:to-purple-700 transition-all">
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

export default Vipclub;