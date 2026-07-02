import React, { useState } from "react";
import { UnderwritingReport, RiskFactor, RecommendedCoverage } from "../types";
import { 
  ShieldAlert, Sparkles, Send, FileCheck, HelpCircle, 
  RefreshCw, TrendingUp, Landmark, FileText, Check, AlertTriangle, ChevronRight, Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function DigitalAdvisor() {
  const [sector, setSector] = useState("High-Net-Worth Private Estates");
  const [businessType, setBusinessType] = useState("Bespoke Historical Country Manor");
  const [details, setDetails] = useState("4,000 sq ft historical family manor built in 1912 with rare antique cedar materials, private art collection valued at $2.1M, and localized flood risk from nearby mountain streams.");
  const [assetValue, setAssetValue] = useState("$5,000,000 to $25,000,000");
  const [coverageLimits, setCoverageLimits] = useState("$10,000,000 Target");

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [report, setReport] = useState<UnderwritingReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [boundSuccess, setBoundSuccess] = useState(false);

  const loadingSteps = [
    "Contacting Syndicate Underwriters...",
    "Querying regional hazard exposure indices...",
    "Analyzing declared asset categories...",
    "Evaluating target liability limits...",
    "Formulating premium and deductible tiers...",
    "Finalizing Underwriter advisory notes..."
  ];

  const handleGenerateAdvisory = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setReport(null);
    setError(null);
    setBoundSuccess(false);
    setLoadingStep(0);

    // Dynamic step ticking animation for premium experience
    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < loadingSteps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1200);

    try {
      const response = await fetch("/api/gemini/risk-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sector,
          businessType,
          details,
          assetValue,
          coverageLimits
        })
      });

      clearInterval(interval);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to contact underwriting API.");
      }

      const data = await response.json();
      setReport(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred during underwriting analysis.");
    } finally {
      setLoading(false);
    }
  };

  const handleBindSimulation = () => {
    setBoundSuccess(true);
    setTimeout(() => {
      setBoundSuccess(false);
    }, 5000);
  };

  return (
    <section className="bg-[#0A0C0E] py-16 lg:py-24 border-t border-[#323436]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="block subheading-premium text-xs text-[#A89E8D]">
            Private Wealth & Enterprise Advisory
          </span>
          <h2 className="heading-premium text-3xl sm:text-4xl lg:text-5xl font-light text-[#F4F1EA]">
            The Digital Underwriting <span className="italic font-normal text-[#A89E8D]">Desk</span>
          </h2>
          <p className="text-xs text-[#A89E8D] font-sans max-w-xl mx-auto leading-relaxed">
            Input asset details and targeted liabilities. Our AI Underwriter will analyze your profile and construct a high-heritage advisory report, complete with premium ratings, risk grids, and safety protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: Form Input Configuration */}
          <div className="lg:col-span-5 bg-[#0F1113] rounded-none border border-[#323436] p-6 sm:p-8 space-y-6">
            <div className="flex items-center space-x-2.5 pb-4 border-b border-[#323436]">
              <Landmark className="w-5 h-5 text-[#A89E8D]" />
              <h3 className="font-heading font-bold text-xs text-[#F4F1EA] uppercase tracking-wider">
                Risk Configuration Profile
              </h3>
            </div>

            <form onSubmit={handleGenerateAdvisory} className="space-y-5">
              
              {/* Sector Selection */}
              <div className="space-y-1.5">
                <label className="block text-[9px] uppercase tracking-widest text-[#A89E8D] font-mono font-bold">
                  Asset Sector Class
                </label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full bg-[#141618] text-xs text-[#F4F1EA] border border-[#323436] rounded-none px-4 py-3.5 focus:outline-none focus:border-[#A89E8D] transition-all"
                >
                  <option value="Commercial Enterprise">Commercial Enterprise (D&O, Operations, Supply Chain)</option>
                  <option value="High-Net-Worth Private Estates">High-Net-Worth Private Estates (Mansions, Art, Jewels)</option>
                  <option value="Elite Fleet, Marine & Aviation">Elite Fleet, Marine & Aviation (Private Jets, Yachts)</option>
                  <option value="Executive Cyber & Tech Shield">Executive Cyber & Tech Shield (IP, Extortion, outages)</option>
                </select>
              </div>

              {/* Business / Private Asset Classification */}
              <div className="space-y-1.5">
                <label className="block text-[9px] uppercase tracking-widest text-[#A89E8D] font-mono font-bold">
                  Specific Asset Classification / Business Type
                </label>
                <input
                  type="text"
                  required
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  placeholder="e.g., Historical Luxury Manor, Boutique Hedge Fund Office, Luxury Fleet"
                  className="w-full bg-[#141618] text-xs text-[#F4F1EA] border border-[#323436] rounded-none px-4 py-3.5 focus:outline-none focus:border-[#A89E8D] transition-all"
                />
              </div>

              {/* Asset Value Dropdown */}
              <div className="space-y-1.5">
                <label className="block text-[9px] uppercase tracking-widest text-[#A89E8D] font-mono font-bold">
                  Estimated Aggregated Asset Valuation
                </label>
                <select
                  value={assetValue}
                  onChange={(e) => setAssetValue(e.target.value)}
                  className="w-full bg-[#141618] text-xs text-[#F4F1EA] border border-[#323436] rounded-none px-4 py-3.5 focus:outline-none focus:border-[#A89E8D] transition-all"
                >
                  <option value="$1,000,000 to $5,000,000">$1,000,000 to $5,000,000</option>
                  <option value="$5,000,000 to $25,000,000">$5,000,000 to $25,000,000 (Sovereign Core)</option>
                  <option value="$25,000,000 to $100,000,000">$25,000,000 to $100,000,000 (Elite Class)</option>
                  <option value="$100,000,000+">$100,000,000+ (Consolidated Syndicate Coverage)</option>
                </select>
              </div>

              {/* Coverage Target Limit Dropdown */}
              <div className="space-y-1.5">
                <label className="block text-[9px] uppercase tracking-widest text-[#A89E8D] font-mono font-bold">
                  Targeted Liability Limits
                </label>
                <select
                  value={coverageLimits}
                  onChange={(e) => setCoverageLimits(e.target.value)}
                  className="w-full bg-[#141618] text-xs text-[#F4F1EA] border border-[#323436] rounded-none px-4 py-3.5 focus:outline-none focus:border-[#A89E8D] transition-all"
                >
                  <option value="$2,000,000 Target">$2,000,000 Limits Coverage</option>
                  <option value="$10,000,000 Target">$10,000,000 Limits Coverage</option>
                  <option value="$50,000,000 Target">$50,000,000 Limits Coverage</option>
                  <option value="$150,000,000 Consolidated Target">$150,000,000 Consolidated Multi-Risk</option>
                </select>
              </div>

              {/* Details and Risk Exposures Description */}
              <div className="space-y-1.5">
                <label className="block text-[9px] uppercase tracking-widest text-[#A89E8D] font-mono font-bold">
                  Description of Operations, Materials, or High-Value Collections
                </label>
                <textarea
                  required
                  rows={4}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Describe your property materials, location security measures, or core liability factors..."
                  className="w-full bg-[#141618] text-xs text-[#F4F1EA] border border-[#323436] rounded-none px-4 py-3.5 focus:outline-none focus:border-[#A89E8D] transition-all resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2.5 px-6 py-4 rounded-none bg-[#F4F1EA] text-[#0F1113] font-heading font-bold uppercase tracking-wider text-xs hover:bg-[#A89E8D] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                <span>Submit Profile to Syndicate</span>
                <Send className="w-3.5 h-3.5" />
              </button>

            </form>
          </div>

          {/* Right Block: Output Report Panel */}
          <div className="lg:col-span-7 min-h-[500px]">
            <AnimatePresence mode="wait">
              
              {/* Initial / Empty State */}
              {!loading && !report && !error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#141618] rounded-none border border-dashed border-[#323436] p-8 sm:p-12 flex flex-col items-center justify-center text-center h-full min-h-[500px] space-y-4"
                >
                  <div className="w-14 h-14 bg-[#323436]/40 border border-[#323436] rounded-none flex items-center justify-center text-[#A89E8D]">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-bold uppercase tracking-wider text-xs text-[#F4F1EA]">
                    Advisory Ledger Dormant
                  </h4>
                  <p className="text-[11px] text-[#A89E8D]/60 max-w-sm font-sans leading-relaxed">
                    Underwriting models require target asset values, classifications, and descriptions to compute hazard probabilities and allocate capital syndications. Click "Submit Profile" to activate.
                  </p>
                </motion.div>
              )}

              {/* Loading State with animated tickers */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#0F1113] text-[#F4F1EA] rounded-none border border-[#323436] p-8 sm:p-12 flex flex-col items-center justify-center text-center h-full min-h-[500px] space-y-6"
                >
                  <div className="relative">
                    <RefreshCw className="w-10 h-10 text-[#A89E8D] animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 bg-[#A89E8D] rounded-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-heading font-bold uppercase tracking-widest text-[10px] text-[#A89E8D]">
                      Synchronizing Risk Assessment
                    </h4>
                    <p className="text-xs font-mono text-[#F4F1EA]/80 animate-pulse">
                      {loadingSteps[loadingStep]}
                    </p>
                  </div>
                  {/* Subtle progress indicator bar */}
                  <div className="w-48 h-1 bg-[#323436] rounded-none overflow-hidden">
                    <motion.div 
                      className="h-full bg-[#A89E8D]" 
                      initial={{ width: "0%" }}
                      animate={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                      transition={{ duration: 1.2 }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Error State */}
              {!loading && error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-950/20 border border-red-900/50 rounded-none p-6 sm:p-10 flex flex-col justify-center h-full min-h-[500px] space-y-5"
                >
                  <div className="flex items-center space-x-3 text-red-400">
                    <div className="p-2 bg-red-900/20 border border-red-800/40 rounded-none">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-base">
                        Underwriting System Error
                      </h4>
                      <p className="text-[9px] font-mono uppercase tracking-wider text-red-500 font-semibold">
                        API EXCEPTION HANDLER
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#0F1113] border border-red-900/20 p-4 rounded-none text-xs text-red-200 font-sans space-y-2 leading-relaxed">
                    <p className="font-bold text-red-400">Details of API rejection:</p>
                    <p>{error}</p>
                  </div>
                  
                  {/* Clear instructions on how to add API keys */}
                  <div className="bg-amber-950/20 border border-amber-900/30 p-4 rounded-none text-xs text-amber-200 space-y-2 leading-relaxed">
                    <div className="flex items-center space-x-1.5 font-bold">
                      <Info className="w-3.5 h-3.5 text-amber-400" />
                      <span>Configuration Guidance:</span>
                    </div>
                    <p>
                      This applet requires a valid Gemini API Key to run its real-time digital underwriting AI. To configure your secret:
                    </p>
                    <ol className="list-decimal pl-5 space-y-1">
                      <li>Go to the **Settings** menu at the top right of this page.</li>
                      <li>Select **Secrets**.</li>
                      <li>Add a key named <code className="font-mono bg-amber-950 px-1 py-0.5 rounded text-[#A89E8D]">GEMINI_API_KEY</code> with your Google AI Studio key.</li>
                      <li>Once added, click **Submit Profile to Syndicate** to retry!</li>
                    </ol>
                  </div>
                </motion.div>
              )}

              {/* Success: PDF Style Advisory Report */}
              {!loading && report && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#0F1113] rounded-none border border-[#323436] p-6 sm:p-10 shadow-2xl relative space-y-6"
                >
                  
                  {/* PDF Certificate Border Overlay */}
                  <div className="absolute inset-4 border border-[#A89E8D]/15 pointer-events-none rounded-none" />

                  {/* Header certificate block */}
                  <div className="flex justify-between items-start border-b border-[#323436] pb-6 relative z-10 pt-2 px-2">
                    <div className="space-y-1">
                      <span className="block text-[8px] font-mono tracking-[0.2em] text-[#8C806F] uppercase font-bold">
                        MUHLENBRUCH UNDERWRITING SYNDICATE
                      </span>
                      <h4 className="heading-premium text-lg font-bold text-white">
                        Risk Advisory & Solvency Proposal
                      </h4>
                      <p className="text-[9px] font-mono text-[#A89E8D]/50">
                        REF NO: MH-AI-PROPOSAL-{Math.floor(100000 + Math.random() * 900000)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center space-x-1 border border-green-800/30 bg-green-950/20 px-2 py-0.5 rounded-none text-[9px] font-bold uppercase tracking-wider text-green-400">
                        <FileCheck className="w-3 h-3" />
                        <span>QUALIFIED</span>
                      </div>
                      <span className="block text-[8px] text-[#A89E8D]/50 font-mono mt-1">
                        Capital Pool Limit: $150M
                      </span>
                    </div>
                  </div>

                  {/* Executive Summary */}
                  <div className="space-y-2 relative z-10 px-2">
                    <span className="block text-[9px] font-mono font-bold uppercase tracking-widest text-[#A89E8D]">
                      Underwriter Executive Summary
                    </span>
                    <p className="text-xs text-[#F4F1EA]/85 leading-relaxed font-sans italic border-l-2 border-[#A89E8D] pl-3">
                      "{report.executiveSummary}"
                    </p>
                  </div>

                  {/* General Classification and Risk Rating Badge */}
                  <div className="grid grid-cols-2 gap-4 bg-[#141618] p-4 rounded-none border border-[#323436] relative z-10 mx-2">
                    <div>
                      <span className="block text-[8px] uppercase tracking-widest text-[#A89E8D]/55 font-mono">
                        Client Classification Tiers
                      </span>
                      <span className="block font-heading font-semibold text-xs text-[#F4F1EA] mt-0.5 truncate">
                        {report.clientClassification}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[8px] uppercase tracking-widest text-[#A89E8D]/55 font-mono">
                        Aggregated Hazard Exposure
                      </span>
                      <div className="flex items-center space-x-1.5 mt-0.5">
                        <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border ${
                          report.overallRiskRating === "Low" ? "bg-green-950/30 text-green-400 border-green-800/20" :
                          report.overallRiskRating === "Medium" ? "bg-amber-950/30 text-amber-400 border-amber-800/20" :
                          "bg-red-950/30 text-red-400 border-red-800/20"
                        }`}>
                          {report.overallRiskRating} Risk
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Identified Risk Factors Breakdown */}
                  <div className="space-y-3 relative z-10 px-2">
                    <span className="block text-[9px] font-mono font-bold uppercase tracking-widest text-[#A89E8D]">
                      Calculated Hazard Breakdown & Explanations
                    </span>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {report.identifiedRisks.map((risk, index) => (
                        <div key={index} className="p-3 rounded-none border border-[#323436] bg-[#141618] text-xs space-y-1 shadow-sm">
                          <div className="flex justify-between items-center">
                            <span className="font-heading font-bold text-xs text-[#F4F1EA]">
                              {risk.riskType}
                            </span>
                            <div className="flex items-center space-x-1.5">
                              <span className="text-[9px] text-[#A89E8D]/55 font-mono">Impact:</span>
                              <span className={`text-[8px] font-bold px-1.5 py-0.2 border rounded-none uppercase ${
                                risk.impact === "Catastrophic" || risk.impact === "High" ? "bg-red-950/20 text-red-400 border-red-900/30" : "bg-[#0F1113] text-[#A89E8D] border-[#323436]"
                              }`}>
                                {risk.impact}
                              </span>
                            </div>
                          </div>
                          <p className="text-[11px] text-[#A89E8D]/70 font-sans leading-relaxed">
                            {risk.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Premium Coverages */}
                  <div className="space-y-3 relative z-10 px-2">
                    <span className="block text-[9px] font-mono font-bold uppercase tracking-widest text-[#A89E8D]">
                      Bespoke Policy Recommendations
                    </span>
                    <div className="space-y-3">
                      {report.recommendedCoverages.map((cov, index) => (
                        <div key={index} className="p-4 rounded-none border border-[#323436] bg-[#141618] space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#323436]">
                            <h5 className="font-heading font-bold text-xs text-[#F4F1EA] uppercase">
                              {cov.name}
                            </h5>
                            <span className="font-mono text-xs font-bold text-[#A89E8D]">
                              Est. {cov.annualEstimatedPremium}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px] text-[#A89E8D]/70 font-sans">
                            <p><strong>Rec. Limits:</strong> {cov.recommendedLimit}</p>
                            <p><strong>Deductible target:</strong> {cov.deductibleOption}</p>
                          </div>
                          <p className="text-[11px] text-[#F4F1EA]/75 leading-relaxed font-sans">
                            <strong>Underwriter Justification:</strong> {cov.whyImportant}
                          </p>
                          {/* Features checks */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {cov.features.map((feat, i) => (
                              <span key={i} className="bg-[#0F1113] text-[#A89E8D] text-[9px] font-medium px-2 py-0.5 rounded-none font-sans border border-[#323436]">
                                &bull; {feat}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mitigation Advisories */}
                  <div className="space-y-2 relative z-10 px-2">
                    <span className="block text-[9px] font-mono font-bold uppercase tracking-widest text-[#A89E8D]">
                      Bespoke Security & Hazard Mitigation Mandates
                    </span>
                    <ul className="space-y-1.5">
                      {report.underwriterAdvisoryNotes.map((note, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-[11px] text-[#A89E8D] font-sans">
                          <ChevronRight className="w-3 h-3 text-[#A89E8D] mt-0.5 flex-shrink-0" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Premium Binding Summary Panel */}
                  <div className="bg-[#141618] text-[#F4F1EA] p-5 rounded-none border border-[#323436] relative z-10 mx-2 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="space-y-0.5">
                      <span className="block text-[8px] uppercase tracking-widest text-[#A89E8D]/60 font-mono">
                        Estimated Combined Premium (Annual)
                      </span>
                      <span className="block font-heading font-bold text-2xl text-[#A89E8D]">
                        {report.estimatedTotalPremium}
                      </span>
                    </div>
                    <button
                      onClick={handleBindSimulation}
                      className="w-full sm:w-auto px-5 py-3 rounded-none bg-[#A89E8D] text-[#0F1113] hover:bg-[#F4F1EA] font-heading font-bold uppercase tracking-wider text-xs transition-all duration-300 cursor-pointer"
                    >
                      Lock In Underwritten Rate
                    </button>
                  </div>

                  {/* Bound success banner */}
                  <AnimatePresence>
                    {boundSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-green-900 border border-green-700 text-green-200 p-4 rounded-none text-center text-xs font-heading font-bold uppercase tracking-wider relative z-20 mx-2"
                      >
                        Proposal Locked. Victoria Muhlenbruch has been assigned as your Sovereign Underwriter. Checking Vault records...
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
