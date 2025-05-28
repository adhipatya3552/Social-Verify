import { pgTable, text, serial, integer, boolean, jsonb, timestamp, primaryKey, real } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Social Media Platforms enum
export const SocialPlatform = {
  TWITTER: "twitter",
  INSTAGRAM: "instagram",
  FACEBOOK: "facebook",
  TIKTOK: "tiktok",
} as const;

export type SocialPlatformType = typeof SocialPlatform[keyof typeof SocialPlatform];

// Account Verification Schema
export const verificationRequestSchema = z.object({
  profileUrl: z.string().min(2),
  platform: z.enum([
    SocialPlatform.TWITTER,
    SocialPlatform.INSTAGRAM,
    SocialPlatform.FACEBOOK,
    SocialPlatform.TIKTOK
  ]),
});

export type VerificationRequest = z.infer<typeof verificationRequestSchema>;

// Report Schema
export const reportSchema = z.object({
  accountId: z.string(),
  reason: z.string().optional(),
});

export type ReportRequest = z.infer<typeof reportSchema>;

// Comparison Schema
export const comparisonRequestSchema = z.object({
  accountIds: z.array(z.string()).min(2),
});

export type ComparisonRequest = z.infer<typeof comparisonRequestSchema>;

// Database Tables
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const socialAccounts = pgTable("social_accounts", {
  id: serial("id").primaryKey(),
  accountId: text("account_id").notNull().unique(),
  handle: text("handle").notNull(),
  platform: text("platform").notNull(),
  displayName: text("display_name"),
  profileImageUrl: text("profile_image_url"),
  isVerified: boolean("is_verified").default(false),
  followersCount: text("followers_count"),
  followingCount: text("following_count"),
  bio: text("bio"),
  credibilityScore: integer("credibility_score"),
  creationDate: timestamp("creation_date"),
  lastVerified: timestamp("last_verified").defaultNow(),
});

export const accountReports = pgTable("account_reports", {
  id: serial("id").primaryKey(),
  accountId: text("account_id").notNull(),
  reason: text("reason"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const verificationHistory = pgTable("verification_history", {
  id: serial("id").primaryKey(),
  profileUrl: text("profile_url").notNull(),
  platform: text("platform").notNull(),
  credibilityScore: integer("credibility_score").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
  results: jsonb("results").notNull(),
  accountId: text("account_id").notNull(),
});

export const accountComparisons = pgTable("account_comparisons", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").defaultNow(),
  overallSimilarity: real("overall_similarity").notNull(),
  possibleConnection: boolean("possible_connection").notNull(),
});

export const comparisonDetails = pgTable("comparison_details", {
  comparisonId: integer("comparison_id").notNull(),
  accountId: text("account_id").notNull(),
  similarityScore: real("similarity_score").notNull(),
  commonFollowers: integer("common_followers"),
  creationDateProximity: real("creation_date_proximity"),
  contentSimilarity: real("content_similarity"),
  behaviorPatternSimilarity: real("behavior_pattern_similarity"),
}, (table) => {
  return {
    pk: primaryKey(table.comparisonId, table.accountId),
  };
});

// Relations
export const verificationHistoryRelations = relations(verificationHistory, ({ one }: { one: any }) => ({
  account: one(socialAccounts, {
    fields: [verificationHistory.accountId],
    references: [socialAccounts.accountId],
  }),
}));

export const accountComparisonRelations = relations(accountComparisons, ({ many }: { many: any }) => ({
  details: many(comparisonDetails),
}));

export const comparisonDetailsRelations = relations(comparisonDetails, ({ one }: { one: any }) => ({
  comparison: one(accountComparisons, {
    fields: [comparisonDetails.comparisonId],
    references: [accountComparisons.id],
  }),
  account: one(socialAccounts, {
    fields: [comparisonDetails.accountId],
    references: [socialAccounts.accountId],
  }),
}));

export const accountReportsRelations = relations(accountReports, ({ one }: { one: any }) => ({
  account: one(socialAccounts, {
    fields: [accountReports.accountId],
    references: [socialAccounts.accountId],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSocialAccountSchema = createInsertSchema(socialAccounts).pick({
  accountId: true,
  handle: true,
  platform: true,
  displayName: true,
  profileImageUrl: true,
  isVerified: true,
  followersCount: true,
  followingCount: true,
  bio: true,
  credibilityScore: true,
  creationDate: true,
});

export const insertAccountReportSchema = createInsertSchema(accountReports).pick({
  accountId: true,
  reason: true,
});

export const insertVerificationHistorySchema = createInsertSchema(verificationHistory).pick({
  profileUrl: true,
  platform: true,
  credibilityScore: true,
  results: true,
  accountId: true,
});

export const insertAccountComparisonSchema = createInsertSchema(accountComparisons).pick({
  overallSimilarity: true,
  possibleConnection: true,
});

export const insertComparisonDetailSchema = createInsertSchema(comparisonDetails).pick({
  comparisonId: true,
  accountId: true,
  similarityScore: true,
  commonFollowers: true,
  creationDateProximity: true,
  contentSimilarity: true,
  behaviorPatternSimilarity: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertSocialAccount = z.infer<typeof insertSocialAccountSchema>;
export type SocialAccount = typeof socialAccounts.$inferSelect;

export type InsertAccountReport = z.infer<typeof insertAccountReportSchema>;
export type AccountReport = typeof accountReports.$inferSelect;

export type InsertVerificationHistory = z.infer<typeof insertVerificationHistorySchema>;
export type VerificationHistory = typeof verificationHistory.$inferSelect;

export type InsertAccountComparison = z.infer<typeof insertAccountComparisonSchema>;
export type AccountComparison = typeof accountComparisons.$inferSelect;

export type InsertComparisonDetail = z.infer<typeof insertComparisonDetailSchema>;
export type ComparisonDetail = typeof comparisonDetails.$inferSelect;
