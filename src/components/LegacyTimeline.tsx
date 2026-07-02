import React, { useState } from "react";
import { LEGACY_TIMELINE } from "../data";
import { Award, ShieldCheck, History, Landmark, CalendarDays } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function LegacyTimeline() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <section className="bg-[#0A0C0E] text-[#F4F1EA] py-20 lg:py-28 relative overflow-hidden border-b border-[#323436]">
      {/* Decorative background grid and assets */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#323436_1px,transparent_1px),linear-gradient(to_bottom,#323436_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="block subheading-premium text-xs text-[#A89E8D]">
            A Century of Standing Strong
          </span>
          <h2 className="heading-premium text-3xl sm:text-4xl lg:text-5xl font-light">
            Our Historic <span className="italic font-normal text-[#A89E8D]">Legacy of Trust</span>
          </h2>
          <p className="text-xs text-[#A89E8D] font-sans max-w-xl mx-auto leading-relaxed">
            Review the major epochs and structural growth that cemented Muhlenbruch Insurance as the premier advisory for generational estate protection and enterprise continuity.
          </p>
        </div>

        {/* Milestone Timeline Navigation bar */}
        <div className="relative mb-12 sm:mb-20">
          
          {/* Horizontal Line Connector */}
          <div className="absolute left-4 right-4 top-1/2 h-[1px] bg-[#323436] -translate-y-1/2 z-0 hidden md:block" />
          
          {/* Timeline Buttons Wrapper */}
          <div className="flex md:justify-between items-center overflow-x-auto pb-4 scrollbar-none relative z-10 gap-4 px-2 md:px-0">
            {LEGACY_TIMELINE.map((item, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={item.year}
                  onClick={() => setSelectedIdx(idx)}
                  className="flex-shrink-0 cursor-pointer focus:outline-none rounded-none"
                >
                  <div className="flex flex-col items-center">
                    <div 
                      className={`w-14 h-14 flex items-center justify-center font-heading font-bold text-xs transition-all duration-300 rounded-none ${
                        isSelected 
                          ? "bg-[#A89E8D] text-[#0F1113] scale-110 border border-[#A89E8D]"
                          : "bg-[#141618] text-[#A89E8D] border border-[#323436] hover:border-[#A89E8D] hover:text-[#F4F1EA]"
                      }`}
                    >
                      {item.year}
                    </div>
                    <span className={`text-[9px] uppercase tracking-[0.2em] mt-2 font-semibold ${isSelected ? "text-[#A89E8D]" : "text-[#4F5153]"}`}>
                      {idx === 0 ? "Founding" : idx === LEGACY_TIMELINE.length - 1 ? "Present" : "Milestone"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Milestone Panel */}
        <div className="bg-[#0F1113] text-[#F4F1EA] rounded-none p-6 sm:p-12 border border-[#323436] relative">
          
          {/* Little elegant background icon */}
          <div className="absolute right-8 top-8 opacity-5 text-[#A89E8D] hidden md:block">
            <History className="w-48 h-48" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              
              {/* Year Highlight & Badge */}
              <div className="md:col-span-4 space-y-3 border-b md:border-b-0 md:border-r border-[#323436] pb-6 md:pb-0 md:pr-8">
                <div className="inline-flex items-center space-x-1.5 bg-[#141618] px-2.5 py-1 border border-[#323436]">
                  <CalendarDays className="w-3.5 h-3.5 text-[#A89E8D]" />
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#A89E8D]">
                    Historical Chronicle
                  </span>
                </div>
                <h3 className="font-serif font-light text-5xl sm:text-6xl text-[#F4F1EA] tracking-tight">
                  {LEGACY_TIMELINE[selectedIdx].year}
                </h3>
                <p className="text-[10px] font-mono tracking-wider uppercase text-[#A89E8D] font-semibold">
                  Muhlenbruch & Company
                </p>
              </div>

              {/* Chronicle Text Details */}
              <div className="md:col-span-8 space-y-4">
                <h4 className="heading-premium text-2xl sm:text-3xl text-[#F4F1EA] font-light leading-tight italic">
                  {LEGACY_TIMELINE[selectedIdx].title}
                </h4>
                <p className="text-[#A89E8D] text-xs sm:text-sm leading-relaxed max-w-2xl font-sans">
                  {LEGACY_TIMELINE[selectedIdx].description}
                </p>
                
                {/* Additional historical context bullet points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#323436]">
                  <div className="flex items-start space-x-3">
                    <ShieldCheck className="w-4 h-4 text-[#A89E8D] mt-0.5" />
                    <div>
                      <h5 className="text-[10px] font-heading font-bold uppercase tracking-wider text-[#F4F1EA]">
                        Sovereign Integrity
                      </h5>
                      <p className="text-[11px] text-[#A89E8D]/70">
                        Rigorous risk checks backed by direct syndication standards.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Award className="w-4 h-4 text-[#A89E8D] mt-0.5" />
                    <div>
                      <h5 className="text-[10px] font-heading font-bold uppercase tracking-wider text-[#F4F1EA]">
                        Unbroken Solvency
                      </h5>
                      <p className="text-[11px] text-[#A89E8D]/70">
                        100% claims solvency through historic cycles and disruptions.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
