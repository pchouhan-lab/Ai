import { LegacyMilestone, ActivePolicy, SimulatedClaim } from "./types";

export const LEGACY_TIMELINE: LegacyMilestone[] = [
  {
    year: "1928",
    title: "Founding in Chicago",
    description: "Gerrit Muhlenbruch launches a private commercial brokerage, catering to the shipping magnates and industrial merchants of the Great Lakes."
  },
  {
    year: "1954",
    title: "The Industrial Expansion",
    description: "Expanding into aerospace, major manufacturing, and heavy commercial infrastructure, Muhlenbruch becomes synonymous with enterprise trust."
  },
  {
    year: "1985",
    title: "Signature Private Portfolios",
    description: "Launches our dedicated Private Client Group, specializing in bespoke umbrella policies, elite superyachts, and heritage private estates."
  },
  {
    year: "2008",
    title: "Multinational Syndicate Integration",
    description: "Securing capital backed by global Lloyds syndicates, allowing us to independently underwrite single-risk hazards of up to $150M."
  },
  {
    year: "2018",
    title: "Executive Cyber & Tech Shield",
    description: "Pioneering advanced underwriting algorithms for major technology corporations, safeguarding critical intellectual properties and complex cloud structures."
  },
  {
    year: "2026",
    title: "The Digital Underwriter",
    description: "Introducing smart on-demand risk assessments and predictive climate-exposure modeling, providing world-class counsel at speed."
  }
];

export interface PremiumSector {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlightLimit: string;
  assetClassLabel: string;
  features: string[];
  sampleAssets: string[];
}

export const PREMIUM_SECTORS: PremiumSector[] = [
  {
    id: "commercial",
    title: "Commercial Enterprise",
    subtitle: "Enterprise Liability & Continuity",
    description: "Providing secure asset shields, business interruption coverage, and complex litigation protection for modern corporations and scaling multi-national enterprises.",
    highlightLimit: "Up to $250M single-risk capacity",
    assetClassLabel: "Commercial Capital Assets",
    features: [
      "Custom business interruption coverage",
      "Executive D&O liability shield",
      "Supply chain and cargo transit assurance",
      "Global commercial general liability"
    ],
    sampleAssets: [
      "Multi-state high-rises",
      "High-tech manufacturing lines",
      "Global corporate inventory"
    ]
  },
  {
    id: "private-wealth",
    title: "High-Net-Worth Private Estates",
    subtitle: "Sovereign Asset & Fine Art Protection",
    description: "Curating all-risk policies for historical estates, modern architectural masterpieces, rare private art collections, high-value wine cellars, and luxury automobiles.",
    highlightLimit: "Up to $80M estate valuation capacity",
    assetClassLabel: "Private Capital Assets",
    features: [
      "Worldwide fine-art & jewelry scheduled floaters",
      "Guaranteed replacement cost for bespoke materials",
      "Kidnap, ransom & specialized personal security advisory",
      "Domestic staff workers' compensation coverage"
    ],
    sampleAssets: [
      "Architectural estates & family trusts",
      "Prestige sports & classic vehicle fleets",
      "Curated fine-art portfolios"
    ]
  },
  {
    id: "maritime-aviation",
    title: "Elite Fleet, Marine & Aviation",
    subtitle: "Aeronautical & Deep Sea Shields",
    description: "Engineered for superyachts, private aircraft, corporate jet fleets, and ocean-going hulls. Global navigation protection backed by dedicated marine underwriters.",
    highlightLimit: "Up to $120M fleet valuation limits",
    assetClassLabel: "High-Performance Transport",
    features: [
      "All-risk aircraft hull & liability coverages",
      "Superyacht worldwide navigation and crew welfare",
      "P&I (Protection and Indemnity) sovereign club access",
      "Emergency high-altitude search and rescue support"
    ],
    sampleAssets: [
      "Gulfstream & Bombardier corporate fleets",
      "Sailing superyachts & custom motor vessels",
      "Aviation liability syndicates"
    ]
  },
  {
    id: "executive-cyber",
    title: "Executive Cyber & Tech Shield",
    subtitle: "Digital Interruption & IP Safeguard",
    description: "Tailored defense mechanisms for leading tech firms. Protecting against sophisticated ransomware, trade-secret leaks, patent litigation, and severe systems outage.",
    highlightLimit: "Up to $50M digital-breach indemnity",
    assetClassLabel: "Intangible IP Assets",
    features: [
      "Immediate 24/7 dark-web incident response teams",
      "Patent and trade-secret litigation funding",
      "Regulatory breach defense (GDPR/SEC compliance coverage)",
      "Cryptographic extortion & system restoration reimbursement"
    ],
    sampleAssets: [
      "Proprietary AI training weights",
      "Enterprise software data repositories",
      "Critical transaction-routing nodes"
    ]
  }
];

export const MOCK_POLICIES: ActivePolicy[] = [
  {
    id: "pol_01",
    policyNumber: "MH-8921-C2",
    type: "Signature Corporate Umbrella Liability",
    limit: "$25,000,000",
    deductible: "$50,000",
    premium: "$18,400/yr",
    status: "Active",
    effectiveDate: "Jan 01, 2026",
    advisorName: "Victoria Muhlenbruch",
    advisorEmail: "v.muhlenbruch@muhlenbruch-insurance.com"
  },
  {
    id: "pol_02",
    policyNumber: "MH-7411-E9",
    type: "Bespoke Private Estate All-Risk Policy",
    limit: "$12,500,000",
    deductible: "$15,000",
    premium: "$9,200/yr",
    status: "Active",
    effectiveDate: "Mar 15, 2026",
    advisorName: "Edward Van Der Bilt",
    advisorEmail: "e.vanderbilt@muhlenbruch-insurance.com"
  },
  {
    id: "pol_03",
    policyNumber: "MH-9055-M1",
    type: "Superyacht Premium Hull & Liability Protection",
    limit: "$45,000,000",
    deductible: "$100,000",
    premium: "$34,500/yr",
    status: "Active",
    effectiveDate: "May 20, 2026",
    advisorName: "Victoria Muhlenbruch",
    advisorEmail: "v.muhlenbruch@muhlenbruch-insurance.com"
  }
];

export const MOCK_CLAIMS: SimulatedClaim[] = [
  {
    id: "clm_01",
    policyNumber: "MH-7411-E9",
    type: "Bespoke Private Estate All-Risk Policy",
    date: "2026-06-10",
    description: "Minor lightning strike damaged estate smart power-grid systems and premium cedar shingles on auxiliary garage.",
    estimatedDamage: "$45,000",
    status: "Approved"
  },
  {
    id: "clm_02",
    policyNumber: "MH-8921-C2",
    type: "Signature Corporate Umbrella Liability",
    date: "2026-06-25",
    description: "Third-party shipping delay triggered supply-continuity clauses. Business interruption insurance claim filed.",
    estimatedDamage: "$110,000",
    status: "Adjusting"
  }
];
