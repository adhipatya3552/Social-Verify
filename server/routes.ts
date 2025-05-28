import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { verificationRequestSchema, comparisonRequestSchema, reportSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Verify social media account API
  app.post("/api/verify", async (req, res) => {
    try {
      const validatedData = verificationRequestSchema.parse(req.body);
      const result = await storage.verifySocialAccount(validatedData);
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid request data", errors: error.errors });
      } else {
        console.error("Verification error:", error);
        res.status(500).json({ message: "Failed to verify account" });
      }
    }
  });

  // Report account API
  app.post("/api/report", async (req, res) => {
    try {
      const validatedData = reportSchema.parse(req.body);
      const { accountId, reason } = validatedData;
      
      const result = await storage.reportAccount(accountId, reason);
      res.json({ success: true, message: "Account reported successfully", reportId: result.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid request data", errors: error.errors });
      } else {
        console.error("Reporting error:", error);
        res.status(500).json({ message: "Failed to report account" });
      }
    }
  });

  // Compare accounts API endpoint
  app.post("/api/compare", async (req, res) => {
    try {
      const validatedData = comparisonRequestSchema.parse(req.body);
      const { accountIds } = validatedData;
      
      const result = await storage.compareAccounts(accountIds);
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid request data", errors: error.errors });
      } else {
        console.error("Comparison error:", error);
        res.status(500).json({ message: "Failed to compare accounts" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
