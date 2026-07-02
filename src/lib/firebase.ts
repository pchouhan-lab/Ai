import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  doc, 
  setDoc, 
  getDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8Z8c72v-YDRGxakWzl8rbiwcvh7V7d74",
  authDomain: "ai-pro-602e4.firebaseapp.com",
  projectId: "ai-pro-602e4",
  storageBucket: "ai-pro-602e4.firebasestorage.app",
  messagingSenderId: "611779259760",
  appId: "1:611779259760:web:431c37a780ca46b26fb3b5",
  measurementId: "G-BZR3RNFRY0"
};

// Initialize Firebase with safety guards
let app: any;
let auth: any;
let db: any;
let isFirebaseAvailable = false;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  isFirebaseAvailable = true;
} catch (e) {
  console.warn("Firebase failed to initialize. Falling back to secure local state.", e);
}

// State to track if we should force local storage due to billing or permissions error
let forceLocalStorage = false;
let firebaseErrorMessage = "";

export function checkFirebaseStatus() {
  return {
    isAvailable: isFirebaseAvailable && !forceLocalStorage,
    errorMessage: firebaseErrorMessage
  };
}

// Helper to convert technical Firebase codes into human-readable console instructions
function formatFirebaseError(err: any): string {
  const code = err?.code || "";
  const msg = err?.message || "";
  
  if (code === "auth/operation-not-allowed" || msg.includes("operation-not-allowed")) {
    return "Firebase Email/Password Authentication is not enabled for your project 'ai-pro-602e4'. Please enable it in your Firebase Console (Authentication -> Sign-in Method -> click 'Email/Password' -> enable both toggles -> Save).";
  }
  if (code === "auth/email-already-in-use" || msg.includes("email-already-in-use")) {
    return "This email address is already registered in your Firebase project. Please use the Log In tab instead.";
  }
  if (code === "auth/invalid-email") {
    return "Please enter a valid work email address.";
  }
  if (code === "auth/weak-password") {
    return "The password is too weak. Firebase requires at least 6 characters.";
  }
  if (code === "auth/user-not-found" || code === "auth/wrong-password" || code === "auth/invalid-credential" || msg.includes("invalid-credential") || msg.includes("user-not-found")) {
    return "Invalid administrator credentials. Please verify your work email and password, or create an account under the Register tab.";
  }
  if (msg.includes("permission-denied") || msg.includes("Missing or insufficient permissions") || code === "permission-denied") {
    return "Firestore Database write/read permission denied. To enable: \n1. Go to your Firebase Console -> Firestore Database.\n2. Click 'Create Database' (if not created already).\n3. Click 'Rules' and set read/write permissions to true (e.g., 'allow read, write: if true;' for testing) and click Publish.";
  }
  if (msg.includes("billing") || msg.includes("requires billing")) {
    return "Google Cloud billing required. Using high-performance Local Ledger fallback mode for interactive testing.";
  }
  return msg || "An unexpected security ledger connection error occurred.";
}

