import React, { useState } from "react";
import { PREMIUM_SECTORS, PremiumSector } from "../data";
import { ShieldAlert, Sparkles, Sliders, CheckCircle2, ArrowRight, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function CoverageExplorer() {
  const [activeSectorId, setActiveSectorId] = useState("private-wealth");
  const [coverageLimit, setCoverageLimit] = useState(25); // value in Millions ($)

  const activeSector = PREMIUM_SECTORS.find(s => s.id === activeSectorId) || PREMIUM_SECTORS[0];

  // Dynamic calculations based on selected limit
  const getDeductibleOption = (limitVal: number) => {
    if (limitVal < 5) return "$10,000";
    if (limitVal < 20) return "$25,000";
    if (limitVal < 50) return "$50,000";
    if (limitVal < 100) return "$100,000";
    return "$250,000 Private Deductible Fund";
  };

  const getCoverageStrength = (limitVal: number) => {
    if (limitVal < 10) return { label: "Standard Shield", color: "text-amber-600 bg-amber-50" };
    if (limitVal < 40) return { label: "Executive Umbrella Protection", color: "text-[#06392D] bg-[#F3F5F1]" };
    if (limitVal < 100) return { label: "Sovereign Fleet Syndicate Pool", color: "text-[#C8A97E] bg-[#06392D]" };
    return { label: "Consolidated Lloyds Syndicate Multi-Risk Blanket", color: "text-[#FCFBF8] bg-[#C8A97E]" };
  };

  const currentStrength = getCoverageStrength(coverageLimit);

  return (
    <section className="bg-[#0F1113] py-20 lg:py-28 border-b border-[#323436]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <span className="block subheading-premium text-xs text-[#A89E8D]">
              Bespoke Portfolio Classes
            </span>
            <h2 className="heading-premium text-3xl sm:text-4xl lg:text-5xl text-[#F4F1EA] font-light">
              Underwriting <span className="italic font-normal text-[#A89E8D]">Sovereign Protection</span>
            </h2>
            <p className="text-xs text-[#A89E8D] font-sans leading-relaxed">
              Our products are custom-drafted underwriter agreements designed specifically for ultra-high-net-worth clients, family trusts, and resilient corporate ventures.
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="inline-flex items-center space-x-2 border border-[#323436] px-3.5 py-1.5 rounded-none text-[10px] font-heading font-bold text-[#A89E8D] uppercase bg-[#141618]">
              <Sparkles className="w-3.5 h-3.5 text-[#A89E8D]" />
              <span>Full Customization Enabled</span>
            </div>
          </div>
        </div>

        {/* Dynamic Interactive Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Sector Selection Buttons */}
          <div className="lg:col-span-4 flex flex-col space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#4F5153] font-mono font-bold mb-1">
              Select Asset Class Shield
            </span>
            {PREMIUM_SECTORS.map((sector) => {
              const isSelected = sector.id === activeSectorId;
              return (
                <button
                  key={sector.id}
                  onClick={() => setActiveSectorId(sector.id)}
                  className={`w-full text-left p-5 rounded-none border transition-all duration-300 relative overflow-hidden cursor-pointer ${
                    isSelected 
                      ? "bg-[#A89E8D] border-[#A89E8D] text-[#0F1113] font-bold shadow-lg translate-x-1"
                      : "bg-[#141618] border-[#323436] text-[#A89E8D] hover:border-[#A89E8D] hover:bg-[#141618]/70"
                  }`}
                >
                  <div className="relative z-10 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading font-bold text-sm uppercase tracking-wider">
                        {sector.title}
                      </h3>
                      {isSelected && (
                        <motion.div layoutId="activeArrow" className="text-[#0F1113]">
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      )}
                    </div>
                    <p className={`text-[11px] ${isSelected ? "text-[#0F1113]/75" : "text-[#A89E8D]/60"} font-sans truncate`}>
                      {sector.subtitle}
                    </p>
                  </div>
                  {/* Subtle dynamic underline highlight */}
                  {isSelected && (
                    <div className="absolute right-0 bottom-0 top-0 w-1 bg-[#0F1113]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Display Details & Limits Configurator */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSectorId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="bg-[#0F1113] rounded-none border border-[#323436] p-6 sm:p-10 space-y-8"
              >
                
                {/* Sector Header Information */}
                <div className="space-y-3 pb-6 border-b border-[#323436]">
                  <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-widest text-[#A89E8D]">
                    {activeSector.subtitle}
                  </span>
                  <h3 className="heading-premium text-2xl sm:text-3xl text-[#F4F1EA] font-light italic">
                    {activeSector.title}
                  </h3>
                  <p className="text-xs text-[#A89E8D] font-sans leading-relaxed">
                    {activeSector.description}
                  </p>
                </div>

                {/* LIMITS AND DEDUCTIBLES CALCULATOR SLIDER */}
                <div className="space-y-4 bg-[#141618] p-5 sm:p-7 rounded-none border border-[#323436]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <div className="flex items-center space-x-2">
                      <Sliders className="w-4 h-4 text-[#A89E8D]" />
                      <h4 className="font-heading font-bold uppercase tracking-wider text-[10px] text-[#A89E8D]">
                        Liability Coverage Limit Configuration
                      </h4>
                    </div>
                    <span className="font-serif font-light text-[#F4F1EA] text-lg sm:text-xl">
                      ${coverageLimit} Million USD
                    </span>
                  </div>

                  {/* Standard Range Slider */}
                  <div className="relative pt-2">
                    <input 
                      type="range" 
                      min="1" 
                      max="150" 
                      value={coverageLimit}
                      onChange={(e) => setCoverageLimit(Number(e.target.value))}
                      className="w-full h-1 bg-[#323436] appearance-none cursor-pointer accent-[#A89E8D] focus:outline-none"
                    />
                    <div className="flex justify-between text-[9px] text-[#A89E8D]/50 font-mono mt-1 px-1">
                      <span>$1M (Minimum)</span>
                      <span>$50M</span>
                      <span>$100M</span>
                      <span>$150M (Consolidated)</span>
                    </div>
                  </div>

                  {/* Dynamic Outputs based on limits */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 mt-2 border-t border-[#323436]">
                    <div>
                      <span className="block text-[9px] uppercase tracking-widest text-[#A89E8D]/50 font-mono">
                        Estimated Deductible Buffer:
                      </span>
                      <span className="block font-heading font-bold text-xs text-[#F4F1EA] mt-0.5">
                        {getDeductibleOption(coverageLimit)}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase tracking-widest text-[#A89E8D]/50 font-mono">
                        Policy Tier:
                      </span>
                      <span className="inline-block text-[10px] font-heading font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-none mt-1.5 bg-[#0F1113] text-[#A89E8D] border border-[#323436]">
                        {getCoverageStrength(coverageLimit).label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-4">
                  <h4 className="font-heading font-bold uppercase tracking-wider text-[10px] text-[#A89E8D]">
                    Core Policy Safeguards & Floaters Included:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeSector.features.map((feature, i) => (
                      <div key={i} className="flex items-start space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#A89E8D] mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-[#A89E8D] leading-tight font-sans">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Target Asset classes covered */}
                <div className="bg-[#141618] border border-[#323436] rounded-none p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-[#A89E8D]/50 font-mono font-medium">
                      Asset Classes Shielded Under {activeSector.title}
                    </span>
                    <div className="flex flex-wrap gap-2 mt-1.5">
                      {activeSector.sampleAssets.map((asset, idx) => (
                        <span key={idx} className="bg-[#0F1113] text-[#A89E8D] text-[9px] font-medium px-2.5 py-1 rounded-none font-sans border border-[#323436]">
                          {asset}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="block text-[9px] uppercase tracking-widest text-right text-[#A89E8D]/50 font-mono font-medium hidden sm:block">
                      Max Underwriting Limit
                    </span>
                    <span className="font-serif font-light text-sm text-[#A89E8D] block text-right">
                      {activeSector.highlightLimit}
                    </span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
