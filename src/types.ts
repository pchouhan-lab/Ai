export interface RiskFactor {
  riskType: string;
  probability: "Low" | "Medium" | "High";
  impact: "Low" | "Medium" | "High" | "Catastrophic";
  explanation: string;
}

export interface RecommendedCoverage {
  name: string;
  recommendedLimit: string;
  deductibleOption: string;
  annualEstimatedPremium: string;
  features: string[];
  whyImportant: string;
}

export interface UnderwritingReport {
  clientClassification: string;
  overallRiskRating: "Low" | "Medium" | "High" | "Significant";
  executiveSummary: string;
  identifiedRisks: RiskFactor[];
  recommendedCoverages: RecommendedCoverage[];
  underwriterAdvisoryNotes: string[];
  estimatedTotalPremium: string;
}

export interface ActivePolicy {
  id: string;
  policyNumber: string;
  type: string;
  limit: string;
  deductible: string;
  premium: string;
  status: "Active" | "Under Review" | "Claim Processing";
  effectiveDate: string;
  advisorName: string;
  advisorEmail: string;
}

export interface SimulatedClaim {
  id: string;
  policyNumber: string;
  type: string;
  date: string;
  description: string;
  estimatedDamage: string;
  status: "Submitted" | "Adjusting" | "Approved" | "Settled";
}

export interface LegacyMilestone {
  year: string;
  title: string;
  description: string;
}