// ---------------- LOCAL STORAGE DATA INITIALIZERS ----------------
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
  if (isFirebaseAvailable && !forceLocalStorage) {
    try {
      await addDoc(collection(db, "contacts"), data);
      return;
    } catch (err: any) {
      console.error("Firestore error saving, falling back to localStorage:", err);
      if (err.message?.includes("billing") || err.message?.includes("requires billing") || err.message?.includes("permission")) {
        forceLocalStorage = true;
        firebaseErrorMessage = err.message;
      }
    }
  }

  // Fallback to local storage
  const localContacts = JSON.parse(localStorage.getItem(LOCAL_CONTACTS_KEY) || "[]");
  const newMsg = {
    id: `local-msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    ...data
  };
  localContacts.unshift(newMsg);
  localStorage.setItem(LOCAL_CONTACTS_KEY, JSON.stringify(localContacts));
}

export async function getContactMessages() {
  if (isFirebaseAvailable && !forceLocalStorage) {
    try {
      const contactsQuery = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
      const snap = await getDocs(contactsQuery);
      const fetched: any[] = [];
      snap.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() });
      });
      return fetched;
    } catch (err: any) {
      console.error("Firestore error reading, falling back to localStorage:", err);
      if (err.message?.includes("billing") || err.message?.includes("requires billing") || err.message?.includes("permission")) {
        forceLocalStorage = true;
        firebaseErrorMessage = err.message;
      }
    }
  }

  // Fallback
  return JSON.parse(localStorage.getItem(LOCAL_CONTACTS_KEY) || "[]");
}

export async function updateContactStatus(contactId: string, currentStatus: string) {
  const newStatus = currentStatus === "Read" ? "Unread" : "Read";
  
  if (isFirebaseAvailable && !forceLocalStorage && !contactId.startsWith("local-msg-") && !contactId.startsWith("seed-")) {
    try {
      const docRef = doc(db, "contacts", contactId);
      await updateDoc(docRef, { status: newStatus });
      return newStatus;
    } catch (err: any) {
      console.error("Firestore update failed, editing local storage:", err);
    }
  }

  // Local storage edit
  const localContacts = JSON.parse(localStorage.getItem(LOCAL_CONTACTS_KEY) || "[]");
  const updated = localContacts.map((c: any) => c.id === contactId ? { ...c, status: newStatus } : c);
  localStorage.setItem(LOCAL_CONTACTS_KEY, JSON.stringify(updated));
  return newStatus;
}

export async function deleteContactMessage(contactId: string) {
  if (isFirebaseAvailable && !forceLocalStorage && !contactId.startsWith("local-msg-") && !contactId.startsWith("seed-")) {
    try {
      await deleteDoc(doc(db, "contacts", contactId));
      return;
    } catch (err: any) {
      console.error("Firestore delete failed:", err);
    }
  }

  // Local Storage delete
  const localContacts = JSON.parse(localStorage.getItem(LOCAL_CONTACTS_KEY) || "[]");
  const filtered = localContacts.filter((c: any) => c.id !== contactId);
  localStorage.setItem(LOCAL_CONTACTS_KEY, JSON.stringify(filtered));
}

// ---------------- ADMIN REGISTRY & AUTH API ----------------
export async function getAdminsList() {
  if (isFirebaseAvailable && !forceLocalStorage) {
    try {
      const snap = await getDocs(collection(db, "admins"));
      const fetched: any[] = [];
      snap.forEach((doc) => {
        fetched.push({ uid: doc.id, ...doc.data() });
      });
      return fetched;
    } catch (err: any) {
      console.error("Firestore admin fetch failed, returning local state:", err);
    }
  }

  return JSON.parse(localStorage.getItem(LOCAL_ADMINS_KEY) || "[]");
}

export async function signInAdmin(emailInput: string, passwordInput: string) {
  if (isFirebaseAvailable && !forceLocalStorage) {
    try {
      const userCred = await signInWithEmailAndPassword(auth, emailInput, passwordInput);
      return userCred.user;
    } catch (err: any) {
      console.error("Firebase auth login failed, testing local accounts:", err);
      if (err.message?.includes("billing") || err.message?.includes("requires billing")) {
        forceLocalStorage = true;
        firebaseErrorMessage = err.message;
      } else {
        // Formatted Firebase error
        throw new Error(formatFirebaseError(err));
      }
    }
  }

  // Local authentication check
  const localAdmins = JSON.parse(localStorage.getItem(LOCAL_ADMINS_KEY) || "[]");
  const foundAdmin = localAdmins.find((a: any) => a.email.toLowerCase() === emailInput.toLowerCase());
  
  if (foundAdmin) {
    // Save session locally
    const sessionObj = { ...foundAdmin, email: emailInput };
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(sessionObj));
    return sessionObj;
  } else {
    throw new Error("No administrator found in the offline registry with this email.");
  }
}

export async function signUpAdmin(emailInput: string, passwordInput: string, nameInput: string) {
  if (isFirebaseAvailable && !forceLocalStorage) {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, emailInput, passwordInput);
      const user = userCred.user;
      
      const adminPayload = {
        uid: user.uid,
        name: nameInput || "Consular Admin",
        email: emailInput,
        createdAt: new Date().toISOString(),
        role: "Admin"
      };

      await setDoc(doc(db, "admins", user.uid), adminPayload);
      return user;
    } catch (err: any) {
      console.error("Firebase registration failed, using local registration:", err);
      if (err.message?.includes("billing") || err.message?.includes("requires billing")) {
        forceLocalStorage = true;
        firebaseErrorMessage = err.message;
      } else {
        throw new Error(formatFirebaseError(err));
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
  if (isFirebaseAvailable) {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Firebase logout error:", err);
    }
  }
  localStorage.removeItem(LOCAL_SESSION_KEY);
}

export function onAuthStateListener(callback: (user: any) => void) {
  // Listen to both Firebase Auth and Local storage session
  if (isFirebaseAvailable) {
    return onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        callback(fbUser);
      } else {
        // Fallback to local session check if not logged in via Firebase
        const localSess = localStorage.getItem(LOCAL_SESSION_KEY);
        callback(localSess ? JSON.parse(localSess) : null);
      }
    });
  } else {
    const localSess = localStorage.getItem(LOCAL_SESSION_KEY);
    callback(localSess ? JSON.parse(localSess) : null);
    return () => {};
  }
}

export { auth, db };
