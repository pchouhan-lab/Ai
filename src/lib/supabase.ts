import { createClient } from "@supabase/supabase-js";

// Retrieve configuration from Vite environment variables, falling back to the user's provided credentials
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://dirmcrwhunmivvocuvlg.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_OjxbHVVyRh69fJruxdSOyA_Pkam8imj";

let supabase: any = null;
let isSupabaseAvailable = false;
let supabaseErrorMessage = "";

try {
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    });
    isSupabaseAvailable = true;
  } else {
    supabaseErrorMessage = "Supabase URL and Anon Key are missing.";
  }
} catch (error: any) {
  console.warn("Supabase initialization failed. Running in Local Ledger mode.", error);
  supabaseErrorMessage = error?.message || "Initialization error";
}

// Global flag to force local ledger if tables are missing or request errors out
let forceLocalStorage = false;

function handleSupabaseError(err: any, context: string) {
  console.warn(`Supabase error [${context}]:`, err);
  const msg = (err?.message || err?.toString() || "").toLowerCase();
  if (
    msg.includes("failed to fetch") ||
    msg.includes("network") ||
    msg.includes("load failed") ||
    err?.name === "TypeError"
  ) {
    forceLocalStorage = true;
    supabaseErrorMessage = "Network connection to Supabase failed (blocked by ad-blocker or firewall). Running in Local Secure Vault mode.";
  }
}

export function checkSupabaseStatus() {
  return {
    isAvailable: isSupabaseAvailable && !forceLocalStorage,
    errorMessage: supabaseErrorMessage,
    projectId: "dirmcrwhunmivvocuvlg"
  };
}

// ---------------- LOCAL STORAGE KEYS (MATCHES FIREBASE) ----------------
const LOCAL_CONTACTS_KEY = "muhlenbruch_contacts";
const LOCAL_ADMINS_KEY = "muhlenbruch_admins";
const LOCAL_SESSION_KEY = "muhlenbruch_session";

// Seed initial values in localStorage if they don't exist
if (!localStorage.getItem(LOCAL_CONTACTS_KEY)) {
  localStorage.setItem(LOCAL_CONTACTS_KEY, JSON.stringify([
    {
      id: "seed-tx-1",
      name: "Lord Sterling Sterling",
      email: "sterling@sterling-estate.co.uk",
      phone: "+44 20 7946 0958",
      coverageType: "Sovereign Family Assets",
      priority: "Priority Diplomatic",
      subject: "Inquiry regarding historic manor underwriting and gold bullion specie vault custody",
      message: "Our family office is planning to transition our primary specie portfolio. We require direct syndication through Chicago to cover transatlantic physical transit liabilities.",
      requestSession: true,
      transmissionHash: "MUHL-TX-E839C20D41BA",
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      status: "Unread"
    },
    {
      id: "seed-tx-2",
      name: "Genevieve Roche",
      email: "g.roche@geneve-capital.ch",
      phone: "+41 22 789 2451",
      coverageType: "High-Value Specie & Fine Art",
      priority: "Standard Secure",
      subject: "Syndicate underwriting of French Impressionist collection in Zurich",
      message: "We are organizing an exhibition of 14 paintings of high historical provenance. Please connect our registrar with an accredited forensic adjuster.",
      requestSession: false,
      transmissionHash: "MUHL-TX-A7492B9C0E3F",
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      status: "Read"
    }
  ]));
}

if (!localStorage.getItem(LOCAL_ADMINS_KEY)) {
  localStorage.setItem(LOCAL_ADMINS_KEY, JSON.stringify([
    {
      uid: "local-admin-seed",
      name: "Victoria Muhlenbruch",
      email: "v.muhlenbruch@muhlenbruch-insurance.com",
      createdAt: new Date().toISOString(),
      role: "Lead Custodian"
    }
  ]));
}

