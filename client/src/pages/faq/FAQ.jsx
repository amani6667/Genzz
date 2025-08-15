import React, { useState } from 'react';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { GlobeAltIcon } from '@heroicons/react/24/solid';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activePolicyIndex, setActivePolicyIndex] = useState(null);
  const [language, setLanguage] = useState('bangla'); // Default to Bangla

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const togglePolicy = (index) => {
    setActivePolicyIndex(activePolicyIndex === index ? null : index);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'bangla' : 'english');
  };

  // Bangla Content
  const banglaContent = {
    title: "সচরাচর জিজ্ঞাসিত প্রশ্ন",
    subtitle: "Genzz.casino সম্পর্কে সাধারণ প্রশ্নের উত্তর খুঁজুন",
    generalTitle: "সাধারণ প্রশ্নাবলী",
    policiesTitle: "নীতিমালা",
    needHelp: "আরও সাহায্য প্রয়োজন?",
    helpText: "আপনার প্রশ্নের উত্তর না পেলে, আমাদের গ্রাহক সহায়তা দল ২৪/৭ আপনার সহায়তার জন্য প্রস্তুত।",
    emailSupport: "ইমেইল সহায়তা",
    liveChat: "লাইভ চ্যাট",
    faqs: [
      {
        question: "Genzz.casino-এ কিভাবে অ্যাকাউন্ট তৈরি করব?",
        answer: "অ্যাকাউন্ট তৈরি করতে আমাদের হোমপেজের উপরে ডানদিকে 'সাইন আপ' বাটনে ক্লিক করুন। আপনাকে একটি বৈধ ইমেইল ঠিকানা, পাসওয়ার্ড তৈরি করতে হবে এবং আমাদের শর্তাবলীতে সম্মতি দিতে হবে। রেজিস্ট্রেশনের পর, আপনাকে আপনার ইমেইল ঠিকানা যাচাই করতে হতে পারে।"
      },
      {
        question: "Genzz.casino কোন পেমেন্ট পদ্ধতি গ্রহণ করে?",
        answer: "আমরা বিভিন্ন পেমেন্ট পদ্ধতি গ্রহণ করি যার মধ্যে ক্রেডিট/ডেবিট কার্ড (ভিসা, মাস্টারকার্ড), ই-ওয়ালেট (স্ক্রিল, নেটেলার, পেপ্যাল), ব্যাংক ট্রান্সফার এবং ক্রিপ্টোকারেন্সি (বিটকয়েন, ইথেরিয়াম, লাইটকয়েন) অন্তর্ভুক্ত। আপনার দেশের উপর ভিত্তি করে উপলব্ধ অপশনগুলো ভিন্ন হতে পারে।"
      },
      {
        question: "উইথড্রয়াল করতে কত সময় লাগে?",
        answer: "উইথড্রয়াল প্রসেসিং সময় পদ্ধতিভেদে ভিন্ন হয়: ই-ওয়ালেট সাধারণত ২৪ ঘন্টার মধ্যে প্রসেস করা হয়, ক্রেডিট/ডেবিট কার্ড ২-৫ কর্মদিবস সময় নেয়, এবং ব্যাংক ট্রান্সফার ৩-৭ কর্মদিবস সময় নিতে পারে। সমস্ত উইথড্রয়াল যাচাইকরণ চেকের অধীন যা প্রসেসিং সময় বাড়াতে পারে।"
      },
      {
        question: "ন্যূনতম ডিপোজিট পরিমাণ কত?",
        answer: "হ্যাঁ, ন্যূনতম ডিপোজিট পরিমাণ $১০ (বা অন্যান্য মুদ্রায় সমতুল্য)। কিছু পেমেন্ট পদ্ধতির উচ্চতর ন্যূনতম প্রয়োজনীয়তা থাকতে পারে।"
      },
      {
        question: "বোনাস কিভাবে ক্লেইম করব?",
        answer: "বোনাস ডিপোজিট প্রসেসের সময় অপ্ট-ইন করে বা বোনাস কোড প্রবেশ করিয়ে ক্লেইম করা যেতে পারে। কিছু বোনাস স্বয়ংক্রিয়ভাবে ক্রেডিট করা হয়। ওয়েজারিং প্রয়োজনীয়তা এবং অন্যান্য বিধিনিষেধের জন্য সর্বদা বোনাসের শর্তাবলী পরীক্ষা করুন।"
      }
    ],
    policies: [
      {
        title: "গোপনীয়তা নীতি",
        content: "Genzz.casino আপনার গোপনীয়তা রক্ষায় প্রতিশ্রুতিবদ্ধ। আমরা আমাদের সেবা প্রদান, লেনদেন প্রক্রিয়াকরণ এবং আইনি বাধ্যবাধকতা পূরণের জন্য প্রয়োজনীয় ব্যক্তিগত তথ্য সংগ্রহ করি। আপনার ডেটা অ্যাকাউন্ট ব্যবস্থাপনা, গ্রাহক সহায়তা, জালিয়াতি প্রতিরোধ এবং (সম্মতির সাথে) বিপণনের জন্য ব্যবহার করা হতে পারে। আমরা শক্তিশালী নিরাপত্তা ব্যবস্থা বাস্তবায়ন করি এবং শুধুমাত্র সেবা প্রদান বা আইনি সম্মতির জন্য প্রয়োজন হলে বিশ্বস্ত তৃতীয় পক্ষের সাথে ডেটা শেয়ার করি। আইনি ধারণ প্রয়োজনীয়তার সাপেক্ষে আপনার ব্যক্তিগত তথ্য অ্যাক্সেস, সংশোধন বা মুছে ফেলার অধিকার আপনার আছে।"
      },
      {
        title: "দায়িত্বশীল জুয়া",
        content: "Genzz.casino দায়িত্বশীল জুয়া প্রচার করে। আমরা আপনার জুয়া নিয়ন্ত্রণে সাহায্য করার জন্য সরঞ্জাম প্রদান করি, যার মধ্যে ডিপোজিট লিমিট, লস লিমিট, ওয়েজার লিমিট, সেশন সময় রিমাইন্ডার এবং স্ব-বর্জন অপশন অন্তর্ভুক্ত। আমরা আপনাকে শুধুমাত্র সেই অর্থ দিয়ে জুয়া খেলতে উত্সাহিত করি যা আপনি হারাতে সামর্থ্য রাখেন, নিয়মিত বিরতি নিতে এবং লোকসান পূরণের চেষ্টা এড়াতে। যদি আপনি মনে করেন আপনার জুয়া সমস্যা থাকতে পারে, আমরা পেশাদার সাহায্য সংস্থার লিঙ্ক প্রদান করি। আপনি যেকোনো সময় আপনার অ্যাকাউন্ট সেটিংসে লিমিট সেট করতে বা স্ব-বর্জন করতে পারেন।"
      }
    ]
  };

  // English Content
  const englishContent = {
    title: "Frequently Asked Questions",
    subtitle: "Find answers to common questions about Genzz.casino",
    generalTitle: "General Questions",
    policiesTitle: "Policies",
    needHelp: "Need more help?",
    helpText: "If you didn't find the answer to your question, our customer support team is available 24/7 to assist you.",
    emailSupport: "Email Support",
    liveChat: "Live Chat",
    faqs: [
      {
        question: "How do I create an account on Genzz.casino?",
        answer: "To create an account, click on the 'Sign Up' button at the top right corner of our homepage. You'll need to provide a valid email address, create a password, and agree to our terms and conditions. After registration, you may need to verify your email address."
      },
      {
        question: "What payment methods does Genzz.casino accept?",
        answer: "We accept various payment methods including credit/debit cards (Visa, MasterCard), e-wallets (Skrill, Neteller, PayPal), bank transfers, and cryptocurrencies (Bitcoin, Ethereum, Litecoin). The available options may vary depending on your country."
      },
      {
        question: "How long do withdrawals take?",
        answer: "Withdrawal processing times vary by method: e-wallets are typically processed within 24 hours, credit/debit cards take 2-5 business days, and bank transfers may take 3-7 business days. All withdrawals are subject to verification checks which may extend processing time."
      },
      {
        question: "Is there a minimum deposit amount?",
        answer: "Yes, the minimum deposit amount is $10 (or equivalent in other currencies). Some payment methods may have higher minimum requirements."
      },
      {
        question: "How do I claim bonuses?",
        answer: "Bonuses can be claimed either by opting in during the deposit process or by entering a bonus code if available. Some bonuses are credited automatically. Always check the bonus terms and conditions for wagering requirements and other restrictions."
      }
    ],
    policies: [
      {
        title: "Privacy Policy",
        content: "Genzz.casino is committed to protecting your privacy. We collect personal information necessary to provide our services, process transactions, and comply with legal obligations. Your data may be used for account management, customer support, fraud prevention, and (with consent) marketing. We implement robust security measures and only share data with trusted third parties when necessary for service provision or legal compliance. You have rights to access, correct, or delete your personal information, subject to legal retention requirements."
      },
      {
        title: "Responsible Gambling",
        content: "Genzz.casino promotes responsible gambling. We provide tools to help you control your gambling, including deposit limits, loss limits, wager limits, session time reminders, and self-exclusion options. We encourage you to gamble only with money you can afford to lose, to take regular breaks, and to avoid chasing losses. If you believe you may have a gambling problem, we provide links to professional help organizations. You can set limits or self-exclude at any time in your account settings."
      }
    ]
  };

  const content = language === 'bangla' ? banglaContent : englishContent;
