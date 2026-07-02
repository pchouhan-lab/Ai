import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/gemini/risk-profile", async (req, res) => {
    try {
      const { businessType, sector, details, coverageLimits, assetValue } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY environment variable is not configured. Please add it to Secrets." });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `You are the lead Executive Risk Underwriter and Corporate Insurance Strategist at Muhlenbruch Insurance, an elite multi-generational premium agency serving prestigious families, high-net-worth individuals, luxury estate owners, enterprise organizations, and commercial clients.
Analyze this risk-profiling request and provide a beautifully structured, highly professional, authoritative Underwriting Advisory Report.

Client Profile:
- Sector Classification: ${sector}
- Business Type / Private Asset Category: ${businessType}
- Specific Details: ${details}
- Declared Asset Value: ${assetValue}
- Selected Target Liability Limits: ${coverageLimits}

Please return a valid JSON response matching the following schema. Make sure it is valid JSON and contains realistic coverage names, detailed risk calculations, customized premium projections, and detailed advisory comments. Do not wrap in markdown or backticks, return the raw JSON directly.

Response JSON Schema:
{
  "clientClassification": "string summarizing client risk bracket (e.g. Premium Corporate Risk / High-Net-Worth Estate)",
  "overallRiskRating": "Low" | "Medium" | "High" | "Significant",
  "executiveSummary": "A premium, sophisticated, highly reassuring underwriter executive summary detailing their risks and how Muhlenbruch's specialized policies cover them.",
  "identifiedRisks": [
    {
      "riskType": "Specific liability or exposure risk name (e.g. Business Interruption, Cyber Liability, Surface Water Flooding, Antique Inland Marine)",
      "probability": "Low" | "Medium" | "High",
      "impact": "Low" | "Medium" | "High" | "Catastrophic",
      "explanation": "Expert risk rationale detail, written in elegant corporate prose."
    }
  ],
  "recommendedCoverages": [
    {
      "name": "Bespoke Premium Policy Name (e.g., Muhlenbruch Executive Umbrella Liability, Signature Custom Estate Property Protection)",
      "recommendedLimit": "Suggested coverage limit, e.g., $10,000,000",
      "deductibleOption": "Deductible choice, e.g., $25,000",
      "annualEstimatedPremium": "Detailed estimated premium, e.g., $8,500",
      "features": ["Comprehensive replacement guarantee", "Bespoke fine-art floater capability", "Immediate worldwide civil defense litigation coverage"],
      "whyImportant": "Expert strategic underwriting justification for why this specific coverage is crucial for their asset structure."
    }
  ],
  "underwriterAdvisoryNotes": [
    "Actionable proactive advisory note, e.g., Installing commercial grade IoT leak detection sensors mitigates property hazard ratings and yields a 15% rate credit.",
    "Bespoke security mandate recommendation, e.g. Implement dual-signature treasury mandates to lower crime-theft fidelity exposure."
  ],
  "estimatedTotalPremium": "Total customized estimated annual premium (e.g., $15,200)"
}
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.25
        }
      });

      if (response.text) {
        // Safe parsing
        const cleanText = response.text.trim();
        const parsed = JSON.parse(cleanText);
        return res.json(parsed);
      } else {
        throw new Error("Received empty response from Gemini content generator.");
      }
    } catch (error: any) {
      console.error("Gemini API Error in /api/gemini/risk-profile:", error);
      res.status(500).json({ error: error.message || "Failed to process premium risk assessment." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
