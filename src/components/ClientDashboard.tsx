import React, { useState } from "react";
import { MOCK_POLICIES, MOCK_CLAIMS } from "../data";
import { ActivePolicy, SimulatedClaim } from "../types";
import { 
  Lock, KeyRound, Download, FileSignature, CheckCircle2, 
  Plus, AlertCircle, Mail, Phone, Calendar, RefreshCw, Send, ShieldCheck, HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ClientDashboard() {
  const [policies, setPolicies] = useState<ActivePolicy[]>(MOCK_POLICIES);
  const [claims, setClaims] = useState<SimulatedClaim[]>(MOCK_CLAIMS);

  // Claim Filing Form State
  const [showClaimForm, setShowClaimForm] = useState(false);
  const [claimPolicy, setClaimPolicy] = useState(policies[0]?.policyNumber || "");
  const [claimDate, setClaimDate] = useState("2026-07-02");
  const [claimDesc, setClaimDesc] = useState("Severe thunder damage resulted in glass breach on eastern terrace sunroom.");
  const [claimDamage, setClaimDamage] = useState("$38,000");

  // Private advisor form state
  const [advisorMsg, setAdvisorMsg] = useState("");
  const [msgSuccess, setMsgSuccess] = useState(false);
  
  // Download simulation toast states
  const [downloadingPolicyId, setDownloadingPolicyId] = useState<string | null>(null);

  const handleFileClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimDesc || !claimDamage) return;

    const matchedPolicy = policies.find(p => p.policyNumber === claimPolicy);

    const newClaim: SimulatedClaim = {
      id: `clm_${Date.now()}`,
      policyNumber: claimPolicy,
      type: matchedPolicy ? matchedPolicy.type : "Bespoke Corporate Policy",
      date: claimDate,
      description: claimDesc,
      estimatedDamage: claimDamage,
      status: "Submitted"
    };

    setClaims([newClaim, ...claims]);
    setShowClaimForm(false);
    
    // Auto-update policy status as a simulation
    if (matchedPolicy) {
      setPolicies(policies.map(p => 
        p.id === matchedPolicy.id ? { ...p, status: "Claim Processing" } : p
      ));
    }
  };

  const handleSimulateDownload = (policyId: string, policyNum: string) => {
    setDownloadingPolicyId(policyId);
    setTimeout(() => {
      setDownloadingPolicyId(null);
      // Simulate real file download in iframe
      const element = document.createElement("a");
      const file = new Blob([
        `MUHLENBRUCH PRIVATE INSURANCE COI\n\n` +
        `POLICY NO: ${policyNum}\n` +
        `SOLVENCY VERIFICATION SYSTEM\n` +
        `EFFECTIVE YEAR: 2026\n` +
        `LLOYDS SYNDICATE BACKED LIMITS\n\n` +
        `Verified secure by Muhlenbruch Private Vault.`
      ], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `COI-${policyNum}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1500);
  };

  const handleSendAdvisorMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!advisorMsg) return;
    setMsgSuccess(true);
    setAdvisorMsg("");
    setTimeout(() => {
      setMsgSuccess(false);
    }, 4000);
  };

  return (
    <section className="bg-[#0F1113] py-16 lg:py-24 border-t border-[#323436]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Credentials Block */}
        <div className="bg-[#0A0C0E] rounded-none p-6 sm:p-10 text-[#F4F1EA] border border-[#323436] shadow-2xl mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#323436_1px,transparent_1px),linear-gradient(to_bottom,#323436_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center space-x-2 bg-[#141618] px-2.5 py-1 border border-[#323436] rounded-none text-[#A89E8D]">
              <Lock className="w-3.5 h-3.5" />
              <span className="text-[9px] uppercase tracking-widest font-mono font-bold">
                SECURED VAULT ENCRYPTED (AES-256)
              </span>
            </div>
            <h2 className="heading-premium text-2xl sm:text-3xl font-light">
              Muhlenbruch <span className="italic text-[#A89E8D]">Client Ledger</span>
            </h2>
            <p className="text-xs text-[#A89E8D]/70 font-sans max-w-xl leading-relaxed">
              Authentic dashboard environment tracking certified multi-million liability assets, historical claim filings, and continuous private underwriting coverage.
            </p>
          </div>
          <div className="flex-shrink-0 flex items-center space-x-3 relative z-10">
            <div className="text-right hidden sm:block">
              <span className="block text-[8px] uppercase tracking-widest text-[#A89E8D]/55 font-mono">
                Custodian Account
              </span>
              <span className="block text-xs font-heading font-bold text-[#A89E8D]">
                CUST-9821-VANDERBILT
              </span>
            </div>
            <div className="w-12 h-12 bg-[#141618] rounded-none border border-[#323436] flex items-center justify-center text-[#A89E8D]">
              <KeyRound className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column (8 cols): Policies & Claims */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* ACTIVE POLICIES BLOCK */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#323436]">
                <div className="flex items-center space-x-2.5">
                  <FileSignature className="w-5 h-5 text-[#A89E8D]" />
                  <h3 className="font-heading font-bold text-xs text-[#F4F1EA] uppercase tracking-wider">
                    Sovereign Underwritten Policies
                  </h3>
                </div>
                <span className="text-[9px] font-mono uppercase bg-[#141618] text-[#A89E8D] px-2.5 py-1 border border-[#323436] rounded-none font-bold">
                  {policies.length} Active Contracts
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {policies.map((policy) => (
                  <div 
                    key={policy.id} 
                    className="bg-[#141618] rounded-none border border-[#323436] p-5.5 flex flex-col justify-between space-y-4 hover:border-[#A89E8D] transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Status accent bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[#A89E8D]" />

                    {/* Policy Card Header */}
                    <div className="space-y-1 pl-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono text-[#A89E8D]/55">
                          NO: {policy.policyNumber}
                        </span>
                        <div className="flex items-center space-x-1.5">
                          <span className={`w-2 h-2 rounded-full ${
                            policy.status === "Active" ? "bg-green-500 animate-pulse" : "bg-amber-500"
                          }`} />
                          <span className="text-[8px] uppercase tracking-[0.1em] font-bold text-[#A89E8D]/70">
                            {policy.status}
                          </span>
                        </div>
                      </div>
                      <h4 className="font-heading font-bold text-sm text-[#F4F1EA] leading-tight">
                        {policy.type}
                      </h4>
                    </div>

                    {/* Core Financial Tiers */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-sans pl-1 pt-1.5 border-t border-[#323436]">
                      <div>
                        <span className="block text-[8px] uppercase text-[#A89E8D]/50 font-mono">
                          Liability Limits
                        </span>
                        <span className="font-heading font-bold text-[#F4F1EA]">
                          {policy.limit}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase text-[#A89E8D]/50 font-mono">
                          Deductible Tiers
                        </span>
                        <span className="font-heading font-bold text-[#F4F1EA]">
                          {policy.deductible}
                        </span>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#323436] pl-1">
                      <span className="text-[9px] text-[#A89E8D]/50 font-mono">
                        Eff: {policy.effectiveDate}
                      </span>
                      <button
                        onClick={() => handleSimulateDownload(policy.id, policy.policyNumber)}
                        disabled={downloadingPolicyId === policy.id}
                        className="flex items-center space-x-1 px-3 py-1.5 rounded-none bg-[#0F1113] text-[#A89E8D] border border-[#323436] hover:bg-[#A89E8D] hover:text-[#0F1113] text-[9px] font-heading font-bold uppercase tracking-wider transition-all cursor-pointer"
                      >
                        {downloadingPolicyId === policy.id ? (
                          <>
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            <span>Vault Pull...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3 h-3" />
                            <span>Retrieve COI</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* CLAIMS HISTORIC BLOCK */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#323436]">
                <div className="flex items-center space-x-2.5">
                  <AlertCircle className="w-5 h-5 text-[#A89E8D]" />
                  <h3 className="font-heading font-bold text-xs text-[#F4F1EA] uppercase tracking-wider">
                    Indemnity Claims Tracking
                  </h3>
                </div>
                <button
                  onClick={() => setShowClaimForm(!showClaimForm)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-none bg-[#F4F1EA] text-[#0F1113] hover:bg-[#A89E8D] hover:text-[#0F1113] text-[9px] font-heading font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Initiate New Claim</span>
                </button>
              </div>

              {/* CLAIM FILING STATEFUL OVERLAY FORM */}
              <AnimatePresence>
                {showClaimForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-[#141618] rounded-none border border-[#323436] p-5 sm:p-7 overflow-hidden space-y-4"
                  >
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-[#A89E8D]" />
                      <h4 className="font-heading font-bold uppercase tracking-wider text-xs text-[#F4F1EA]">
                        Indemnity Incident Intake Form
                      </h4>
                    </div>

                    <form onSubmit={handleFileClaim} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                      
                      {/* Policy select */}
                      <div className="sm:col-span-4 space-y-1">
                        <label className="block text-[8px] uppercase tracking-widest font-mono text-[#A89E8D]">
                          Target Contract
                        </label>
                        <select
                          value={claimPolicy}
                          onChange={(e) => setClaimPolicy(e.target.value)}
                          className="w-full bg-[#0F1113] text-xs text-[#F4F1EA] border border-[#323436] rounded-none p-2.5 focus:outline-none focus:border-[#A89E8D]"
                        >
                          {policies.map(p => (
                            <option key={p.id} value={p.policyNumber}>{p.policyNumber} ({p.type.split(" ")[0]})</option>
                          ))}
                        </select>
                      </div>

                      {/* Incident Date */}
                      <div className="sm:col-span-4 space-y-1">
                        <label className="block text-[8px] uppercase tracking-widest font-mono text-[#A89E8D]">
                          Incident Occurrence Date
                        </label>
                        <input
                          type="date"
                          value={claimDate}
                          onChange={(e) => setClaimDate(e.target.value)}
                          className="w-full bg-[#0F1113] text-xs text-[#F4F1EA] border border-[#323436] rounded-none p-2.5 focus:outline-none focus:border-[#A89E8D]"
                        />
                      </div>

                      {/* Damage valuation */}
                      <div className="sm:col-span-4 space-y-1">
                        <label className="block text-[8px] uppercase tracking-widest font-mono text-[#A89E8D]">
                          Estimated Damage Value
                        </label>
                        <input
                          type="text"
                          required
                          value={claimDamage}
                          onChange={(e) => setClaimDamage(e.target.value)}
                          placeholder="e.g. $45,000"
                          className="w-full bg-[#0F1113] text-xs text-[#F4F1EA] border border-[#323436] rounded-none p-2.5 focus:outline-none focus:border-[#A89E8D]"
                        />
                      </div>

                      {/* Description */}
                      <div className="sm:col-span-12 space-y-1">
                        <label className="block text-[8px] uppercase tracking-widest font-mono text-[#A89E8D]">
                          Description of Hazard occurrence
                        </label>
                        <textarea
                          rows={2}
                          required
                          value={claimDesc}
                          onChange={(e) => setClaimDesc(e.target.value)}
                          className="w-full bg-[#0F1113] text-xs text-[#F4F1EA] border border-[#323436] rounded-none p-2.5 focus:outline-none focus:border-[#A89E8D] resize-none"
                        />
                      </div>

                      <div className="sm:col-span-12 flex justify-end space-x-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setShowClaimForm(false)}
                          className="px-3.5 py-2 text-[9px] font-bold uppercase text-[#A89E8D] hover:text-white transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#F4F1EA] text-[#0F1113] hover:bg-[#A89E8D] rounded-none text-[9px] font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Verify & File Incident
                        </button>
                      </div>

                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Claims list */}
              <div className="space-y-4">
                {claims.map((claim) => (
                  <div 
                    key={claim.id}
                    className="p-4 sm:p-5 rounded-none bg-[#141618] border border-[#323436] flex flex-col sm:flex-row justify-between gap-4"
                  >
                    <div className="space-y-1.5 max-w-xl">
                      <div className="flex items-center space-x-2 flex-wrap gap-1">
                        <span className="text-[9px] font-mono text-[#A89E8D] font-bold uppercase bg-[#0F1113] border border-[#323436] px-2 py-0.5 rounded-none">
                          Claim {claim.id.substring(4, 8)}
                        </span>
                        <span className="text-[9px] font-mono text-[#A89E8D]/55">
                          Policy: {claim.policyNumber}
                        </span>
                        <span className="text-[9px] font-mono text-[#A89E8D]/45">
                          Date: {claim.date}
                        </span>
                      </div>
                      <h4 className="font-heading font-bold text-xs text-[#F4F1EA] uppercase">
                        {claim.type}
                      </h4>
                      <p className="text-xs text-[#A89E8D]/80 font-sans leading-relaxed">
                        {claim.description}
                      </p>
                    </div>

                    <div className="flex-shrink-0 text-left sm:text-right flex flex-col justify-between items-start sm:items-end gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#323436]">
                      <div>
                        <span className="block text-[8px] uppercase text-[#A89E8D]/40 font-mono">
                          Damage Claims Value
                        </span>
                        <span className="font-heading font-bold text-[#F4F1EA] text-sm">
                          {claim.estimatedDamage}
                        </span>
                      </div>
                      <span className={`inline-block text-[8px] font-bold tracking-widest uppercase px-2.5 py-0.5 border ${
                        claim.status === "Approved" || claim.status === "Settled" ? "bg-green-950/20 text-green-400 border-green-800/20" :
                        claim.status === "Adjusting" ? "bg-blue-950/20 text-blue-400 border-blue-800/20" :
                        "bg-amber-950/20 text-amber-400 border-amber-800/20"
                      }`}>
                        Status: {claim.status}
                      </span>
                    </div>

                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* Right Column (4 cols): Personal Advisor Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* ADVISOR PROFILE CARD */}
            <div className="bg-[#141618] rounded-none border border-[#323436] shadow-xl overflow-hidden">
              
              {/* Card top banner with our custom portrait image */}
              <div className="relative h-60 overflow-hidden bg-[#0A0C0E]">
                <img 
                  src="/src/assets/images/muhlenbruch_private_advisor_1782976435028.jpg"
                  alt="Victoria Muhlenbruch - Private Wealth Risk Partner"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top filter contrast-105 saturate-95 grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141618] via-transparent to-transparent pointer-events-none" />
                
                {/* Online status tag */}
                <div className="absolute top-4 right-4 bg-[#0F1113] border border-[#323436] px-2.5 py-1 rounded-none flex items-center space-x-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[8px] font-mono font-bold uppercase text-[#A89E8D] tracking-wider">
                    Secured Connection
                  </span>
                </div>
              </div>

              {/* Advisor metadata details */}
              <div className="p-6 space-y-4">
                <div className="space-y-0.5">
                  <span className="block text-[8px] uppercase tracking-widest text-[#A89E8D] font-mono font-bold">
                    Assigned Partner & Risk Custodian
                  </span>
                  <h4 className="font-heading font-bold text-base text-white">
                    Victoria Muhlenbruch, JD
                  </h4>
                  <p className="text-xs text-[#A89E8D]/70 font-sans leading-relaxed">
                    Sovereign Syndicate General Underwriter & Executive Director
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#323436] text-[11px] text-[#A89E8D] font-sans">
                  <div className="flex items-center space-x-2.5">
                    <Mail className="w-4 h-4 text-[#A89E8D] flex-shrink-0" />
                    <span className="truncate">v.muhlenbruch@muhlenbruch-insurance.com</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <Phone className="w-4 h-4 text-[#A89E8D] flex-shrink-0" />
                    <span>+1 (312) 555-1928</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <Calendar className="w-4 h-4 text-[#A89E8D] flex-shrink-0" />
                    <span>Mon - Fri (7:00 AM - 5:00 PM CST)</span>
                  </div>
                </div>

                {/* Direct message module */}
                <form onSubmit={handleSendAdvisorMsg} className="space-y-2 pt-3 border-t border-[#323436]">
                  <span className="block text-[8px] uppercase tracking-widest text-[#A89E8D] font-mono font-bold">
                    Secure Counselor Messenger
                  </span>
                  <input
                    type="text"
                    required
                    value={advisorMsg}
                    onChange={(e) => setAdvisorMsg(e.target.value)}
                    placeholder="e.g. Schedule audit of rare jewelry..."
                    className="w-full bg-[#0F1113] text-xs text-[#F4F1EA] border border-[#323436] rounded-none p-2.5 focus:outline-none focus:border-[#A89E8D]"
                  />
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-1.5 px-3 py-2 rounded-none bg-[#F4F1EA] text-[#0F1113] hover:bg-[#A89E8D] text-[9px] font-heading font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <span>Send Certified Message</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>

                {/* Send success notice */}
                <AnimatePresence>
                  {msgSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="bg-[#0A0C0E] border border-[#323436] text-white p-3 rounded-none text-[9px] font-heading font-bold uppercase tracking-wider text-center flex items-center justify-center space-x-1.5"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-[#A89E8D]" />
                      <span>Message encrypted & logged.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
