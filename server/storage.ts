import { 
  users, 
  accountReports, 
  verificationHistory,
  socialAccounts,
  accountComparisons,
  comparisonDetails,
  type User, 
  type InsertUser,
  type VerificationRequest,
  type AccountReport,
  type InsertAccountReport,
  type VerificationHistory,
  type InsertVerificationHistory,
} from "@shared/schema";
import { 
  SocialVerificationResponse,
  ScoreFactor,
  BotBehaviorIndicator,
  ComparisonResult,
  AccountComparisonData
} from "@/lib/types";
import { db } from "./db";
import { eq, desc, inArray } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Verification methods
  verifySocialAccount(request: VerificationRequest): Promise<SocialVerificationResponse>;
  getVerificationHistory(limit?: number): Promise<VerificationHistory[]>;
  saveVerificationResult(data: InsertVerificationHistory): Promise<VerificationHistory>;
  
  // Report methods
  reportAccount(accountId: string, reason?: string): Promise<AccountReport>;
  getReportsByAccountId(accountId: string): Promise<AccountReport[]>;
  
  // Comparison method
  compareAccounts(accountIds: string[]): Promise<ComparisonResult>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private reports: Map<number, AccountReport>;
  private verifications: Map<number, VerificationHistory>;
  
  currentId: number;
  currentReportId: number;
  currentVerificationId: number;

  constructor() {
    this.users = new Map();
    this.reports = new Map();
    this.verifications = new Map();
    
    this.currentId = 1;
    this.currentReportId = 1;
    this.currentVerificationId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Verification methods
  async verifySocialAccount(request: VerificationRequest): Promise<SocialVerificationResponse> {
    const { profileUrl, platform } = request;
    
    // Normalize the URL or username
    const normalizedProfileUrl = profileUrl.startsWith('@') ? profileUrl : this.extractUsername(profileUrl, platform);
    
    // Calculate a credibility score based on various factors
    // This is a simplified implementation for demo purposes
    const scoreFactors = this.generateScoreFactors(normalizedProfileUrl, platform);
    
    // Calculate overall credibility score (average of all factors)
    const totalScore = scoreFactors.reduce((acc, factor) => acc + factor.score, 0);
    const credibilityScore = Math.round(totalScore / scoreFactors.length);
    
    // Bot behavior analysis
    const humanLikelihood = this.calculateHumanLikelihood(normalizedProfileUrl, scoreFactors);
    const botBehaviorIndicators = this.generateBotBehaviorIndicators(normalizedProfileUrl, humanLikelihood);
    
    // Generate credibility suggestions
    const credibilitySuggestions = this.generateCredibilitySuggestions(credibilityScore, scoreFactors);
    
    // Create response object
    const result: SocialVerificationResponse = {
      accountId: this.generateAccountId(normalizedProfileUrl, platform),
      accountHandle: normalizedProfileUrl,
      platformName: this.getPlatformDisplayName(platform),
      credibilityScore,
      scoreFactors,
      humanLikelihood,
      botBehaviorIndicators,
      credibilitySuggestions,
      // Mock profile data
      displayName: this.generateDisplayName(normalizedProfileUrl),
      accountCreationDate: this.generateAccountCreationDate(),
      isVerified: credibilityScore > 70,
      followersCount: this.generateFollowersCount(credibilityScore),
      followingCount: this.generateFollowingCount(),
      accountBio: this.generateAccountBio(credibilityScore),
      profileImageUrl: null // No image for privacy and to avoid using placeholders
    };
    
    const accountId = this.generateAccountId(normalizedProfileUrl, platform);
    
    // Save verification result
    await this.saveVerificationResult({
      profileUrl: normalizedProfileUrl,
      platform,
      credibilityScore,
      results: result as any,
      accountId
    });
    
    return result;
  }
  
  async getVerificationHistory(limit = 10): Promise<VerificationHistory[]> {
    return Array.from(this.verifications.values())
      .sort((a, b) => b.id - a.id)
      .slice(0, limit);
  }
  
  async saveVerificationResult(data: InsertVerificationHistory): Promise<VerificationHistory> {
    const id = this.currentVerificationId++;
    const timestamp = new Date();
    const verification: VerificationHistory = { ...data, id, timestamp };
    this.verifications.set(id, verification);
    return verification;
  }
  
  // Report methods
  async reportAccount(accountId: string, reason?: string): Promise<AccountReport> {
    const id = this.currentReportId++;
    const timestamp = new Date();
    const report: AccountReport = { id, accountId, reason: reason || null, timestamp };
    this.reports.set(id, report);
    return report;
  }
  
  async getReportsByAccountId(accountId: string): Promise<AccountReport[]> {
    return Array.from(this.reports.values())
      .filter(report => report.accountId === accountId)
      .sort((a, b) => b.id - a.id);
  }
  
  // Comparison method
  async compareAccounts(accountIds: string[]): Promise<ComparisonResult> {
    // In a real implementation, this would fetch stored verification results
    // or run new verifications for the accounts being compared
    
    return {
      accounts: accountIds.map(id => ({
        accountId: id,
        // Generate some fake comparison data
        similarityScore: Math.floor(Math.random() * 100),
        commonFollowers: Math.floor(Math.random() * 1000),
        creationDateProximity: Math.floor(Math.random() * 100),
        contentSimilarity: Math.floor(Math.random() * 100),
        behaviorPatternSimilarity: Math.floor(Math.random() * 100)
      })),
      overallSimilarity: Math.floor(Math.random() * 100),
      possibleConnection: Math.random() > 0.5
    };
  }
  
  // Helper methods
  private extractUsername(url: string, platform: string): string {
    // Simple extraction for demo purposes
    if (url.includes('/')) {
      const segments = url.split('/');
      return '@' + segments[segments.length - 1].replace(/[?#].*$/, '');
    }
    return url.startsWith('@') ? url : '@' + url;
  }
  
  private generateAccountId(username: string, platform: string): string {
    // Generate a deterministic ID based on platform and username
    const normalizedUsername = username.replace('@', '').toLowerCase();
    return `${platform}-${normalizedUsername}`;
  }
  
  private getPlatformDisplayName(platform: string): string {
    const platformMap: Record<string, string> = {
      'twitter': 'Twitter',
      'instagram': 'Instagram',
      'facebook': 'Facebook',
      'tiktok': 'TikTok'
    };
    return platformMap[platform] || platform;
  }
  
  private generateScoreFactors(username: string, platform: string): ScoreFactor[] {
    // This is where the real magic would happen with actual analysis
    // For demo purposes, we'll generate somewhat realistic looking results
    
    const usernameLength = username.replace('@', '').length;
    
    // Generate more realistic score factors based on the username and platform
    const accountAgeScore = 50 + Math.floor(Math.random() * 50);
    const verifiedStatusScore = usernameLength > 5 ? 80 + Math.floor(Math.random() * 20) : 30 + Math.floor(Math.random() * 40);
    const postingPatternsScore = 40 + Math.floor(Math.random() * 60);
    const engagementRatioScore = 30 + Math.floor(Math.random() * 70);
    
    return [
      {
        name: "Account Age",
        score: accountAgeScore,
        description: accountAgeScore > 80 
          ? "Account exists for several years (Excellent)" 
          : accountAgeScore > 50 
            ? "Account created within last year (Good)" 
            : "Recently created account (Concerning)"
      },
      {
        name: "Verified Status",
        score: verifiedStatusScore,
        description: verifiedStatusScore > 80 
          ? "Officially verified account" 
          : verifiedStatusScore > 50 
            ? "Verification status unclear" 
            : "Not verified"
      },
      {
        name: "Posting Patterns",
        score: postingPatternsScore,
        description: postingPatternsScore > 80 
          ? "Natural posting frequency" 
          : postingPatternsScore > 50 
            ? "Somewhat irregular posting" 
            : "Unusual posting frequency"
      },
      {
        name: "Engagement Ratio",
        score: engagementRatioScore,
        description: engagementRatioScore > 80 
          ? "High follower interaction" 
          : engagementRatioScore > 50 
            ? "Moderate follower interaction" 
            : "Low follower engagement"
      }
    ];
  }
  
  private calculateHumanLikelihood(username: string, factors: ScoreFactor[]): number {
    // Calculate human likelihood based on score factors
    // More sophisticated calculations would happen in a real implementation
    return Math.min(
      95,
      Math.max(
        5,
        Math.round(factors.reduce((acc, factor) => acc + factor.score, 0) / factors.length)
      )
    );
  }
  
  private generateBotBehaviorIndicators(username: string, humanLikelihood: number): BotBehaviorIndicator[] {
    // Generate bot behavior indicators based on human likelihood
    const indicators: BotBehaviorIndicator[] = [];
    
    if (humanLikelihood > 70) {
      indicators.push(
        { isPositive: true, text: "Natural language patterns in posts" },
        { isPositive: true, text: "Irregular posting schedule (human-like)" }
      );
      
      if (humanLikelihood < 90) {
        indicators.push({ isPositive: false, text: "High volume of posts in short time periods" });
      }
    } else {
      indicators.push(
        { isPositive: false, text: "Repetitive content patterns detected" },
        { isPositive: false, text: "Unusual posting times (possible automation)" },
        { isPositive: false, text: "Limited engagement with followers" }
      );
      
      if (humanLikelihood > 40) {
        indicators.push({ isPositive: true, text: "Some personalized responses to comments" });
      }
    }
    
    return indicators;
  }
  
  private generateCredibilitySuggestions(credibilityScore: number, factors: ScoreFactor[]): string[] {
    // Generate credibility suggestions based on score and factors
    const suggestions: string[] = [];
    
    if (credibilityScore > 80) {
      suggestions.push(
        "This account shows strong indicators of being authentic",
        "The account has established history and engagement patterns",
        "Always verify important information from any account through official channels"
      );
    } else if (credibilityScore > 50) {
      suggestions.push(
        "This account shows mixed credibility signals",
        "Exercise caution when interacting with this account",
        "Look for additional verification such as linked official websites",
        "Check if the account is followed by other verified accounts you trust"
      );
    } else {
      suggestions.push(
        "This account shows multiple suspicious patterns",
        "Avoid sharing personal information with this account",
        "Consider reporting this account if it's impersonating someone",
        "Be very cautious about any links or requests from this account"
      );
    }
    
    return suggestions;
  }
  
  private generateDisplayName(username: string): string {
    // Simple display name generation based on username
    const name = username.replace('@', '');
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
  
  private generateAccountCreationDate(): string {
    // Generate a random past date formatted as a string
    const now = new Date();
    const randomMonths = Math.floor(Math.random() * 36);  // Up to 3 years ago
    const creationDate = new Date(now.getFullYear(), now.getMonth() - randomMonths, Math.floor(Math.random() * 28) + 1);
    
    return creationDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  
  private generateFollowersCount(credibilityScore: number): string {
    // Generate followers count based on credibility score
    if (credibilityScore > 80) {
      const count = Math.floor(Math.random() * 900000) + 100000;
      return count > 1000000 ? `${(count / 1000000).toFixed(1)}M` : `${(count / 1000).toFixed(1)}K`;
    } else if (credibilityScore > 50) {
      const count = Math.floor(Math.random() * 90000) + 10000;
      return `${(count / 1000).toFixed(1)}K`;
    } else {
      const count = Math.floor(Math.random() * 9000) + 1000;
      return count.toString();
    }
  }
  
  private generateFollowingCount(): string {
    // Generate following count
    const count = Math.floor(Math.random() * 900) + 100;
    return count.toString();
  }
  
  private generateAccountBio(credibilityScore: number): string {
    // Generate a bio based on credibility score
    if (credibilityScore > 80) {
      return "Official account. For inquiries, please contact through official channels.";
    } else if (credibilityScore > 50) {
      return "Digital enthusiast sharing thoughts and experiences. Views are my own.";
    } else {
      return "Just here for the content! Follow for follow back!";
    }
  }
}

// Database Storage Implementation
export class DatabaseStorage implements IStorage {
  private users: Map<number, User>;
  private reports: Map<number, AccountReport>;
  private verifications: Map<number, VerificationHistory>;
  
  currentId: number;
  currentReportId: number;
  currentVerificationId: number;

  constructor() {
    this.users = new Map();
    this.reports = new Map();
    this.verifications = new Map();
    
    this.currentId = 1;
    this.currentReportId = 1;
    this.currentVerificationId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Verification methods
  async verifySocialAccount(request: VerificationRequest): Promise<SocialVerificationResponse> {
    const { profileUrl, platform } = request;
    
    // Normalize the URL or username
    const normalizedProfileUrl = profileUrl.startsWith('@') ? profileUrl : this.extractUsername(profileUrl, platform);
    
    // Calculate a credibility score based on various factors
    // This is a simplified implementation for demo purposes
    const scoreFactors = this.generateScoreFactors(normalizedProfileUrl, platform);
    
    // Calculate overall credibility score (average of all factors)
    const totalScore = scoreFactors.reduce((acc, factor) => acc + factor.score, 0);
    const credibilityScore = Math.round(totalScore / scoreFactors.length);
    
    // Bot behavior analysis
    const humanLikelihood = this.calculateHumanLikelihood(normalizedProfileUrl, scoreFactors);
    const botBehaviorIndicators = this.generateBotBehaviorIndicators(normalizedProfileUrl, humanLikelihood);
    
    // Generate credibility suggestions
    const credibilitySuggestions = this.generateCredibilitySuggestions(credibilityScore, scoreFactors);
    
    // Create response object
    const result: SocialVerificationResponse = {
      accountId: this.generateAccountId(normalizedProfileUrl, platform),
      accountHandle: normalizedProfileUrl,
      platformName: this.getPlatformDisplayName(platform),
      credibilityScore,
      scoreFactors,
      humanLikelihood,
      botBehaviorIndicators,
      credibilitySuggestions,
      // Mock profile data
      displayName: this.generateDisplayName(normalizedProfileUrl),
      accountCreationDate: this.generateAccountCreationDate(),
      isVerified: credibilityScore > 70,
      followersCount: this.generateFollowersCount(credibilityScore),
      followingCount: this.generateFollowingCount(),
      accountBio: this.generateAccountBio(credibilityScore),
      profileImageUrl: null // No image for privacy and to avoid using placeholders
    };
    
    const accountId = this.generateAccountId(normalizedProfileUrl, platform);
    
    // Save verification result
    await this.saveVerificationResult({
      profileUrl: normalizedProfileUrl,
      platform,
      credibilityScore,
      results: result as any,
      accountId
    });
    
    return result;
  }
  
  async getVerificationHistory(limit = 10): Promise<VerificationHistory[]> {
    return Array.from(this.verifications.values())
      .sort((a, b) => b.id - a.id)
      .slice(0, limit);
  }
  
  async saveVerificationResult(data: InsertVerificationHistory): Promise<VerificationHistory> {
    const id = this.currentVerificationId++;
    const timestamp = new Date();
    const verification: VerificationHistory = { ...data, id, timestamp };
    this.verifications.set(id, verification);
    return verification;
  }
  
  // Report methods
  async reportAccount(accountId: string, reason?: string): Promise<AccountReport> {
    const id = this.currentReportId++;
    const timestamp = new Date();
    const report: AccountReport = { id, accountId, reason: reason || null, timestamp };
    this.reports.set(id, report);
    return report;
  }
  
  async getReportsByAccountId(accountId: string): Promise<AccountReport[]> {
    return Array.from(this.reports.values())
      .filter(report => report.accountId === accountId)
      .sort((a, b) => b.id - a.id);
  }
  
  // Comparison method
  async compareAccounts(accountIds: string[]): Promise<ComparisonResult> {
    // In a real implementation, this would fetch stored verification results
    // or run new verifications for the accounts being compared
    
    return {
      accounts: accountIds.map(id => ({
        accountId: id,
        // Generate some fake comparison data
        similarityScore: Math.floor(Math.random() * 100),
        commonFollowers: Math.floor(Math.random() * 1000),
        creationDateProximity: Math.floor(Math.random() * 100),
        contentSimilarity: Math.floor(Math.random() * 100),
        behaviorPatternSimilarity: Math.floor(Math.random() * 100)
      })),
      overallSimilarity: Math.floor(Math.random() * 100),
      possibleConnection: Math.random() > 0.5
    };
  }
  
  // Helper functions for comparison
  private calculateResultSimilarity(account1Verifications: VerificationHistory[], account2Verifications: VerificationHistory[]): { contentSimilarity: number; behaviorSimilarity: number } {
    if (account1Verifications.length === 0 || account2Verifications.length === 0) {
      return { contentSimilarity: 50, behaviorSimilarity: 50 };
    }
    
    // Get the most recent verification for each account
    const verification1 = account1Verifications[0];
    const verification2 = account2Verifications[0];
    
    // Parse the results
    const results1 = verification1.results as any;
    const results2 = verification2.results as any;
    
    // Calculate content similarity based on various factors
    let contentSimilarityScore = 0;
    
    // Compare verification status
    if (results1.isVerified === results2.isVerified) {
      contentSimilarityScore += 10;
    }
    
    // Compare credibility scores
    const credibilityDiff = Math.abs(results1.credibilityScore - results2.credibilityScore);
    contentSimilarityScore += Math.max(0, 20 - credibilityDiff / 5);
    
    // Compare human likelihood
    const humanLikelihoodDiff = Math.abs(results1.humanLikelihood - results2.humanLikelihood);
    contentSimilarityScore += Math.max(0, 20 - humanLikelihoodDiff / 5);
    
    // Compare score factors
    let factorSimilarity = 0;
    if (results1.scoreFactors && results2.scoreFactors) {
      for (const factor1 of results1.scoreFactors) {
        const matchingFactor = results2.scoreFactors.find((f: any) => f.name === factor1.name);
        if (matchingFactor) {
          const scoreDiff = Math.abs(factor1.score - matchingFactor.score);
          factorSimilarity += Math.max(0, 25 - scoreDiff / 4);
        }
      }
      factorSimilarity = results1.scoreFactors.length > 0 ? 
        factorSimilarity / (results1.scoreFactors.length * 25) * 50 : 25;
    } else {
      factorSimilarity = 25;
    }
    
    contentSimilarityScore += factorSimilarity;
    
    // Calculate behavior similarity
    let behaviorSimilarityScore = 0;
    
    // Compare bot behavior indicators
    if (results1.botBehaviorIndicators && results2.botBehaviorIndicators) {
      let matchingIndicators = 0;
      for (const indicator1 of results1.botBehaviorIndicators) {
        if (results2.botBehaviorIndicators.some((i: any) => 
          i.isPositive === indicator1.isPositive && 
          i.text.toLowerCase().includes(indicator1.text.toLowerCase().substring(0, 10))
        )) {
          matchingIndicators++;
        }
      }
      
      const totalIndicators = results1.botBehaviorIndicators.length;
      behaviorSimilarityScore += totalIndicators > 0 ? 
        (matchingIndicators / totalIndicators) * 60 : 30;
    } else {
      behaviorSimilarityScore += 30;
    }
    
    // Compare account creation dates for behavior patterns
    const platformTimeFactor = 
      results1.platformName === results2.platformName ? 20 : 10;
    
    behaviorSimilarityScore += platformTimeFactor;
    
    // Timestamps of verifications (to detect coordinated verification attempts)
    let verificationTimeDiff = 1000; // Default to high value (low similarity)
    
    if (verification1.timestamp && verification2.timestamp) {
      verificationTimeDiff = Math.abs(
        verification1.timestamp.getTime() - 
        verification2.timestamp.getTime()
      ) / (1000 * 60); // In minutes
    }
    
    behaviorSimilarityScore += verificationTimeDiff < 60 ? 
      Math.max(0, 20 - verificationTimeDiff / 3) : 0;
    
    return {
      contentSimilarity: Math.min(100, Math.round(contentSimilarityScore)),
      behaviorSimilarity: Math.min(100, Math.round(behaviorSimilarityScore))
    };
  }
  
  private estimateCommonFollowers(followersCount: string | null | undefined, similarityPercentage: number): number {
    if (!followersCount) return 0;
    
    // Parse the followers count (handle K and M suffixes)
    let count = 0;
    if (followersCount.endsWith('K')) {
      count = parseFloat(followersCount.replace('K', '')) * 1000;
    } else if (followersCount.endsWith('M')) {
      count = parseFloat(followersCount.replace('M', '')) * 1000000;
    } else {
      count = parseInt(followersCount);
    }
    
    // Calculate estimated common followers based on similarity percentage
    return Math.round((count * similarityPercentage) / 100);
  }
  
  // Helper methods
  private extractUsername(url: string, platform: string): string {
    // Simple extraction for demo purposes
    if (url.includes('/')) {
      const segments = url.split('/');
      return '@' + segments[segments.length - 1].replace(/[?#].*$/, '');
    }
    return url.startsWith('@') ? url : '@' + url;
  }
  
  private generateAccountId(username: string, platform: string): string {
    // Generate a deterministic ID based on platform and username
    const normalizedUsername = username.replace('@', '').toLowerCase();
    return `${platform}-${normalizedUsername}`;
  }
  
  private getPlatformDisplayName(platform: string): string {
    const platformMap: Record<string, string> = {
      'twitter': 'Twitter',
      'instagram': 'Instagram',
      'facebook': 'Facebook',
      'tiktok': 'TikTok'
    };
    return platformMap[platform] || platform;
  }
  
  private generateScoreFactors(username: string, platform: string): ScoreFactor[] {
    // This is where the real magic would happen with actual analysis
    // For demo purposes, we'll generate somewhat realistic looking results
    
    const usernameLength = username.replace('@', '').length;
    
    // Generate more realistic score factors based on the username and platform
    const accountAgeScore = 50 + Math.floor(Math.random() * 50);
    const verifiedStatusScore = usernameLength > 5 ? 80 + Math.floor(Math.random() * 20) : 30 + Math.floor(Math.random() * 40);
    const postingPatternsScore = 40 + Math.floor(Math.random() * 60);
    const engagementRatioScore = 30 + Math.floor(Math.random() * 70);
    
    return [
      {
        name: "Account Age",
        score: accountAgeScore,
        description: accountAgeScore > 80 
          ? "Account exists for several years (Excellent)" 
          : accountAgeScore > 50 
            ? "Account created within last year (Good)" 
            : "Recently created account (Concerning)"
      },
      {
        name: "Verified Status",
        score: verifiedStatusScore,
        description: verifiedStatusScore > 80 
          ? "Officially verified account" 
          : verifiedStatusScore > 50 
            ? "Verification status unclear" 
            : "Not verified"
      },
      {
        name: "Posting Patterns",
        score: postingPatternsScore,
        description: postingPatternsScore > 80 
          ? "Natural posting frequency" 
          : postingPatternsScore > 50 
            ? "Somewhat irregular posting" 
            : "Unusual posting frequency"
      },
      {
        name: "Engagement Ratio",
        score: engagementRatioScore,
        description: engagementRatioScore > 80 
          ? "High follower interaction" 
          : engagementRatioScore > 50 
            ? "Moderate follower interaction" 
            : "Low follower engagement"
      }
    ];
  }
  
  private calculateHumanLikelihood(username: string, factors: ScoreFactor[]): number {
    // Calculate human likelihood based on score factors
    return Math.min(
      95,
      Math.max(
        5,
        Math.round(factors.reduce((acc, factor) => acc + factor.score, 0) / factors.length)
      )
    );
  }
  
  private generateBotBehaviorIndicators(username: string, humanLikelihood: number): BotBehaviorIndicator[] {
    // Generate bot behavior indicators based on human likelihood
    const indicators: BotBehaviorIndicator[] = [];
    
    if (humanLikelihood > 70) {
      indicators.push(
        { isPositive: true, text: "Natural language patterns in posts" },
        { isPositive: true, text: "Irregular posting schedule (human-like)" }
      );
      
      if (humanLikelihood < 90) {
        indicators.push({ isPositive: false, text: "High volume of posts in short time periods" });
      }
    } else {
      indicators.push(
        { isPositive: false, text: "Repetitive content patterns detected" },
        { isPositive: false, text: "Unusual posting times (possible automation)" },
        { isPositive: false, text: "Limited engagement with followers" }
      );
      
      if (humanLikelihood > 40) {
        indicators.push({ isPositive: true, text: "Some personalized responses to comments" });
      }
    }
    
    return indicators;
  }
  
  private generateCredibilitySuggestions(credibilityScore: number, factors: ScoreFactor[]): string[] {
    // Generate credibility suggestions based on score and factors
    const suggestions: string[] = [];
    
    if (credibilityScore > 80) {
      suggestions.push(
        "This account shows strong indicators of being authentic",
        "The account has established history and engagement patterns",
        "Always verify important information from any account through official channels"
      );
    } else if (credibilityScore > 50) {
      suggestions.push(
        "This account shows mixed credibility signals",
        "Exercise caution when interacting with this account",
        "Look for additional verification such as linked official websites",
        "Check if the account is followed by other verified accounts you trust"
      );
    } else {
      suggestions.push(
        "This account shows multiple suspicious patterns",
        "Avoid sharing personal information with this account",
        "Consider reporting this account if it's impersonating someone",
        "Be very cautious about any links or requests from this account"
      );
    }
    
    return suggestions;
  }
  
  private generateDisplayName(username: string): string {
    // Simple display name generation based on username
    const name = username.replace('@', '');
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
  
  private generateAccountCreationDate(): string {
    // Generate a random past date formatted as a string
    const now = new Date();
    const randomMonths = Math.floor(Math.random() * 36);  // Up to 3 years ago
    const creationDate = new Date(now.getFullYear(), now.getMonth() - randomMonths, Math.floor(Math.random() * 28) + 1);
    
    return creationDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  
  private generateFollowersCount(credibilityScore: number): string {
    // Generate followers count based on credibility score
    if (credibilityScore > 80) {
      const count = Math.floor(Math.random() * 900000) + 100000;
      return count > 1000000 ? `${(count / 1000000).toFixed(1)}M` : `${(count / 1000).toFixed(1)}K`;
    } else if (credibilityScore > 50) {
      const count = Math.floor(Math.random() * 90000) + 10000;
      return `${(count / 1000).toFixed(1)}K`;
    } else {
      const count = Math.floor(Math.random() * 9000) + 1000;
      return count.toString();
    }
  }
  
  private generateFollowingCount(): string {
    // Generate following count
    const count = Math.floor(Math.random() * 900) + 100;
    return count.toString();
  }
  
  private generateAccountBio(credibilityScore: number): string {
    // Generate a bio based on credibility score
    if (credibilityScore > 80) {
      return "Official account. For inquiries, please contact through official channels.";
    } else if (credibilityScore > 50) {
      return "Digital enthusiast sharing thoughts and experiences. Views are my own.";
    } else {
      return "Just here for the content! Follow for follow back!";
    }
  }
}

// Use the memory storage by default
export const storage = new MemStorage();
