import React from "react";
import { ArrowUpRight, ShieldCheck, Landmark, Compass, Award } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  onStartAssessment: () => void;
  onExploreCoverage: () => void;
}

export default function HeroSection({ onStartAssessment, onExploreCoverage }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#0F1113] border-b border-[#323436]">
      {/* Background soft geometric lines */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#323436_1px,transparent_1px),linear-gradient(to_bottom,#323436_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-0 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)] items-stretch">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center p-8 sm:p-12 lg:p-20 border-r border-transparent lg:border-[#323436] space-y-8">
            
            {/* Top Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4"
            >
              <span className="h-[1px] w-12 bg-[#A89E8D]"></span>
              <span className="text-[#A89E8D] text-[10px] uppercase tracking-[0.4em] font-semibold">
                Established 1928 &bull; Bespoke Specialists
              </span>
            </motion.div>
 
            {/* Main Editorial Header */}
            <div className="space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="heading-premium text-4xl sm:text-5xl lg:text-[64px] text-[#F4F1EA] font-light leading-[1.0] italic"
              >
                Precision Protection <br />
                for the <span className="text-[#A89E8D]">Modern Enterprise.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xs sm:text-sm text-[#A89E8D] font-sans leading-relaxed max-w-lg"
              >
                For nearly a century, Muhlenbruch has delivered discrete, elite risk advisory and sovereign liability structures to multinational companies, private family dynasties, and high-net-worth estate custodians worldwide.
              </motion.p>
            </div>
 
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                onClick={onStartAssessment}
                className="flex items-center justify-center space-x-2.5 bg-[#F4F1EA] text-[#0F1113] px-10 py-4.5 rounded-none font-heading font-bold uppercase tracking-widest text-xs hover:bg-[#A89E8D] transition-all duration-300 cursor-pointer"
              >
                <span>Initialize AI Risk Advisory</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={onExploreCoverage}
                className="flex items-center justify-center space-x-2.5 px-10 py-4.5 border border-[#323436] text-[#F4F1EA] bg-transparent hover:border-[#A89E8D] rounded-none font-heading font-bold uppercase tracking-widest text-xs transition-all duration-300 cursor-pointer"
              >
                <span>Explore Coverages</span>
              </button>
            </motion.div>
 
            {/* Quick trust metrics */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-[#323436]"
            >
              <div>
                <span className="block font-serif text-2xl sm:text-3xl text-[#F4F1EA] font-light">$4.2B+</span>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-[#A89E8D] mt-0.5 leading-tight">
                  Assets under protect
                </span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl text-[#F4F1EA] font-light">320%</span>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-[#A89E8D] mt-0.5 leading-tight">
                  Solvency Ratio
                </span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl text-[#F4F1EA] font-light">A+ Rated</span>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-[#A89E8D] mt-0.5 leading-tight">
                  AM Best Grade
                </span>
              </div>
            </motion.div>
 
          </div>
 
          {/* Hero Right Media / Visuals */}
          <div className="lg:col-span-5 relative flex flex-col justify-between bg-[#141618] p-8 sm:p-12 border-t lg:border-t-0 border-[#323436] overflow-hidden min-h-[400px]">
            
            {/* Abstract Geometric Element */}
            <div className="absolute top-0 right-0 w-80 h-80 border-l border-b border-[#323436] rotate-45 translate-x-40 -translate-y-40 pointer-events-none" />

            {/* Aesthetic Framed Image Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="relative aspect-4/3 overflow-hidden border border-[#323436] shadow-2xl w-full z-10"
            >
              {/* Main premium estate image */}
              <img 
                src="/src/assets/images/muhlenbruch_hero_estate_1782976403810.jpg"
                alt="Muhlenbruch Premium Private Estate Property Protection"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-90 contrast-105 saturate-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1113]/50 via-transparent to-transparent pointer-events-none" />
            </motion.div>
 
            {/* Bottom mini informational block matching the design theme cards */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="space-y-2 pt-6 relative z-10 border-t border-[#323436] mt-4"
            >
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-[#A89E8D] rounded-full animate-pulse" />
                <h4 className="font-heading font-bold uppercase tracking-[0.2em] text-[10px] text-[#A89E8D]">
                  Sovereign Capacity Allocation
                </h4>
              </div>
              <p className="text-xs text-[#F4F1EA]/70 leading-relaxed">
                Direct Lloyds Syndicate placement for consolidated multi-risk assets, high-value art portfolios, and multinational operations.
              </p>
            </motion.div>
            
          </div>
 
        </div>
      </div>
    </section>
  );
}