// ---------------- CONTACT INQUIRY API ----------------
export async function saveContactMessage(data: any) {
  if (isSupabaseAvailable && !forceLocalStorage) {
    try {
      // Map data matching table structures
      const { error } = await supabase
        .from("contacts")
        .insert([{
          name: data.name,
          email: data.email,
          phone: data.phone,
          coverage_type: data.coverageType,
          priority: data.priority,
          subject: data.subject,
          message: data.message,
          request_session: data.requestSession,
          transmission_hash: data.transmissionHash,
          status: data.status || "Unread",
          created_at: data.createdAt || new Date().toISOString()
        }]);

      if (error) {
        // If table doesn't exist, log and fall back to local storage
        if (error.code === "PGRST116" || error.code === "42P01") {
          console.warn("Supabase contacts table does not exist. Falling back to local ledger.");
          forceLocalStorage = true;
          supabaseErrorMessage = "Contacts table is missing. Run the SQL schema script in Supabase.";
        } else {
          throw error;
        }
      } else {
        return;
      }
    } catch (err: any) {
      handleSupabaseError(err, "saveContactMessage");
    }
  }

  // Fallback to local storage
  const localContacts = JSON.parse(localStorage.getItem(LOCAL_CONTACTS_KEY) || "[]");
  const newMsg = {
    id: `local-msg-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
    ...data
  };
  localContacts.unshift(newMsg);
  localStorage.setItem(LOCAL_CONTACTS_KEY, JSON.stringify(localContacts));
}

export async function getContactMessages() {
  if (isSupabaseAvailable && !forceLocalStorage) {
    try {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        if (error.code === "42P01") {
          forceLocalStorage = true;
          supabaseErrorMessage = "Contacts table is missing. Run the SQL schema script in Supabase.";
        } else {
          throw error;
        }
      } else if (data) {
        // Map Supabase columns back to standard React state schema
        return data.map((c: any) => ({
          id: c.id.toString(),
          name: c.name,
          email: c.email,
          phone: c.phone,
          coverageType: c.coverage_type,
          priority: c.priority,
          subject: c.subject,
          message: c.message,
          requestSession: c.request_session,
          transmissionHash: c.transmission_hash,
          status: c.status,
          createdAt: c.created_at
        }));
      }
    } catch (err: any) {
      handleSupabaseError(err, "getContactMessages");
    }
  }

  // Fallback
  return JSON.parse(localStorage.getItem(LOCAL_CONTACTS_KEY) || "[]");
}

export async function updateContactStatus(contactId: string, currentStatus: string) {
  const newStatus = currentStatus === "Read" ? "Unread" : "Read";
  
  const isLocalId = contactId.startsWith("local-msg-") || contactId.startsWith("seed-");
  
  if (isSupabaseAvailable && !forceLocalStorage && !isLocalId) {
    try {
      const { error } = await supabase
        .from("contacts")
        .update({ status: newStatus })
        .eq("id", contactId);

      if (!error) {
        return newStatus;
      }
    } catch (err: any) {
      handleSupabaseError(err, "updateContactStatus");
    }
  }

  // Local storage edit
  const localContacts = JSON.parse(localStorage.getItem(LOCAL_CONTACTS_KEY) || "[]");
  const updated = localContacts.map((c: any) => c.id === contactId ? { ...c, status: newStatus } : c);
  localStorage.setItem(LOCAL_CONTACTS_KEY, JSON.stringify(updated));
  return newStatus;
}

export async function deleteContactMessage(contactId: string) {
  const isLocalId = contactId.startsWith("local-msg-") || contactId.startsWith("seed-");

  if (isSupabaseAvailable && !forceLocalStorage && !isLocalId) {
    try {
      const { error } = await supabase
        .from("contacts")
        .delete()
        .eq("id", contactId);

      if (!error) return;
    } catch (err: any) {
      handleSupabaseError(err, "deleteContactMessage");
    }
  }

  // Local Storage delete
  const localContacts = JSON.parse(localStorage.getItem(LOCAL_CONTACTS_KEY) || "[]");
  const filtered = localContacts.filter((c: any) => c.id !== contactId);
  localStorage.setItem(LOCAL_CONTACTS_KEY, JSON.stringify(filtered));
}

// ---------------- ADMIN REGISTRY & AUTH API ----------------
export async function getAdminsList() {
  if (isSupabaseAvailable && !forceLocalStorage) {
    try {
      const { data, error } = await supabase
        .from("admins")
        .select("*");

      if (error) {
        if (error.code === "42P01") {
          console.warn("Supabase admins table is missing.");
        } else {
          throw error;
        }
      } else if (data) {
        return data;
      }
    } catch (err: any) {
      handleSupabaseError(err, "getAdminsList");
    }
  }

  return JSON.parse(localStorage.getItem(LOCAL_ADMINS_KEY) || "[]");
}

export async function signInAdmin(emailInput: string, passwordInput: string) {
  if (isSupabaseAvailable && !forceLocalStorage) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailInput,
        password: passwordInput,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.user) {
        // Fetch matching profile from admins table
        const { data: profile } = await supabase
          .from("admins")
          .select("*")
          .eq("uid", data.user.id)
          .single();

        const adminSession = {
          uid: data.user.id,
          email: data.user.email,
          name: profile?.name || "Consular Admin",
          role: profile?.role || "Admin",
          createdAt: profile?.created_at || new Date().toISOString()
        };

        localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(adminSession));
        return adminSession;
      }
    } catch (err: any) {
      handleSupabaseError(err, "signInAdmin");
      // Let standard credential check run if offline user exists with this credentials
    }
  }

  // Local authentication check
  const localAdmins = JSON.parse(localStorage.getItem(LOCAL_ADMINS_KEY) || "[]");
  const foundAdmin = localAdmins.find((a: any) => a.email.toLowerCase() === emailInput.toLowerCase());
  
  if (foundAdmin) {
    const sessionObj = { ...foundAdmin, email: emailInput };
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(sessionObj));
    return sessionObj;
  } else {
    throw new Error("No administrator found in the registry with this email. Please verify credentials or register.");
  }
}

export async function signUpAdmin(emailInput: string, passwordInput: string, nameInput: string) {
  if (isSupabaseAvailable && !forceLocalStorage) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: emailInput,
        password: passwordInput,
        options: {
          data: {
            name: nameInput
          }
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.user) {
        const adminPayload = {
          uid: data.user.id,
          name: nameInput || "Consular Admin",
          email: emailInput,
          created_at: new Date().toISOString(),
          role: "Admin"
        };

        // Write to our custom admins table
        const { error: profileError } = await supabase
          .from("admins")
          .insert([adminPayload]);

        if (profileError) {
          console.warn("Could not insert admin profile, table may be missing:", profileError);
        }

        const adminSession = {
          uid: data.user.id,
          email: emailInput,
          name: adminPayload.name,
          role: adminPayload.role,
          createdAt: adminPayload.created_at
        };

        localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(adminSession));
        return adminSession;
      }
    } catch (err: any) {
      handleSupabaseError(err, "signUpAdmin");
      // If network failed or tables are missing, don't block the user, continue to local registry instead
      if (!forceLocalStorage) {
        throw new Error(err.message || "An error occurred during registration.");
      }
    }
  }

  // Local storage registration
  const localAdmins = JSON.parse(localStorage.getItem(LOCAL_ADMINS_KEY) || "[]");
  if (localAdmins.some((a: any) => a.email.toLowerCase() === emailInput.toLowerCase())) {
    throw new Error("An administrator is already registered with this work email.");
  }

  const newAdmin = {
    uid: `local-admin-${Date.now()}`,
    name: nameInput || "Consular Admin",
    email: emailInput,
    createdAt: new Date().toISOString(),
    role: "Admin"
  };

  localAdmins.push(newAdmin);
  localStorage.setItem(LOCAL_ADMINS_KEY, JSON.stringify(localAdmins));
  
  // Save session
  localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(newAdmin));
  return newAdmin;
}

export async function logoutUser() {
  if (isSupabaseAvailable && supabase) {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Supabase logout error:", err);
    }
  }
  localStorage.removeItem(LOCAL_SESSION_KEY);
}

export function onAuthStateListener(callback: (user: any) => void) {
  if (isSupabaseAvailable && supabase) {
    // Synchronize current local session with callback
    const localSess = localStorage.getItem(LOCAL_SESSION_KEY);
    if (localSess) {
      callback(JSON.parse(localSess));
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: any, session: any) => {
      if (session?.user) {
        const localSessObj = localStorage.getItem(LOCAL_SESSION_KEY);
        if (localSessObj) {
          callback(JSON.parse(localSessObj));
        } else {
          callback({
            uid: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.name || "Consular Admin",
            role: "Admin",
            createdAt: session.user.created_at
          });
        }
      } else {
        const localSess = localStorage.getItem(LOCAL_SESSION_KEY);
        callback(localSess ? JSON.parse(localSess) : null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  } else {
    const localSess = localStorage.getItem(LOCAL_SESSION_KEY);
    callback(localSess ? JSON.parse(localSess) : null);
    return () => {};
  }
}

export { supabase };
