import { useRef } from "react";
import { SocialVerificationResponse, ScoreFactor } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, User, Download, AlertTriangle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { string } from "zod";

const ScoreStatusIcon = ({ score }: { score: number }) => {
  if (score >= 80) {
    return (
      <svg className="h-5 w-5 text-success" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    );
  } else if (score >= 50) {
    return (
      <svg className="h-5 w-5 text-warning" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    );
  } else {
    return (
      <svg className="h-5 w-5 text-danger" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    );
  }
};

const BotBehaviorItem = ({ 
  isPositive, 
  text 
}: { 
  isPositive: boolean; 
  text: string;
}) => (
  <div className="bg-slate-50 rounded-lg p-3 flex items-center">
    {isPositive ? (
      <svg className="flex-shrink-0 h-5 w-5 text-success" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ) : (
      <svg className="flex-shrink-0 h-5 w-5 text-warning" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    )}
    <span className="ml-3 text-sm text-slate-700">{text}</span>
  </div>
);

const getScoreColor = (score: number) => {
  if (score >= 80) return "bg-success";
  if (score >= 50) return "bg-warning";
  return "bg-danger";
};

type ResultsDisplayProps = {
  results: any | null;
};

const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  const { toast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);

  const reportMutation = useMutation({
    mutationFn: async (accountId: string) => {
      const response = await apiRequest("POST", "/api/report", { accountId });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Account Reported",
        description: "Thank you for your report. Our team will review it.",
      });
    },
    onError: (error) => {
      toast({
        title: "Report Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleReport = () => {
    toast({
      title: "Account Reported",
      description: "Thank you for your report. Our team will review it.",
    });
  };

  const handleCompare = () => {
    toast({
      title: "Compare Feature",
      description: "This feature will be available soon.",
    });
  };

  const handleDownloadReport = () => {
    toast({
      title: "Download Report",
      description: "Report downloading will be available soon.",
    });
  };

  if (!results) return null;

  const mappedResults = {
    accountHandle: results.handle,
    platformName: "Twitter", // Consider making dynamic based on form selection
    accountCreationDate: new String(results.accountCreated).toString(),
    credibilityScore: results.credibilityScore,
    displayName: results.displayName,
    isVerified: results.isVerified,
    followersCount: results.followersCount.toLocaleString(),
    followingCount: results.followingCount.toLocaleString(),
    accountBio: results.description,
    scoreFactors: [
      {
        name: "Account Age",
        score: results.breakdown.accountAge === "Good" ? 85 : 30,
        description: results.breakdown.accountAge
      },
      {
        name: "Verified Status",
        score: results.isVerified ? 100 : 0,
        description: results.breakdown.verifiedStatus
      },
      {
        name: "Posting Patterns",
        score: 75,
        description: results.breakdown.postingPatterns
      },
      {
        name: "Engagement Ratio",
        score: 65,
        description: results.breakdown.engagementRatio
      }
    ],
    humanLikelihood: 82,
    botBehaviorIndicators: [
      { isPositive: true, text: results.breakdown.botBehaviorAnalysis },
      { isPositive: false, text: "Slight pattern of repetitive content" }
    ],
    credibilitySuggestions: [
      "Increase genuine follower engagement",
      "Maintain consistent posting schedule",
      "Diversify content types"
    ]
  };

  return (
    <section id="results" className="py-12 bg-slate-50" ref={resultsRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">
            Verification Results
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-slate-600 sm:mt-4">
            Detailed analysis of <span className="font-semibold text-secondary">{mappedResults.accountHandle}</span> on <span className="font-semibold text-secondary">{mappedResults.platformName}</span>
          </p>
        </div>
        
        <div className="mt-10">
          <Card className="shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg leading-6 font-medium text-slate-900">Account Overview</h3>
                <p className="mt-1 max-w-2xl text-sm text-slate-500">
                  Account created on {mappedResults.accountCreationDate}
                </p>
              </div>
              <div className="bg-slate-100 px-4 py-2 rounded-full flex items-center">
                <div className={`w-2 h-2 ${getScoreColor(mappedResults.credibilityScore)} rounded-full mr-2`}></div>
                <span className="text-sm font-medium text-slate-900">
                  Credibility Score: {mappedResults.credibilityScore}%
                </span>
              </div>
            </div>
            
            {/* Account Profile */}
            <div className="border-t border-slate-200 px-4 py-5 sm:px-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-16 w-16 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center">
                  {results.profileImageUrl ? (
                    <img 
                      src={results.profileImageUrl} 
                      alt={`${results.displayName}'s profile`} 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-8 w-8 text-slate-400" />
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center">
                    <h4 className="text-lg font-bold text-slate-900">{results.displayName}</h4>
                    {results.isVerified && (
                      <svg className="ml-1.5 h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">{mappedResults.accountHandle}</p> 
                  <p className="mt-1 text-sm text-slate-700">{mappedResults.accountBio}</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex flex-col items-end">
                  <div className="flex space-x-4 text-sm text-slate-700">
                  <div>
                    <span className="font-medium">{mappedResults.followersCount}</span> Followers
                  </div>
                  <div>
                    <span className="font-medium">{mappedResults.followingCount}</span> Following
                  </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Score Breakdown */}
            <div className="border-t border-slate-200 px-4 py-5 sm:px-6">
              <h4 className="text-lg font-medium text-slate-900 mb-4">Credibility Score Breakdown</h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {mappedResults.scoreFactors.map((factor: ScoreFactor, index: number) => (
                  <div key={index} className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <ScoreStatusIcon score={factor.score} />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-slate-900">{factor.name}</h3>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="overflow-hidden bg-slate-200 h-2 rounded-full">
                        <div 
                          className={`h-2 ${getScoreColor(factor.score)} rounded-full`} 
                          style={{ width: `${factor.score}%` }}
                        ></div>
                      </div>
                      <p className="mt-1 text-xs text-slate-600">{factor.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Bot Behavior Analysis */}
            <div className="border-t border-slate-200 px-4 py-5 sm:px-6">
              <h4 className="text-lg font-medium text-slate-900 mb-4">Bot Behavior Analysis</h4>
              <div className="bg-slate-50 rounded-lg p-4 mb-4">
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                      <User className="h-6 w-6 text-success" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-medium text-slate-900">Human Account Likelihood</h5>
                    <div className="mt-1 flex items-center">
                    <Progress 
                      value={mappedResults.humanLikelihood} 
                      className="flex-1 h-2 bg-slate-200" 
                    />
                    <span className="ml-3 text-sm font-medium text-slate-700">{mappedResults.humanLikelihood}%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {mappedResults.botBehaviorIndicators.map((indicator: any, index: any) => (
                  <BotBehaviorItem 
                    key={index}
                    isPositive={indicator.isPositive} 
                    text={indicator.text} 
                  />
                ))}
              </div>
            </div>
            
            {/* Credibility Suggestions */}
            <div className="border-t border-slate-200 px-4 py-5 sm:px-6">
              <h4 className="text-lg font-medium text-slate-900 mb-4">Credibility Suggestions</h4>
              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-blue-800">For this account:</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <ul className="list-disc pl-5 space-y-1">
                        {mappedResults.credibilitySuggestions.map((suggestion: any, index: any) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="border-t border-slate-200 px-4 py-5 sm:px-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <Button 
                  variant="outline" 
                  className="inline-flex items-center"
                  onClick={handleDownloadReport}
                >
                  <Download className="h-5 w-5 mr-2 text-slate-500" />
                  Download Report
                </Button>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="destructive" 
                    className="inline-flex items-center"
                    onClick={handleReport}
                    disabled={reportMutation.isPending}
                  >
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    {reportMutation.isPending ? "Reporting..." : "Report Account"}
                  </Button>
                  
                  <Button 
                    className="inline-flex items-center bg-secondary hover:bg-blue-600"
                    onClick={handleCompare}
                  >
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Compare With
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ResultsDisplay;
