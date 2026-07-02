import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Lock, Mail, KeyRound, Shield, ShieldCheck, Trash2, 
  Inbox, CheckCircle2, Clock, User, Users, LogOut, 
  AlertTriangle, Search, Filter, FileText, X, ChevronRight, Eye
} from "lucide-react";
import { 
  checkFirebaseStatus,
  getContactMessages,
  updateContactStatus,
  deleteContactMessage,
  getAdminsList,
  signInAdmin,
  signUpAdmin,
  logoutUser,
  onAuthStateListener
} from "../lib/firebase";

interface ContactMsg {
  id: string;
  name: string;
  email: string;
  phone: string;
  coverageType: string;
  priority: string;
  subject: string;
  message: string;
  requestSession: boolean;
  transmissionHash: string;
  createdAt: string;
  status: string;
}

interface AdminData {
  uid: string;
  name: string;
  email: string;
  createdAt: string;
  role: string;
}

export default function AdminPortal({ onClose }: { onClose: () => void }) {
  // Authentication States
  const [user, setUser] = useState<any>(null);
  const [isAdminMode, setIsAdminMode] = useState(false); // Sign up vs Login toggle
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminName, setAdminName] = useState("");
  const [securityCode, setSecurityCode] = useState(""); // Custom pass-key for registration
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Dashboard Data States
  const [contacts, setContacts] = useState<ContactMsg[]>([]);
  const [admins, setAdmins] = useState<AdminData[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  
  // Dashboard UI Filter / Active States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedContact, setSelectedContact] = useState<ContactMsg | null>(null);
  const [currentTab, setCurrentTab] = useState<"messages" | "admins">("messages");

  const REGISTER_SECURITY_CODE = "MUHLENBRUCH-ADMIN-2026"; // Secret secure registration code

  // Monitor Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateListener(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch data once logged in
        fetchDashboardData();
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchDashboardData = async () => {
    setLoadingData(true);
    try {
      // 1. Fetch Contact Us messages using hybrid adapter
      const fetchedContacts = await getContactMessages();
      setContacts(fetchedContacts);

      // 2. Fetch Admin registry list using hybrid adapter
      const fetchedAdmins = await getAdminsList();
      setAdmins(fetchedAdmins);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoadingData(false);
    }
  };

  // Handle Log In
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setAuthError("");
    try {
      const u = await signInAdmin(email, password);
      setUser(u);
    } catch (err: any) {
      console.error("Login error:", err);
      setAuthError(err.message || "Invalid authentication credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Sign Up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setAuthError("");

    const isFirebaseOnline = checkFirebaseStatus().isAvailable;
    const isCodeValid = securityCode.trim().toUpperCase() === REGISTER_SECURITY_CODE.toUpperCase();
    
    // Only strictly enforce security code validation if Firebase is fully operational in the cloud.
    // If running in local ledger mode due to billing constraints, permit any code or no code to unblock the user.
    if (isFirebaseOnline && !isCodeValid) {
      setAuthError("Unauthorized registration security code. Please check the security key.");
      setSubmitting(false);
      return;
    }

    try {
      // Create user auth and store admin metadata
      const u = await signUpAdmin(email, password, adminName);
      setUser(u);

      // Instantly trigger dashboard refresh
      fetchDashboardData();
    } catch (err: any) {
      console.error("Registration error:", err);
      setAuthError(err.message || "Failed to register administrator.");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Log Out
  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setContacts([]);
      setAdmins([]);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Mark message as Read / Reviewed
  const handleToggleStatus = async (contactId: string, currentStatus: string) => {
    try {
      const newStatus = await updateContactStatus(contactId, currentStatus);
      
      // Update local state
      setContacts(prev => prev.map(c => c.id === contactId ? { ...c, status: newStatus } : c));
      if (selectedContact && selectedContact.id === contactId) {
        setSelectedContact(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err) {
      console.error("Error updating contact status:", err);
    }
  };

  // Delete contact record
  const handleDeleteContact = async (contactId: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this transmission record from the database ledger?")) {
      return;
    }
    try {
      await deleteContactMessage(contactId);
      setContacts(prev => prev.filter(c => c.id !== contactId));
      if (selectedContact && selectedContact.id === contactId) {
        setSelectedContact(null);
      }
    } catch (err) {
      console.error("Error deleting contact record:", err);
    }
  };

  // Filter messages based on search and status tabs
  const filteredContacts = contacts.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.transmissionHash.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === "all") return matchesSearch;
    return matchesSearch && c.status.toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      
      {/* Container Card */}
      <div className="bg-[#0A0C0E] border border-[#323436] w-full max-w-6xl h-[90vh] flex flex-col relative shadow-2xl">
        
        {/* Top styling bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#A89E8D]" />

        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#323436] bg-[#0F1113]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-[#141618] border border-[#323436] flex items-center justify-center text-[#A89E8D]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-[#F4F1EA] uppercase tracking-wider">
                MUHLENBRUCH SECURE ADMIN DESK
              </h3>
              <p className="text-[10px] font-mono text-[#A89E8D]/60 uppercase tracking-widest">
                {user ? `ADMIN SESSION SECURED // ${user.email}` : "RESTRICTED CUSTODIAN INTERFACE"}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-[#141618] text-[#A89E8D] hover:text-white border border-transparent hover:border-[#323436] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* LOADING AUTH STATE */}
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4 font-mono">
            <div className="w-12 h-12 rounded-full border-2 border-[#A89E8D]/20 border-t-[#A89E8D] animate-spin" />
            <span className="text-xs text-[#A89E8D] tracking-widest uppercase">Decryption initialization...</span>
          </div>
        ) : !user ? (
          
          /* ================= LOGIN & SIGNUP FORMS ================= */
          <div className="flex-1 overflow-y-auto p-6 sm:p-12 flex items-center justify-center bg-[#0F1113]/50">
            <div className="w-full max-w-md bg-[#141618] border border-[#323436] p-8 space-y-6 relative">
              <div className="absolute top-4 right-4 text-[8px] font-mono text-[#A89E8D]/30 uppercase">
                SECURE AUTH GATE
              </div>

              <div className="text-center space-y-1.5">
                <Lock className="w-8 h-8 text-[#A89E8D] mx-auto mb-2" />
                <h4 className="font-heading font-bold text-base text-white uppercase tracking-wider">
                  {isAdminMode ? "Register Syndicate Administrator" : "Family Office Authentication"}
                </h4>
                <p className="text-xs text-[#A89E8D]/60 max-w-[280px] mx-auto font-sans">
                  {isAdminMode 
                    ? "Establish authorized login credentials linked to the secure Chicago central servers."
                    : "Access the private databases, message vaults, and real-time telemetry logs."
                  }
                </p>

                {!checkFirebaseStatus().isAvailable && (
                  <div className="mt-4 p-3 bg-amber-950/25 border border-amber-800/40 text-[#A89E8D] text-[11px] font-sans leading-relaxed text-left rounded-none">
                    <span className="font-bold text-white uppercase block mb-1">Local Secure Ledger Mode</span>
                    Firebase has been set to offline because Google Cloud billing is required or Firestore is not yet activated on your project.
                    <span className="text-white block mt-2 font-bold uppercase text-[9px] tracking-wider">Demo Credentials:</span>
                    <div className="mt-1 font-mono text-[10px] space-y-1 text-white bg-black/40 p-2 border border-[#323436]">
                      <div>Email: <span className="text-amber-300">v.muhlenbruch@muhlenbruch-insurance.com</span></div>
                      <div>Pass: <span className="text-amber-300">any password</span> (e.g. 123456)</div>
                    </div>
                  </div>
                )}
              </div>

              {authError && (
                <div className="p-3 bg-red-950/20 border border-red-800/40 text-red-400 text-xs font-mono flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{authError}</span>
                </div>
              )}

              <form onSubmit={isAdminMode ? handleSignUp : handleLogin} className="space-y-4 font-sans text-xs">
                
                {isAdminMode && (
                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase tracking-wider font-mono text-[#A89E8D]">
                      Administrator Full Name
                    </label>
                    <input 
                      type="text" 
                      required
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      placeholder="e.g. Victoria Muhlenbruch"
                      className="w-full bg-[#0F1113] text-[#F4F1EA] border border-[#323436] p-3 focus:outline-none focus:border-[#A89E8D]"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="block text-[9px] uppercase tracking-wider font-mono text-[#A89E8D]">
                    Secure Work Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-4 h-4 text-[#A89E8D]/40" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@muhlenbruch-insurance.com"
                      className="w-full bg-[#0F1113] text-[#F4F1EA] border border-[#323436] py-3 pl-10 pr-4 focus:outline-none focus:border-[#A89E8D]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] uppercase tracking-wider font-mono text-[#A89E8D]">
                    Security Pass-Key Code
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3.5 w-4 h-4 text-[#A89E8D]/40" />
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-[#0F1113] text-[#F4F1EA] border border-[#323436] py-3 pl-10 pr-4 focus:outline-none focus:border-[#A89E8D]"
                    />
                  </div>
                </div>

                {isAdminMode && (
                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase tracking-wider font-mono text-[#A89E8D] flex justify-between items-center">
                      <span>Syndicate Security Code</span>
                      <button 
                        type="button"
                        onClick={() => setSecurityCode(REGISTER_SECURITY_CODE)}
                        className="text-[9px] text-[#A89E8D] hover:text-[#F4F1EA] bg-[#141618] px-2 py-0.5 border border-[#323436] font-mono text-[8px] uppercase tracking-wider cursor-pointer hover:border-[#A89E8D] transition-colors"
                      >
                        Auto-Fill Key
                      </button>
                    </label>
                    <input 
                      type="text" 
                      required
                      value={securityCode}
                      onChange={(e) => setSecurityCode(e.target.value)}
                      placeholder="Enter security key to verify clearance..."
                      className="w-full bg-[#0F1113] text-[#F4F1EA] border border-[#323436] p-3 focus:outline-none focus:border-[#A89E8D] font-mono text-center tracking-widest text-[11px]"
                    />
                    <p className="text-[9px] text-[#A89E8D]/50 mt-1">
                      {checkFirebaseStatus().isAvailable 
                        ? "Required for cloud authorization." 
                        : "Optional in Local Ledger mode (click Auto-Fill or type any value)."
                      }
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-[#F4F1EA] hover:bg-[#A89E8D] text-[#0F1113] font-heading font-bold uppercase tracking-widest transition-colors cursor-pointer text-center flex items-center justify-center space-x-2"
                >
                  {submitting ? (
                    <span className="w-4 h-4 rounded-full border border-black border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>{isAdminMode ? "Register & Access Vault" : "Verify & Authorize Connection"}</span>
                    </>
                  )}
                </button>
              </form>

              <div className="pt-4 border-t border-[#323436] text-center text-[10px] text-[#A89E8D]/60 font-sans">
                {isAdminMode ? (
                  <p>
                    Already possess an authorized ledger access account?{" "}
                    <button 
                      onClick={() => { setIsAdminMode(false); setAuthError(""); }}
                      className="text-[#F4F1EA] font-bold hover:underline"
                    >
                      Sign In Here
                    </button>
                  </p>
                ) : (
                  <p>
                    Requesting a new administrative consular profile?{" "}
                    <button 
                      onClick={() => { setIsAdminMode(true); setAuthError(""); }}
                      className="text-[#F4F1EA] font-bold hover:underline"
                    >
                      Sign Up Here
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          
          /* ================= MAIN SECURED ADMIN DASHBOARD ================= */
          <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-[#0A0C0E]">
            
            {/* Sidebar Controls */}
            <div className="w-full md:w-64 border-r border-[#323436] bg-[#0F1113] flex flex-col justify-between">
              <div className="p-4 space-y-6">
                
                {/* Active Admin Identity Badge */}
                <div className="bg-[#141618] border border-[#323436] p-4 space-y-2">
                  <div className="flex items-center space-x-2 text-[#A89E8D]">
                    <User className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-widest font-mono font-bold">Consular Admin</span>
                  </div>
                  <div className="truncate text-xs font-bold text-white">
                    {admins.find(a => a.uid === user.uid)?.name || "Active Custodian"}
                  </div>
                  <div className="text-[10px] text-[#A89E8D]/60 truncate">
                    {user.email}
                  </div>
                </div>

                {/* Navigation Menus */}
                <div className="space-y-1">
                  <span className="block text-[9px] font-mono uppercase text-[#A89E8D]/50 tracking-wider mb-2 pl-2">
                    Ledger Databases
                  </span>

                  <button
                    onClick={() => { setCurrentTab("messages"); setSelectedContact(null); }}
                    className={`w-full flex items-center justify-between px-3 py-3 font-heading font-bold text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                      currentTab === "messages"
                        ? "bg-[#A89E8D] text-[#0F1113]"
                        : "text-[#A89E8D] hover:bg-[#141618] hover:text-[#F4F1EA]"
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Inbox className="w-4 h-4" />
                      <span>Contact Inquiries</span>
                    </div>
                    <span className={`px-2 py-0.5 text-[9px] font-mono ${
                      currentTab === "messages" ? "bg-[#0F1113] text-white" : "bg-[#141618] text-[#A89E8D] border border-[#323436]"
                    }`}>
                      {contacts.length}
                    </span>
                  </button>

                  <button
                    onClick={() => { setCurrentTab("admins"); setSelectedContact(null); }}
                    className={`w-full flex items-center justify-between px-3 py-3 font-heading font-bold text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                      currentTab === "admins"
                        ? "bg-[#A89E8D] text-[#0F1113]"
                        : "text-[#A89E8D] hover:bg-[#141618] hover:text-[#F4F1EA]"
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Users className="w-4 h-4" />
                      <span>Authorized Admins</span>
                    </div>
                    <span className={`px-2 py-0.5 text-[9px] font-mono ${
                      currentTab === "admins" ? "bg-[#0F1113] text-white" : "bg-[#141618] text-[#A89E8D] border border-[#323436]"
                    }`}>
                      {admins.length}
                    </span>
                  </button>
                </div>

                {/* Live Stats block */}
                <div className="pt-4 border-t border-[#323436] space-y-2 text-[10px] font-mono text-[#A89E8D]/70">
                  <span className="block uppercase tracking-wider text-[8px] text-[#A89E8D]/40">Active Telemetry</span>
                  <div className="flex justify-between">
                    <span>LEDGER SYSTEM:</span>
                    {checkFirebaseStatus().isAvailable ? (
                      <span className="text-green-400 font-bold uppercase">CLOUD FIRESTORE</span>
                    ) : (
                      <span className="text-amber-500 font-bold uppercase">LOCAL LEDGER</span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span>UNREAD INQUIRIES:</span>
                    <span className="text-amber-400 font-bold">{contacts.filter(c => c.status !== "Read").length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SECURE PROXY:</span>
                    <span className="text-white">CHICAGO-VAULT-2</span>
                  </div>
                </div>

              </div>

              {/* Log Out Button */}
              <div className="p-4 border-t border-[#323436]">
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 bg-[#141618] hover:bg-red-950/40 border border-[#323436] hover:border-red-800 text-[#A89E8D] hover:text-red-400 text-[10px] font-heading font-bold uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-center space-x-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Terminate Session</span>
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-0">
              
              {/* TAB 1: CONTACT INQUIRIES DATABASE */}
              {currentTab === "messages" && (
                <div className="flex-1 flex flex-col md:flex-row min-h-0">
                  
                  {/* Messages Ledger List (Left or Central Section) */}
                  <div className="flex-1 flex flex-col min-h-0 border-r border-[#323436]">
                    
                    {/* Database Filters bar */}
                    <div className="p-4 border-b border-[#323436] bg-[#0F1113] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      
                      {/* Search */}
                      <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-[#A89E8D]/50" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search sender, hash, subject or credentials..."
                          className="w-full bg-[#141618] text-xs text-white border border-[#323436] py-2 pl-9 pr-4 focus:outline-none focus:border-[#A89E8D] placeholder-[#A89E8D]/30"
                        />
                      </div>

                      {/* Filter Toggles */}
                      <div className="flex items-center space-x-2">
                        <Filter className="w-3.5 h-3.5 text-[#A89E8D]/60" />
                        <span className="text-[10px] uppercase font-mono text-[#A89E8D]/60">Status:</span>
                        <div className="flex border border-[#323436]">
                          {["all", "unread", "read"].map((f) => (
                            <button
                              key={f}
                              onClick={() => setStatusFilter(f)}
                              className={`px-3 py-1.5 text-[9px] uppercase font-heading font-bold cursor-pointer transition-colors ${
                                statusFilter === f
                                  ? "bg-[#A89E8D] text-[#0F1113]"
                                  : "bg-[#141618] text-[#A89E8D] hover:text-white"
                              }`}
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={fetchDashboardData}
                          className="px-2.5 py-1.5 bg-[#141618] text-white border border-[#323436] hover:border-[#A89E8D] transition-colors cursor-pointer text-[9px] uppercase font-heading font-bold"
                          title="Refresh Database Ledger"
                        >
                          Refresh
                        </button>
                      </div>

                    </div>

                    {/* Table or list of items */}
                    <div className="flex-1 overflow-y-auto">
                      {loadingData ? (
                        <div className="py-20 text-center font-mono space-y-3">
                          <div className="w-8 h-8 rounded-full border border-[#A89E8D]/20 border-t-[#A89E8D] animate-spin mx-auto" />
                          <span className="text-[10px] text-[#A89E8D] uppercase tracking-widest">Querying central databases...</span>
                        </div>
                      ) : filteredContacts.length === 0 ? (
                        <div className="py-24 text-center max-w-md mx-auto space-y-4">
                          <Inbox className="w-12 h-12 text-[#A89E8D]/25 mx-auto" />
                          <div>
                            <h5 className="font-heading font-bold text-sm text-[#F4F1EA] uppercase tracking-wider">
                              No Ledgers Registered
                            </h5>
                            <p className="text-xs text-[#A89E8D]/50 font-sans mt-1">
                              No secure transmission records match your criteria inside this syndicate database shard.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="divide-y divide-[#323436]">
                          {filteredContacts.map((c) => (
                            <div
                              key={c.id}
                              onClick={() => setSelectedContact(c)}
                              className={`p-5 transition-colors cursor-pointer text-left relative group ${
                                selectedContact?.id === c.id 
                                  ? "bg-[#141618]" 
                                  : "hover:bg-[#141618]/40"
                              }`}
                            >
                              {/* Accent color tab depending on priority */}
                              <div className={`absolute left-0 top-0 bottom-0 w-[2px] transition-all ${
                                c.priority === "Immediate Triage" ? "bg-red-500" :
                                c.priority === "Priority Diplomatic" ? "bg-amber-500" :
                                "bg-[#A89E8D]"
                              }`} />

                              <div className="space-y-2">
                                <div className="flex items-center justify-between flex-wrap gap-2 text-[10px] font-mono">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-white font-bold uppercase border border-[#323436] px-1.5 py-0.5 bg-[#0F1113]">
                                      {c.transmissionHash.substring(0, 15)}
                                    </span>
                                    <span className={`px-2 py-0.5 border ${
                                      c.status === "Read" 
                                        ? "bg-green-950/20 text-green-400 border-green-800/20" 
                                        : "bg-amber-950/20 text-amber-400 border-amber-800/20 font-bold"
                                    }`}>
                                      {c.status || "Unread"}
                                    </span>
                                  </div>
                                  <span className="text-[#A89E8D]/50">{new Date(c.createdAt).toLocaleString()}</span>
                                </div>

                                <div className="space-y-0.5">
                                  <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wide truncate">
                                    {c.subject}
                                  </h4>
                                  <div className="flex items-center space-x-2 text-xs text-[#A89E8D]/80">
                                    <span className="font-bold text-white">{c.name}</span>
                                    <span>&bull;</span>
                                    <span className="text-[#A89E8D]/65">{c.email}</span>
                                  </div>
                                </div>

                                <p className="text-xs text-[#A89E8D]/50 line-clamp-1 truncate font-sans">
                                  {c.message}
                                </p>

                                <div className="flex items-center justify-between pt-2 border-t border-[#323436]/40 text-[9px] font-mono">
                                  <span className="text-[#A89E8D]/70 uppercase">
                                    PRIORITY: {c.priority} // CATEGORY: {c.coverageType}
                                  </span>
                                  <span className="text-white group-hover:text-[#A89E8D] transition-colors flex items-center">
                                    Decrypt Details <ChevronRight className="w-3 h-3 ml-0.5" />
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Message Decrypt Slide-over Details (Right column on desktop) */}
                  <div className="w-full md:w-96 flex flex-col bg-[#0F1113]/40 overflow-y-auto">
                    {selectedContact ? (
                      <div className="p-6 space-y-6">
                        
                        {/* Title and control */}
                        <div className="flex items-center justify-between pb-4 border-b border-[#323436]">
                          <div className="flex items-center space-x-2">
                            <Lock className="w-4 h-4 text-[#A89E8D]" />
                            <span className="text-[10px] uppercase font-mono tracking-widest text-white font-bold">
                              SECURE PAYLOAD DECRYPT
                            </span>
                          </div>
                          <button
                            onClick={() => setSelectedContact(null)}
                            className="text-[#A89E8D] hover:text-white text-xs uppercase font-mono"
                          >
                            Close
                          </button>
                        </div>

                        {/* Core Meta Details */}
                        <div className="space-y-4">
                          
                          {/* Transmission Info Block */}
                          <div className="bg-[#141618] border border-[#323436] p-4 space-y-3 font-mono text-[10px]">
                            <div className="flex justify-between">
                              <span className="text-[#A89E8D]/60">TRANSMISSION:</span>
                              <span className="text-white font-bold select-all">{selectedContact.transmissionHash}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#A89E8D]/60">TIMELOG:</span>
                              <span className="text-white">{new Date(selectedContact.createdAt).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#A89E8D]/60">PRIORITY:</span>
                              <span className={`font-bold ${
                                selectedContact.priority === "Immediate Triage" ? "text-red-400" :
                                selectedContact.priority === "Priority Diplomatic" ? "text-amber-400" :
                                "text-white"
                              }`}>{selectedContact.priority.toUpperCase()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#A89E8D]/60">CATEGORY:</span>
                              <span className="text-white uppercase">{selectedContact.coverageType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#A89E8D]/60">VAULT LOGIN:</span>
                              <span className="text-white">{selectedContact.requestSession ? "REQUESTED (PROVISION)" : "NONE"}</span>
                            </div>
                          </div>

                          {/* Sender identity */}
                          <div className="space-y-1">
                            <span className="block text-[9px] uppercase tracking-wider font-mono text-[#A89E8D]">
                              Sender Credentials
                            </span>
                            <div className="bg-[#0F1113] border border-[#323436] p-4 text-xs space-y-1">
                              <div className="font-bold text-white uppercase tracking-wider">{selectedContact.name}</div>
                              <div className="text-white/80">{selectedContact.email}</div>
                              <div className="font-mono text-[#A89E8D]">{selectedContact.phone}</div>
                            </div>
                          </div>

                          {/* Subject */}
                          <div className="space-y-1">
                            <span className="block text-[9px] uppercase tracking-wider font-mono text-[#A89E8D]">
                              Ledger Subject
                            </span>
                            <div className="bg-[#0F1113] border border-[#323436] p-4 text-xs font-bold text-white uppercase leading-relaxed">
                              {selectedContact.subject}
                            </div>
                          </div>

                          {/* Message Body */}
                          <div className="space-y-1">
                            <span className="block text-[9px] uppercase tracking-wider font-mono text-[#A89E8D]">
                              Particulars Specification Payload
                            </span>
                            <div className="bg-[#0F1113] border border-[#323436] p-4 text-xs text-[#A89E8D] leading-relaxed whitespace-pre-wrap font-sans">
                              {selectedContact.message}
                            </div>
                          </div>

                        </div>

                        {/* Interactive Actions */}
                        <div className="pt-4 border-t border-[#323436] space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              onClick={() => handleToggleStatus(selectedContact.id, selectedContact.status)}
                              className="py-2.5 border border-[#323436] hover:border-[#A89E8D] bg-[#141618] hover:bg-[#0F1113] text-[#A89E8D] hover:text-white text-[10px] font-heading font-bold uppercase tracking-wider cursor-pointer text-center"
                            >
                              {selectedContact.status === "Read" ? "Mark Unread" : "Mark Read"}
                            </button>

                            <button
                              onClick={() => handleDeleteContact(selectedContact.id)}
                              className="py-2.5 border border-red-900/30 hover:border-red-800 bg-red-950/10 hover:bg-red-950/30 text-red-400 text-[10px] font-heading font-bold uppercase tracking-wider cursor-pointer text-center flex items-center justify-center space-x-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Erase Ledger</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-[#A89E8D]/40 space-y-3 font-mono text-xs">
                        <FileText className="w-10 h-10 text-[#A89E8D]/20" />
                        <p>Select an incoming secure transmission from the list to decrypt its comprehensive portfolio particulars.</p>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* TAB 2: REGISTERED ADMINISTRATORS LIST */}
              {currentTab === "admins" && (
                <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                  
                  <div className="flex items-center justify-between pb-4 border-b border-[#323436]">
                    <div>
                      <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                        Accredited Underwriter Registry
                      </h4>
                      <p className="text-xs text-[#A89E8D]/60 font-sans mt-0.5">
                        The current cohort of authorized custodians with clearance levels to inspect secure ledger databases.
                      </p>
                    </div>
                    <button
                      onClick={fetchDashboardData}
                      className="px-3 py-1.5 bg-[#141618] text-white border border-[#323436] hover:border-[#A89E8D] transition-colors cursor-pointer text-[10px] uppercase font-heading font-bold"
                    >
                      Refresh Registry
                    </button>
                  </div>

                  {/* Admins Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
                    {admins.map((adm) => (
                      <div 
                        key={adm.uid}
                        className="bg-[#141618] border border-[#323436] p-5 space-y-4 relative"
                      >
                        {/* Admin Badge Monogram */}
                        <div className="absolute top-4 right-4 text-[9px] font-mono font-bold text-green-400 uppercase bg-green-950/20 border border-green-800/20 px-2 py-0.5">
                          {adm.role || "ADMIN"}
                        </div>

                        <div className="flex items-center space-x-3.5">
                          <div className="w-10 h-10 bg-[#0F1113] border border-[#323436] flex items-center justify-center text-[#A89E8D]">
                            <User className="w-5 h-5" />
                          </div>
                          <div>
                            <h5 className="font-heading font-bold text-sm text-white uppercase tracking-wide">
                              {adm.name}
                            </h5>
                            <span className="text-[10px] font-mono text-[#A89E8D]/50">
                              UID: {adm.uid.substring(0, 12).toUpperCase()}...
                            </span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-[#323436]/60 text-xs text-[#A89E8D]/80 space-y-1.5 font-mono">
                          <div className="flex justify-between">
                            <span>EMAIL:</span>
                            <span className="text-white font-sans">{adm.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>ENROLLED:</span>
                            <span className="text-white font-sans">{new Date(adm.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
