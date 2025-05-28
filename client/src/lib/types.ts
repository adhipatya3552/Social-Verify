export interface SocialVerificationRequest {
  profileUrl: string;
  platform: string;
}

export interface ScoreFactor {
  name: string;
  score: number;
  description: string;
}

export interface BotBehaviorIndicator {
  isPositive: boolean;
  text: string;
}

export interface SocialVerificationResponse {
  accountCreated: string;
  handle: string;
  displayName: string;
  platformName: string;
  description: string;
  accountCreationDate: string;
  credibilityScore: number;
  isVerified: boolean;
  followersCount: number;
  followingCount: number;
  accountBio: string;
  profileImageUrl: string | null;
  scoreFactors: ScoreFactor[];
  humanLikelihood: number;
  botBehaviorIndicators: BotBehaviorIndicator[];
  credibilitySuggestions: string[];
}

export interface AccountComparisonData {
  accountId: string;
  similarityScore: number;
  commonFollowers: number;
  creationDateProximity: number;
  contentSimilarity: number;
  behaviorPatternSimilarity: number;
}

export interface ComparisonResult {
  accounts: AccountComparisonData[];
  overallSimilarity: number;
  possibleConnection: boolean;
}
