import React, { useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import LegacyTimeline from "./components/LegacyTimeline";
import CoverageExplorer from "./components/CoverageExplorer";
import InsuranceSection from "./components/InsuranceSection";
import DigitalAdvisor from "./components/DigitalAdvisor";
import ClientDashboard from "./components/ClientDashboard";
import Contact from "./components/Contact";
import AdminPortal from "./components/AdminPortal";
import Footer from "./components/Footer";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Eye, ArrowLeft, ArrowUpRight, Lock, Landmark, Sparkles } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("heritage");
  const [showPortal, setShowPortal] = useState(false);
  const [showAdminPortal, setShowAdminPortal] = useState(false);

  // Smoothly scroll or focus on sections if needed
  const handleTabChange = (tabId: string) => {
    setShowPortal(false);
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenPortal = () => {
    setShowPortal(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClosePortal = () => {
    setShowPortal(false);
    setActiveTab("heritage");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0F1113] text-[#F4F1EA] flex flex-col justify-between selection:bg-[#A89E8D] selection:text-[#0F1113]">
      
      {/* Header element */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
        openPortal={handleOpenPortal} 
        openAdminPortal={() => setShowAdminPortal(true)}
      />

      {/* Main viewport */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* CLIENT PORTAL SIMULATOR VIEWPORT */}
          {showPortal ? (
            <motion.div
              key="client-portal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Back to Public Site Banner */}
              <div className="bg-[#141618] border-b border-[#323436] py-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
                  <button 
                    onClick={handleClosePortal}
                    className="flex items-center space-x-1.5 text-[#A89E8D] font-heading font-bold uppercase tracking-wider hover:text-white transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Return to Public Site</span>
                  </button>
                  <div className="flex items-center space-x-1.5 text-[#A89E8D]/60">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span>Connected securely to Chicago Core Server</span>
                  </div>
                </div>
              </div>

              {/* Primary Portal Component */}
              <ClientDashboard />

            </motion.div>
          ) : (
            
            /* PUBLIC SITE VIEWPORTS */
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              
              {/* Heritage / Landing View */}
              {activeTab === "heritage" && (
                <div className="space-y-0">
                  <HeroSection 
                    onStartAssessment={() => handleTabChange("advisor")}
                    onExploreCoverage={() => handleTabChange("coverage")}
                  />
                  
                  {/* Underwriter Trust Statements Accent Section */}
                  <div className="bg-[#141618] border-y border-[#323436] py-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                        <div className="space-y-2">
                          <h4 className="font-heading font-bold uppercase tracking-wider text-xs text-white">
                            1. Direct Syndicates
                          </h4>
                          <p className="text-xs text-[#A89E8D]/70 leading-relaxed font-sans">
                            Every contract is guaranteed by accredited global insurance syndicates, providing $150M+ in immediate single-risk liquid capacities.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-heading font-bold uppercase tracking-wider text-xs text-white">
                            2. Unbroken Custody
                          </h4>
                          <p className="text-xs text-[#A89E8D]/70 leading-relaxed font-sans">
                            Since 1928, our family office has protected historic private manors and multinational capital resources through deep economic cycles.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-heading font-bold uppercase tracking-wider text-xs text-white">
                            3. Responsive Advisory
                          </h4>
                          <p className="text-xs text-[#A89E8D]/70 leading-relaxed font-sans">
                            Receive bespoke counselor mappings and active IoT-enabled structural telemetry risk assessments within your personal vault.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <LegacyTimeline />
                  <CoverageExplorer />

                  {/* High heritage editorial quote banner */}
                  <div className="bg-[#0F1113] py-20 lg:py-28 relative overflow-hidden">
                    <div className="max-w-5xl mx-auto px-4 text-center space-y-6 relative z-10">
                      <span className="block subheading-premium text-xs text-[#A89E8D]">
                        Sovereign Wisdom
                      </span>
                      <p className="heading-premium text-2xl sm:text-3xl lg:text-4xl font-light text-[#F4F1EA] leading-snug italic max-w-4xl mx-auto">
                        "Real security is not computed by multiplying coverage forms. It is forged through generations of continuous counsel, discrete integrity, and unyielding capital solvency."
                      </p>
                      <div className="space-y-1">
                        <span className="block font-heading font-bold uppercase tracking-wider text-xs text-[#A89E8D]">
                          Arthur G. Muhlenbruch
                        </span>
                        <span className="block font-sans text-[10px] uppercase tracking-widest text-[#A89E8D]/55">
                          Chairman Emeritus (1968 - 1994)
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* Coverage / Portfolio View */}
              {activeTab === "coverage" && (
                <CoverageExplorer />
              )}

              {/* Insurance View */}
              {activeTab === "insurance" && (
                <InsuranceSection />
              )}

              {/* Digital Advisor View */}
              {activeTab === "advisor" && (
                <DigitalAdvisor />
              )}

              {/* Claims View */}
              {activeTab === "claims" && (
                <div className="space-y-0">
                  <div className="bg-[#0A0C0E] py-16 text-center text-[#F4F1EA] border-b border-[#323436] space-y-4">
                    <span className="block subheading-premium text-xs text-[#A89E8D]">
                      Indemnity Adjusting
                    </span>
                    <h2 className="heading-premium text-3xl sm:text-4xl lg:text-5xl font-light text-white">
                      Professional <span className="italic">Claims Center</span>
                    </h2>
                    <p className="text-xs text-[#A89E8D]/70 max-w-md mx-auto font-sans leading-relaxed">
                      To review active adjustments, file a lightning hazard report, or connect directly with an claims agent, please log into your secure Client Vault.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={handleOpenPortal}
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-[#F4F1EA] text-[#0F1113] rounded-none font-heading font-bold uppercase tracking-wider text-xs hover:bg-[#A89E8D] hover:text-[#0F1113] transition-all duration-300 cursor-pointer shadow-lg"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Log into Client Vault</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Information block */}
                  <div className="max-w-4xl mx-auto px-4 py-16 space-y-8 font-sans text-sm text-[#A89E8D] leading-relaxed">
                    <div className="space-y-2">
                      <h3 className="font-heading font-bold text-base text-white uppercase tracking-wider">
                        The Muhlenbruch Claims Protocol
                      </h3>
                      <p>
                        We operate a 24/7 dedicated dispatch room for physical asset casualties, business interruptions, maritime hull failures, and executive extortion risks. Upon filing an incident in your secure Client Vault, our adjusting syndicate executes the following protocols:
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-5 rounded-none bg-[#141618] space-y-2 border border-[#323436]">
                        <span className="font-heading font-bold text-xs uppercase text-[#A89E8D] block">
                          Phase 1: Immediate Triage
                        </span>
                        <p className="text-xs text-[#A89E8D]/70">
                          A private adjuster is dispatched within 90 minutes of the claim filing, backed by localized emergency mitigation capital of up to $50,000 for immediate containment.
                        </p>
                      </div>
                      <div className="p-5 rounded-none bg-[#141618] space-y-2 border border-[#323436]">
                        <span className="font-heading font-bold text-xs uppercase text-[#A89E8D] block">
                          Phase 2: Forensic Adjusting
                        </span>
                        <p className="text-xs text-[#A89E8D]/70">
                          Comprehensive hazard evaluation is conducted alongside licensed engineering partners to guarantee precision matching of custom-crafted architectural materials.
                        </p>
                      </div>
                      <div className="p-5 rounded-none bg-[#141618] space-y-2 border border-[#323436]">
                        <span className="font-heading font-bold text-xs uppercase text-[#A89E8D] block">
                          Phase 3: Guaranteed Settlement
                        </span>
                        <p className="text-xs text-[#A89E8D]/70">
                          Solvency payouts are executed through secure corporate banking links instantly upon assessment validation, ensuring absolute continuity.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* Contact View */}
              {activeTab === "contact" && (
                <Contact />
              )}

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer element */}
      <Footer 
        setActiveTab={handleTabChange} 
        openPortal={handleOpenPortal} 
      />

      {/* Admin Portal Overlay Modal */}
      <AnimatePresence>
        {showAdminPortal && (
          <AdminPortal onClose={() => setShowAdminPortal(false)} />
        )}
      </AnimatePresence>

    </div>
  );
}
