import React from "react";
import { Shield, Landmark, Award, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openPortal: () => void;
}

export default function Footer({ setActiveTab, openPortal }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0C0E] text-[#F4F1EA] border-t border-[#323436] relative overflow-hidden">
      
      {/* Absolute top thin champagne border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#A89E8D]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Upper Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-[#323436]">
          
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#141618] rounded-none flex items-center justify-center border border-[#323436] text-[#A89E8D]">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-heading font-bold text-base uppercase tracking-widest text-[#F4F1EA]">
                  Muhlenbruch
                </span>
                <span className="block font-sans text-[10px] uppercase tracking-widest text-[#A89E8D]/85">
                  Private Underwriters
                </span>
              </div>
            </div>
            <p className="text-xs text-[#A89E8D]/70 font-sans leading-relaxed max-w-sm">
              Providing unmatched credit capacity, discrete private wealth advisory, and global multi-risk liabilities backing for nearly 100 years. Backed by global Lloyds syndicates.
            </p>
            <div className="flex items-center space-x-3 text-xs font-mono text-[#A89E8D]">
              <Award className="w-4 h-4" />
              <span>A+ AM Best Rated Solvency Capital</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-[#A89E8D]">
              Client Access
            </h4>
            <ul className="space-y-2 text-xs text-[#A89E8D]/70 font-sans">
              <li>
                <button onClick={() => setActiveTab("heritage")} className="hover:text-white hover:underline cursor-pointer">
                  Legacy History
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("coverage")} className="hover:text-white hover:underline cursor-pointer">
                  Private Portfolios
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("insurance")} className="hover:text-white hover:underline cursor-pointer">
                  Insurance Portfolios
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("advisor")} className="hover:text-white hover:underline cursor-pointer">
                  AI Underwriting Desk
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("claims")} className="hover:text-white hover:underline cursor-pointer">
                  Indemnity Claims
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("contact")} className="hover:text-white hover:underline cursor-pointer">
                  Contact Desk
                </button>
              </li>
              <li>
                <button onClick={openPortal} className="hover:text-white hover:underline cursor-pointer text-[#A89E8D] font-bold">
                  Secure Vault
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Offices locations (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-[#A89E8D]">
              Global Offices
            </h4>
            <div className="space-y-3.5 text-xs text-[#A89E8D]/70 font-sans">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#A89E8D] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#F4F1EA] text-[11px] uppercase font-heading">Chicago Headquarters (HQ)</strong>
                  <span>192 North Michigan Avenue, Loop District, Chicago, IL</span>
                </div>
              </div>
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#A89E8D] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#F4F1EA] text-[11px] uppercase font-heading">Zurich Wealth Branch</strong>
                  <span>Bahnhofstrasse 45, Private Banking Sector, Zurich</span>
                </div>
              </div>
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#A89E8D] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#F4F1EA] text-[11px] uppercase font-heading">London Lloyd's Syndicate</strong>
                  <span>One Lime Street, Underwriting Room, London EC3M</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Underwriter Contacts (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-[#A89E8D]">
              Underwriting Desk
            </h4>
            <div className="space-y-2.5 text-xs text-[#A89E8D]/70 font-sans">
              <p className="text-[11px] leading-relaxed text-[#A89E8D]/50 italic">
                Direct secure routing. Transmissions are archived and encrypted in our Chicago server vaults.
              </p>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#A89E8D]" />
                <span>+1 (312) 555-1928</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#A89E8D]" />
                <span>desk@muhlenbruch-insurance.com</span>
              </div>
              <div className="pt-2">
                <div className="inline-flex items-center space-x-1 border border-[#323436] px-2.5 py-1 rounded-none text-[10px] uppercase font-mono tracking-wider bg-[#141618] text-[#A89E8D]">
                  <span>SECURE GATEWAY: LIVE</span>
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Lower Legal Disclosures & Copyright */}
        <div className="pt-8 text-[11px] text-[#A89E8D]/45 font-sans space-y-4 leading-relaxed">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Legal Disclaimers (8 cols) */}
            <div className="lg:col-span-9 space-y-2">
              <p>
                <strong>Legal Notice:</strong> Muhlenbruch Insurance, Muhlenbruch Private Underwriters, and associated logos are registered trademarks of Muhlenbruch Syndicate Group LLC. Policies are underwritten by authorized multi-national insurers and backed in part by capacity allocated through Lloyd's Syndicates. Credit ratings are evaluated annually by A.M. Best Company.
              </p>
              <p>
                All risk-profiling calculations, premium estimates, and advisor recommendations offered through the Digital Underwriting Desk are illustrative mock-projections powered by Google Gemini and do not constitute a binding legal agreement of coverage until verified and signed by a licensed Underwriter at our Chicago, Zurich, or London offices.
              </p>
            </div>

            {/* Solvency credentials logo space (3 cols) */}
            <div className="lg:col-span-3 lg:text-right flex items-center lg:justify-end space-x-4">
              <div className="border border-[#323436] px-3 py-1.5 rounded-none text-[10px] uppercase font-mono bg-[#141618] text-[#A89E8D]">
                <span>Solvency Ratio: 320%</span>
              </div>
              <div className="border border-[#323436] px-3 py-1.5 rounded-none text-[10px] uppercase font-mono bg-[#141618] text-[#A89E8D]">
                <span>AM Best: A+</span>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-[#323436]">
            <p>&copy; {year} Muhlenbruch Insurance Group. All Rights Reserved. Private Banking & Sovereign Asset Security Counsel.</p>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-white hover:underline">Privacy Charter</a>
              <span>&bull;</span>
              <a href="#" className="hover:text-white hover:underline">Syndicate Disclosures</a>
              <span>&bull;</span>
              <a href="#" className="hover:text-white hover:underline flex items-center">
                <span>Sovereign Security</span>
                <ExternalLink className="w-3 h-3 ml-1 text-[#A89E8D]" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
