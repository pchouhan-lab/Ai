import React, { useState } from "react";
import { Shield, ShieldCheck, Lock, Menu, X, Globe, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openPortal: () => void;
  openAdminPortal: () => void;
}

export default function Header({ activeTab, setActiveTab, openPortal, openAdminPortal }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "heritage", label: "Heritage" },
    { id: "coverage", label: "Portfolio" },
    { id: "insurance", label: "Insurance" },
    { id: "advisor", label: "Risk Advisor" },
    { id: "claims", label: "Claims Center" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0F1113]/90 backdrop-blur-md border-b border-[#323436] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Monogram */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group flex-shrink-0"
            onClick={() => setActiveTab("heritage")}
            title="Muhlenbruch Private Underwriters | Home"
          >
            <div className="relative w-11 h-11 bg-[#0A0C0E] border border-[#323436] flex items-center justify-center transition-all duration-300 group-hover:border-[#A89E8D]">
              <Shield className="w-5.5 h-5.5 text-[#A89E8D]" />
              <div className="absolute -inset-1 border border-[#A89E8D]/20 scale-0 transition-transform duration-300 group-hover:scale-100" />
            </div>
            <div>
              <span className="block font-serif text-lg uppercase tracking-tight text-[#F4F1EA]">
                Muhlenbruch
              </span>
              <span className="block font-sans text-[9px] uppercase tracking-[0.3em] font-semibold text-[#A89E8D]">
                Private Underwriters
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="relative py-2 text-xs font-heading font-medium tracking-[0.2em] uppercase cursor-pointer transition-colors duration-300 group text-left"
              >
                <span className={activeTab === item.id ? "text-white font-semibold" : "text-[#A89E8D] hover:text-[#F4F1EA]"}>
                  {item.label}
                </span>
                {/* Custom sliding border-bottom indicator */}
                {activeTab === item.id ? (
                  <motion.div 
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A89E8D]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : (
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A89E8D]/50 transition-all duration-300 group-hover:w-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <div className="hidden lg:flex items-center text-[10px] uppercase tracking-[0.2em] text-[#A89E8D] mr-1 font-mono">
              <Globe className="w-3.5 h-3.5 text-[#A89E8D] mr-1" />
              <span>London Syndicate</span>
            </div>
            
            <button
              onClick={openAdminPortal}
              className="flex items-center space-x-1.5 lg:space-x-2 px-3.5 lg:px-5 py-2.5 border border-[#A89E8D]/40 text-xs font-heading font-bold uppercase tracking-widest text-[#A89E8D] bg-transparent hover:border-[#A89E8D] hover:bg-[#A89E8D]/10 transition-all duration-300 cursor-pointer rounded-none"
              title="Admin Portal"
            >
              <ShieldCheck className="w-4 h-4 lg:w-3.5 lg:h-3.5 text-amber-500 lg:text-[#A89E8D]" />
              <span className="hidden xl:inline">Admin Portal</span>
            </button>

            <button
              onClick={openPortal}
              className="flex items-center space-x-1.5 lg:space-x-2 px-3.5 lg:px-5 py-2.5 border border-[#A89E8D] text-xs font-heading font-bold uppercase tracking-widest text-[#F4F1EA] bg-transparent hover:bg-[#A89E8D] hover:text-[#0F1113] transition-all duration-300 cursor-pointer rounded-none"
              title="Client Vault"
            >
              <Lock className="w-4 h-4 lg:w-3.5 lg:h-3.5" />
              <span className="hidden xl:inline">Client Vault</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={openAdminPortal}
              className="p-2.5 bg-[#141618] text-amber-500 border border-[#323436]"
              title="Admin Portal"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
            <button
              onClick={openPortal}
              className="p-2.5 bg-[#141618] text-[#A89E8D] border border-[#323436]"
              title="Client Vault"
            >
              <User className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#A89E8D] hover:bg-[#141618] border border-transparent hover:border-[#323436] transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0F1113] border-b border-[#323436] overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 text-xs font-heading font-medium uppercase tracking-wider rounded-none ${
                    activeTab === item.id
                      ? "bg-[#A89E8D] text-[#0F1113] font-bold"
                      : "text-[#A89E8D] hover:bg-[#141618]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-[#323436] flex flex-col space-y-3 px-4">
                <div className="flex items-center text-[10px] uppercase tracking-widest text-[#A89E8D] font-mono">
                  <Globe className="w-3.5 h-3.5 text-[#A89E8D] mr-2" />
                  <span>London Syndicate Backed</span>
                </div>
                <button
                  onClick={() => {
                    openPortal();
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-center space-x-2 w-full px-5 py-3 bg-[#A89E8D] text-[#0F1113] hover:bg-[#F4F1EA] font-heading font-bold uppercase tracking-wider transition-all duration-300 rounded-none"
                >
                  <Lock className="w-4 h-4" />
                  <span>Secure Vault Login</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
