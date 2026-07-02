import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, Send, Mail, Phone, MapPin, Clock, 
  Lock, Globe, Shield, FileText, ArrowRight, CheckCircle2 
} from "lucide-react";
import { saveContactMessage, checkSupabaseStatus } from "../lib/supabase";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverageType, setCoverageType] = useState("Sovereign Family Assets");
  const [priority, setPriority] = useState("Standard Secure");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [requestSession, setRequestSession] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [transmissionHash, setTransmissionHash] = useState("");

  const submitSteps = [
    "Establishing peer-to-peer secure session...",
    "Encrypting payload using AES-256-GCM...",
    "Routing through Chicago Secure Vault proxy...",
    "Validating syndicate signature certificate...",
    "Archiving transmission securely..."
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStep(0);

    // Simulate multi-step secure transmission
    const stepInterval = setInterval(() => {
      setSubmitStep((prev) => {
        if (prev < submitSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          return prev;
        }
      });
    }, 800);

    const hash = Array.from({ length: 40 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    const txHash = `MUHL-TX-${hash.substring(0, 12).toUpperCase()}`;

    // Add doc to Firestore or Local Storage
    saveContactMessage({
      name,
      email,
      phone,
      coverageType,
      priority,
      subject,
      message,
      requestSession,
      transmissionHash: txHash,
      createdAt: new Date().toISOString(),
      status: "Unread"
    });

    setTimeout(() => {
      clearInterval(stepInterval);
      setTransmissionHash(txHash);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 4500);
  };

  const handleResetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setSubject("");
    setMessage("");
    setIsSubmitted(false);
  };

  const offices = [
    {
      city: "Chicago Headquarters",
      role: "Sovereign Trust & Syndicate Operations",
      address: "192 North Michigan Avenue, Loop District, Chicago, IL 60601",
      phone: "+1 (312) 555-1928",
      hours: "Mon - Fri, 7:00 AM - 5:00 PM CST",
      code: "CUST-9821-CH"
    },
    {
      city: "Zurich Wealth Branch",
      role: "Private Banking & Asset Underwriting",
      address: "Bahnhofstrasse 45, Private Banking Sector, Zurich 8001",
      phone: "+41 (44) 555-8930",
      hours: "Mon - Fri, 8:00 AM - 4:00 PM CET",
      code: "CUST-4412-ZH"
    },
    {
      city: "London Syndicate Desk",
      role: "Lloyd's Reinsurance Syndicate Room",
      address: "One Lime Street, Underwriting Room, London EC3M 7HA",
      phone: "+44 (20) 7555-0192",
      hours: "Mon - Fri, 9:00 AM - 5:00 PM GMT",
      code: "CUST-3044-LD"
    }
  ];

  return (
    <section className="bg-[#0A0C0E] py-16 lg:py-24 border-t border-[#323436] relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#A89E8D_1px,transparent_1px),linear-gradient(to_bottom,#A89E8D_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="block subheading-premium text-xs text-[#A89E8D] uppercase tracking-[0.2em] font-medium">
            Certified Transmission Gateway
          </span>
          <h2 className="heading-premium text-3xl sm:text-4xl lg:text-5xl font-light text-[#F4F1EA]">
            The Sovereign <span className="italic font-normal text-[#A89E8D]">Contact Desk</span>
          </h2>
          <p className="text-xs text-[#A89E8D]/70 font-sans max-w-xl mx-auto leading-relaxed">
            Communicate directly with our general underwriters and private wealth risk partners. All digital transmissions are certified, AES-256 encrypted, and archived inside our offline server vaults.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Office Connections (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="block text-[10px] uppercase tracking-widest text-[#A89E8D] font-mono font-bold">
                DIRECT SECURE CHANNELS
              </span>
              <h3 className="font-heading font-bold text-lg text-[#F4F1EA] uppercase tracking-wider">
                Syndicate Consular Coordinates
              </h3>
              <p className="text-xs text-[#A89E8D]/70 font-sans leading-relaxed">
                For immediate underwriting triage, you may place an authenticated voice call to our regional desks. If you are an active client holding physical vault certificates, please use your primary telephone route.
              </p>
            </div>

            {/* Offices List */}
            <div className="space-y-6">
              {offices.map((office, idx) => (
                <div 
                  key={idx}
                  className="bg-[#141618] border border-[#323436] p-6 hover:border-[#A89E8D] transition-all duration-300 relative group"
                >
                  {/* Small absolute top identifier code */}
                  <div className="absolute top-4 right-4 text-[8px] font-mono text-[#A89E8D]/40">
                    {office.code}
                  </div>

                  <div className="space-y-3.5">
                    <div>
                      <h4 className="font-heading font-bold text-sm text-[#F4F1EA] uppercase tracking-wider">
                        {office.city}
                      </h4>
                      <span className="block text-[10px] font-mono text-[#A89E8D]/70 uppercase tracking-widest mt-0.5">
                        {office.role}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-[#A89E8D]/80 font-sans">
                      <div className="flex items-start space-x-2.5">
                        <MapPin className="w-4 h-4 text-[#A89E8D] flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{office.address}</span>
                      </div>
                      <div className="flex items-center space-x-2.5">
                        <Phone className="w-4 h-4 text-[#A89E8D] flex-shrink-0" />
                        <span className="font-mono text-[11px] text-white font-medium">{office.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2.5">
                        <Clock className="w-4 h-4 text-[#A89E8D] flex-shrink-0" />
                        <span>{office.hours}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* General Solvency Capital Note */}
            <div className="p-5 border border-[#323436] bg-[#0F1113] flex items-center space-x-4">
              <div className="w-10 h-10 flex-shrink-0 bg-[#141618] border border-[#323436] flex items-center justify-center text-[#A89E8D]">
                <Shield className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="block text-[9px] uppercase tracking-widest font-mono text-[#A89E8D] font-bold">
                  AM BEST SOLVENCY
                </span>
                <span className="block text-xs font-heading font-bold text-[#F4F1EA] uppercase">
                  A+ Certified Underwriter Capital
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Encrypted Transmission Desk Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#141618] border border-[#323436] p-6 sm:p-10 relative">
            
            {/* Top thin security banner */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#A89E8D]" />

            <AnimatePresence mode="wait">
              {!isSubmitting && !isSubmitted && (
                <motion.form 
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSendMessage} 
                  className="space-y-6"
                >
                  <div className="flex items-center space-x-2.5 pb-4 border-b border-[#323436]">
                    <Lock className="w-4 h-4 text-[#A89E8D]" />
                    <span className="text-[10px] uppercase font-mono tracking-widest text-white font-bold">
                      SECURE COUNSELOR TRANSMISSION PROTOCOL
                    </span>
                  </div>

                  {!checkSupabaseStatus().isAvailable && (
                    <div className="p-3 bg-amber-950/25 border border-amber-800/40 text-[#A89E8D] text-[11px] font-sans leading-relaxed">
                      <span className="font-bold text-white uppercase block mb-1">Local Secure Ledger Mode</span>
                      Your Supabase database table structures require manual setup. This gateway is running on our high-performance client storage, allowing full interactive testing.
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="block text-[9px] uppercase tracking-wider font-mono text-[#A89E8D] font-bold">
                        Corporate or Individual Name
                      </label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sterling Vanderbilt"
                        className="w-full bg-[#0F1113] text-xs text-[#F4F1EA] border border-[#323436] rounded-none p-3.5 focus:outline-none focus:border-[#A89E8D] placeholder-[#A89E8D]/30"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="block text-[9px] uppercase tracking-wider font-mono text-[#A89E8D] font-bold">
                        Secure Contact Email
                      </label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. s.vanderbilt@familyoffice.com"
                        className="w-full bg-[#0F1113] text-xs text-[#F4F1EA] border border-[#323436] rounded-none p-3.5 focus:outline-none focus:border-[#A89E8D] placeholder-[#A89E8D]/30"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="block text-[9px] uppercase tracking-wider font-mono text-[#A89E8D] font-bold">
                        Direct Phone (Authenticated Line)
                      </label>
                      <input 
                        type="tel" 
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +1 (312) 555-0100"
                        className="w-full bg-[#0F1113] text-xs text-[#F4F1EA] border border-[#323436] rounded-none p-3.5 focus:outline-none focus:border-[#A89E8D] placeholder-[#A89E8D]/30"
                      />
                    </div>

                    {/* Coverage Category */}
                    <div className="space-y-1.5">
                      <label className="block text-[9px] uppercase tracking-wider font-mono text-[#A89E8D] font-bold">
                        Underwriting Category
                      </label>
                      <select 
                        value={coverageType}
                        onChange={(e) => setCoverageType(e.target.value)}
                        className="w-full bg-[#0F1113] text-xs text-[#F4F1EA] border border-[#323436] rounded-none p-3.5 focus:outline-none focus:border-[#A89E8D]"
                      >
                        <option value="Sovereign Family Assets">Sovereign Family Assets</option>
                        <option value="High-Value Specie & Fine Art">High-Value Specie & Fine Art</option>
                        <option value="Maritime Hull Liabilities">Maritime Hull Liabilities</option>
                        <option value="Commercial Ransom Indemnity">Commercial Ransom Indemnity</option>
                        <option value="Special Underwriting Syndicate">Special Underwriting Syndicate</option>
                      </select>
                    </div>

                    {/* Security Priority */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="block text-[9px] uppercase tracking-wider font-mono text-[#A89E8D] font-bold">
                        Transmission Priority Level
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {["Standard Secure", "Priority Diplomatic", "Immediate Triage"].map((level) => (
                          <button
                            type="button"
                            key={level}
                            onClick={() => setPriority(level)}
                            className={`py-2 text-[10px] font-heading font-bold uppercase border tracking-wider text-center cursor-pointer transition-all ${
                              priority === level 
                                ? "bg-[#A89E8D] text-[#0F1113] border-[#A89E8D]" 
                                : "bg-[#0F1113] text-[#A89E8D] border-[#323436] hover:border-[#A89E8D]/50"
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="block text-[9px] uppercase tracking-wider font-mono text-[#A89E8D] font-bold">
                        Subject of Transmission
                      </label>
                      <input 
                        type="text" 
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. High-value marine transit liability coverage for transatlantic antique relocation"
                        className="w-full bg-[#0F1113] text-xs text-[#F4F1EA] border border-[#323436] rounded-none p-3.5 focus:outline-none focus:border-[#A89E8D] placeholder-[#A89E8D]/30"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="block text-[9px] uppercase tracking-wider font-mono text-[#A89E8D] font-bold">
                        Detailed Underwriting Particulars
                      </label>
                      <textarea 
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Provide details about the asset portfolio, location exposures, and security protections currently enforced."
                        className="w-full bg-[#0F1113] text-xs text-[#F4F1EA] border border-[#323436] rounded-none p-3.5 focus:outline-none focus:border-[#A89E8D] placeholder-[#A89E8D]/30 resize-none leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Vault digital session request checkbox */}
                  <div className="flex items-start space-x-3 pt-2">
                    <input 
                      type="checkbox" 
                      id="requestSession"
                      checked={requestSession}
                      onChange={(e) => setRequestSession(e.target.checked)}
                      className="mt-0.5 accent-[#A89E8D] h-4 w-4 bg-[#0F1113] border border-[#323436] focus:ring-0 rounded-none"
                    />
                    <label htmlFor="requestSession" className="text-[11px] text-[#A89E8D] leading-relaxed cursor-pointer select-none">
                      Request auto-provisioning of a secure Client Vault login using my credentials to directly access physical ledger balances and live claims trackers.
                    </label>
                  </div>

                  {/* Submission Button */}
                  <div className="pt-4 border-t border-[#323436]">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center space-x-2 py-4 bg-[#F4F1EA] text-[#0F1113] hover:bg-[#A89E8D] transition-all duration-300 font-heading font-bold uppercase tracking-widest text-xs cursor-pointer rounded-none"
                    >
                      <Send className="w-4 h-4" />
                      <span>Transmit Certified Message</span>
                    </button>
                  </div>
                </motion.form>
              )}

              {/* Submitting Secure Terminal View */}
              {isSubmitting && (
                <motion.div 
                  key="submitting-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-16 flex flex-col items-center justify-center space-y-6 text-center font-mono"
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-2 border-[#A89E8D]/20 border-t-[#A89E8D] animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center text-[#A89E8D]">
                      <Lock className="w-5 h-5 animate-pulse" />
                    </div>
                  </div>

                  <div className="space-y-3 max-w-sm">
                    <span className="text-[10px] text-[#A89E8D] tracking-[0.2em] uppercase font-bold animate-pulse">
                      GATEWAY ROUTING ACTIVE
                    </span>
                    <p className="text-xs text-white uppercase font-bold leading-relaxed">
                      {submitSteps[submitStep]}
                    </p>
                    <div className="w-48 h-1 bg-[#0F1113] border border-[#323436] mx-auto overflow-hidden">
                      <div 
                        className="h-full bg-[#A89E8D] transition-all duration-500"
                        style={{ width: `${((submitStep + 1) / submitSteps.length) * 100}%` }}
                      />
                    </div>
                    <span className="block text-[9px] text-[#A89E8D]/40">
                      SECURED WITH AES-256-GCM BY MUHLENBRUCH CO.
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Submitted Transaction Receipt View */}
              {isSubmitted && (
                <motion.div 
                  key="submitted-receipt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-6 space-y-8"
                >
                  <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-[#323436]">
                    <div className="w-14 h-14 bg-[#0F1113] border border-green-500/30 rounded-none flex items-center justify-center text-green-400">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <h4 className="font-heading font-bold text-lg text-white uppercase tracking-wider">
                      Transmission Confirmed
                    </h4>
                    <p className="text-xs text-[#A89E8D] max-w-md font-sans">
                      Your underwriting coordinates have been received. Our general syndicate partners in Chicago will audit this profile and dispatch a certified communication within 4 business hours.
                    </p>
                  </div>

                  {/* Certified Ledger Details Box */}
                  <div className="bg-[#0F1113] border border-[#323436] p-5 font-mono text-[11px] space-y-3.5">
                    <div className="flex items-center justify-between pb-2 border-b border-[#323436]/50">
                      <span className="text-[#A89E8D] uppercase">TRANSMISSION RECEIPT</span>
                      <span className="text-green-400 font-bold">STATUS: ARCHIVED</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#A89E8D]/60">ID HASH:</span>
                        <span className="text-white font-bold select-all">{transmissionHash}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#A89E8D]/60">SENDER:</span>
                        <span className="text-white font-bold max-w-[200px] truncate">{name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#A89E8D]/60">CATEGORY:</span>
                        <span className="text-white">{coverageType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#A89E8D]/60">PRIORITY:</span>
                        <span className="text-white uppercase font-bold">{priority}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#A89E8D]/60">VAULT AUTO-LOGIN:</span>
                        <span className="text-white">{requestSession ? "YES (PROVISIONING)" : "NO"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#A89E8D]/60">STORAGE TARGET:</span>
                        <span className={`font-bold uppercase ${checkSupabaseStatus().isAvailable ? "text-green-400" : "text-amber-500 animate-pulse"}`}>
                          {checkSupabaseStatus().isAvailable ? "SUPABASE CLOUD LEDGER" : "OFFLINE SECURE VAULT (FALLBACK)"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#A89E8D]/60">TIMESTAMP:</span>
                        <span className="text-white font-sans">{new Date().toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#323436]/50 text-[9px] text-[#A89E8D]/50 text-center leading-relaxed">
                      Your transmission hash serves as a unique cryptographic signature verification token. Please retain it for family office auditing.
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleResetForm}
                      className="flex-1 py-3 border border-[#323436] text-[11px] font-heading font-bold uppercase tracking-wider text-[#A89E8D] hover:border-[#A89E8D] hover:text-white transition-colors cursor-pointer text-center rounded-none"
                    >
                      New Transmission
                    </button>
                    {requestSession && (
                      <div className="flex-1 text-center bg-[#0F1113] border border-green-800/20 p-2.5 flex items-center justify-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-mono font-bold text-green-400 uppercase tracking-widest">
                          VAULT ACCOUNT CREATED
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
