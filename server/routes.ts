import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { verificationRequestSchema, comparisonRequestSchema, reportSchema } from "@shared/schema";
import { Router } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const router = Router();

// initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// 1) Create order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;
    const options = {
      amount: amount * 100,        // convert rupees to paise
      currency,
      receipt,
      payment_capture: 1,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);              // { id, amount, currency, ... }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to create order' });
  }
});

// 2) Verify payment (optional but recommended)
router.post('/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const hmac = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (hmac === razorpay_signature) {
    res.json({ status: 'success' });
  } else {
    res.status(400).json({ status: 'failure' });
  }
});

export default router;

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