// ---------------sidebar-part------------------
    const [showPopup, setShowPopup] = useState(false);
    const [activeLeftTab, setActiveLeftTab] = useState('আমার অ্যাকাউন্ট');
  return (
    <section className="min-h-screen w-full font-anek bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Header with dark glass morphism effect */}
    <Header 
        className="bg-gray-900/90 backdrop-blur-sm border-b border-gray-700"
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        activeLeftTab={activeLeftTab}
        setActiveLeftTab={setActiveLeftTab}
      />
      <div className="flex w-full">
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
        <div className="ml-0 md:ml-[330px] flex-1 p-6 md:p-10 overflow-y-auto w-full">
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

            <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              {content.title}
            </h1>
            <p className="text-gray-400 mb-10">
              {content.subtitle}
            </p>

            <div className="mb-20">
              <h2 className="text-2xl font-semibold mb-6 text-cyan-400">
                {content.generalTitle}
              </h2>
              <div className="space-y-4">
                {content.faqs.map((faq, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700">
                    <button
                      className="w-full px-6 py-4 text-left cursor-pointer flex justify-between items-center hover:bg-gray-700/50 transition-colors"
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

            <div>
              <h2 className="text-2xl font-semibold mb-6 text-purple-400">
                {content.policiesTitle}
              </h2>
              <div className="space-y-4">
                {content.policies.map((policy, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700">
                    <button
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-700/50 transition-colors"
                      onClick={() => togglePolicy(index)}
                    >
                      <span className="font-medium text-lg">{policy.title}</span>
                      {activePolicyIndex === index ? (
                        <ChevronUpIcon className="h-5 w-5 text-purple-400" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5 text-purple-400" />
                      )}
                    </button>
                    {activePolicyIndex === index && (
                      <div className="px-6 pb-4 pt-2 text-gray-300">
                        {policy.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-700">
              <h3 className="text-xl font-semibold mb-4">{content.needHelp}</h3>
              <p className="text-gray-400 mb-6">
                {content.helpText}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="mailto:support@genzz.casino" 
                  className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-medium text-center transition-colors"
                >
                  {content.emailSupport}
                </a>
                <a 
                  href="/live-chat" 
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium text-center transition-colors"
                >
                  {content.liveChat}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;