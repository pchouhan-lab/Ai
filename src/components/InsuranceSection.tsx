import React from "react";
import { motion } from "motion/react";
import { ShieldAlert, Umbrella, Car, Home, Ship, HeartPulse, Smile, Activity } from "lucide-react";

// Import the generated images
import autoImg from "../assets/images/auto_insurance_1782983144743.jpg";
import homeImg from "../assets/images/home_insurance_1782983158613.jpg";
import recImg from "../assets/images/recreational_vehicles_1782983172703.jpg";
import petImg from "../assets/images/pet_insurance_1782983186518.jpg";
import dentalImg from "../assets/images/dental_service_1782983206802.jpg";
import disabilityImg from "../assets/images/disability_insurance_1782983219947.jpg";

interface InsuranceCategory {
  title: string;
  image: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
}

export default function InsuranceSection() {
  const categories: InsuranceCategory[] = [
    {
      title: "AUTO INSURANCE",
      image: autoImg,
      icon: <Car className="w-4 h-4 text-amber-500" />,
      description: "Comprehensive multi-vehicle syndicate coverage for rare exotics, vintage collectibles, and high-performance automotive portfolios.",
      features: ["Full replacement value payout", "Worldwide transit & track protection", "Agreed value documentation"]
    },
    {
      title: "HOME INSURANCE",
      image: homeImg,
      icon: <Home className="w-4 h-4 text-blue-400" />,
      description: "Bespoke protection plans safeguarding high-value estates, historic architectural heritage properties, and private family compounds.",
      features: ["All-risk replacement cost", "Catastrophic climate indemnity", "Fine art & fixture coverage"]
    },
    {
      title: "RECREATIONAL VEHICLES",
      image: recImg,
      icon: <Ship className="w-4 h-4 text-teal-400" />,
      description: "Specialized underwriters covering superyachts, personal watercrafts, custom motorhomes, and high-value recreational fleets.",
      features: ["Global marine hull liability", "Tender and auxiliary equipment", "Storm surge extraction coverage"]
    },
    {
      title: "PET INSURANCE",
      image: petImg,
      icon: <HeartPulse className="w-4 h-4 text-rose-400" />,
      description: "Dedicated private client pet healthcare coverages guaranteeing access to elite veterinary specialists globally.",
      features: ["Uncapped specialty treatments", "Genetic and chronic care", "International veterinary transit"]
    },
    {
      title: "DENTAL SERVICE",
      image: dentalImg,
      icon: <Smile className="w-4 h-4 text-emerald-400" />,
      description: "Elite diagnostic and premium restorative dental services supported by a selected circle of master prosthodontists.",
      features: ["Full cosmetic restoration", "Global specialist networks", "No-cap diagnostic coverage"]
    },
    {
      title: "DISABILITY",
      image: disabilityImg,
      icon: <Activity className="w-4 h-4 text-purple-400" />,
      description: "High-limit income and capability protection safeguarding the lifestyle, equity portfolios, and continuity of executives.",
      features: ["Own-occupation definition", "High-limit lump sum payouts", "Global medical rehabilitation access"]
    }
  ];

  return (
    <div id="insurance-section" className="bg-[#0A0C0E] py-20 lg:py-28 border-b border-[#323436] relative overflow-hidden">
      {/* Background ambient texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#1c1d1f]/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Centered Heading exactly as requested with subtitle and sleek line */}
        <div className="text-center space-y-4 mb-20">
          <span className="block font-sans text-[10px] uppercase tracking-[0.4em] text-[#A89E8D] font-bold">
            Muhlenbruch Portfolios
          </span>
          <div className="inline-block relative">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-[0.15em] text-[#F4F1EA] uppercase font-light">
              Insurance
            </h2>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-[#A89E8D]" />
          </div>
          <p className="text-xs text-[#A89E8D]/60 max-w-xl mx-auto font-sans leading-relaxed pt-3">
            Sovereign risk solutions protecting your assets, wellness, and peace of mind. Underwritten with discrete integrity.
          </p>
        </div>

        {/* 3x2 Bento-like Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-[#111315] border border-[#323436]/60 hover:border-[#A89E8D] transition-all duration-500 overflow-hidden flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0A0C0E] border-b border-[#323436]/50">
                <img
                  src={category.image}
                  alt={category.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111315] via-transparent to-transparent opacity-80" />
                
                {/* Floating Sector Badge */}
                <div className="absolute top-4 right-4 bg-[#0A0C0E]/90 backdrop-blur-md border border-[#323436] p-2 flex items-center justify-center transition-colors group-hover:border-[#A89E8D]">
                  {category.icon}
                </div>
              </div>

              {/* Text Area */}
              <div className="p-6 lg:p-8 flex-grow flex flex-col justify-between space-y-6 bg-gradient-to-b from-[#111315] to-[#0E1012]">
                <div className="space-y-3">
                  <h3 className="font-heading font-bold text-sm lg:text-base tracking-[0.25em] text-[#F4F1EA] group-hover:text-white transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-xs text-[#A89E8D]/80 leading-relaxed font-sans">
                    {category.description}
                  </p>
                </div>

                {/* Micro highlights list */}
                <div className="pt-4 border-t border-[#323436]/40 space-y-2">
                  {category.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-[11px] font-mono tracking-wide text-[#A89E8D]/70 group-hover:text-[#F4F1EA] transition-colors">
                      <span className="w-1.5 h-1.5 bg-[#A89E8D]/40 group-hover:bg-[#A89E8D] rounded-full transition-all" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium bottom action bar */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-4 bg-[#111315] border border-[#323436] max-w-2xl mx-auto">
            <ShieldAlert className="w-4 h-4 text-[#A89E8D] flex-shrink-0 animate-pulse" />
            <p className="text-left text-[11px] text-[#A89E8D]/80 font-mono uppercase tracking-widest leading-relaxed">
              All coverages are backed by Muhlenbruch Syndicate 4022 capital vaults. Connect with an advisor for direct ledger onboarding.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
