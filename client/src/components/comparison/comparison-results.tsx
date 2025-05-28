import { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { ComparisonResult, AccountComparisonData } from "@/lib/types";

interface ComparisonResultsProps {
  results: ComparisonResult | null;
}

const ComparisonResults = ({ results }: ComparisonResultsProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to results when they're available
    if (results && chartRef.current) {
      chartRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [results]);

  if (!results) {
    return null;
  }

  // Format comparison data for the radar chart
  const formatComparisonDataForRadarChart = (account: AccountComparisonData) => {
    return [
      {
        subject: "Similarity Score",
        A: account.similarityScore,
        fullMark: 100,
      },
      {
        subject: "Common Followers",
        A: normalizeValue(account.commonFollowers, 0, 1000, 0, 100),
        fullMark: 100,
      },
      {
        subject: "Creation Date Proximity",
        A: account.creationDateProximity,
        fullMark: 100,
      },
      {
        subject: "Content Similarity",
        A: account.contentSimilarity,
        fullMark: 100,
      },
      {
        subject: "Behavior Pattern",
        A: account.behaviorPatternSimilarity,
        fullMark: 100,
      },
    ];
  };

  // Normalize values to a 0-100 scale for the radar chart
  const normalizeValue = (
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
  ) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };

  return (
    <div ref={chartRef} className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">
            Account Comparison Results
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-slate-600">
            Analysis of similarities and potential connections between accounts
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Overall Similarity</span>
              <Badge 
                variant={results.possibleConnection ? "destructive" : "outline"}
              >
                {results.possibleConnection ? "Possible Connection Detected" : "No Strong Connection"}
              </Badge>
            </CardTitle>
            <CardDescription>
              The overall similarity score between all accounts analyzed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex justify-between items-center">
              <span className="text-sm font-medium text-slate-700">
                Similarity: {results.overallSimilarity}&#37;
              </span>
              <span className="text-sm text-slate-500">
                {results.overallSimilarity < 30 
                  ? "Low Similarity" 
                  : results.overallSimilarity < 70 
                    ? "Moderate Similarity" 
                    : "High Similarity"}
              </span>
            </div>
            <Progress 
              value={results.overallSimilarity} 
              className={`h-2 ${
                results.overallSimilarity > 70 
                  ? "bg-red-500" 
                  : results.overallSimilarity > 30 
                    ? "bg-orange-500" 
                    : "bg-green-500"
              }`}
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {results.accounts.map((account) => (
            <Card key={account.accountId}>
              <CardHeader>
                <CardTitle>
                  Account: {account.accountId.split('-')[1]}
                </CardTitle>
                <CardDescription>
                  Platform: {account.accountId.split('-')[0].charAt(0).toUpperCase() + account.accountId.split('-')[0].slice(1)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="mb-2 flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">
                      Similarity Score: {account.similarityScore}&#37;
                    </span>
                  </div>
                  <Progress 
                    value={account.similarityScore} 
                    className={`h-2 ${
                      account.similarityScore > 70 
                        ? "bg-red-500" 
                        : account.similarityScore > 30 
                          ? "bg-orange-500" 
                          : "bg-green-500"
                    }`}
                  />
                </div>

                <div className="h-72 mt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart 
                      outerRadius={90} 
                      data={formatComparisonDataForRadarChart(account)}
                    >
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis />
                      <Tooltip />
                      <Radar
                        name="Similarity Metrics"
                        dataKey="A"
                        stroke="#6366f1"
                        fill="#6366f1"
                        fillOpacity={0.6}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="text-sm">
                    <span className="font-medium text-slate-700">Common Followers:</span>{" "}
                    <span className="text-slate-600">{account.commonFollowers}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-slate-700">Date Proximity:</span>{" "}
                    <span className="text-slate-600">{account.creationDateProximity}&#37;</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-slate-700">Content Similarity:</span>{" "}
                    <span className="text-slate-600">{account.contentSimilarity}&#37;</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-slate-700">Behavior Similarity:</span>{" "}
                    <span className="text-slate-600">{account.behaviorPatternSimilarity}&#37;</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">Understanding the Results</h3>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Overall Similarity</strong>: Measures the collective similarity between all accounts analyzed. Scores above 70&#37; suggest potential coordination or related ownership.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Common Followers</strong>: The number of shared followers between accounts, suggesting relationship or targeting similar audiences.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Creation Date Proximity</strong>: How close the accounts were created to each other. Accounts created within days of each other may suggest coordinated creation.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Content Similarity</strong>: How similar the content, hashtags, and topics are across accounts. High similarity suggests coordinated messaging.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Behavior Pattern Similarity</strong>: Analysis of posting times, frequency, and interaction patterns. Similar behavior may indicate automation or coordination.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ComparisonResults;