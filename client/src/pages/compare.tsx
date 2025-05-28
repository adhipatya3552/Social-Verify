import { useState } from "react";
import { ComparisonResult } from "@/lib/types";
import ComparisonForm from "@/components/comparison/comparison-form";
import ComparisonResults from "@/components/comparison/comparison-results";
import { Separator } from "@/components/ui/separator";

const ComparePage = () => {
  const [comparisonResults, setComparisonResults] = useState<ComparisonResult | null>(null);

  const handleComparisonResults = (results: ComparisonResult) => {
    setComparisonResults(results);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="py-12 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:flex-col sm:align-center">
              <h1 className="text-4xl font-extrabold text-primary text-center sm:text-5xl">
                Account Comparison Tool
              </h1>
              <p className="mt-5 text-xl text-slate-600 text-center max-w-3xl mx-auto">
                Compare multiple social media accounts to analyze similarities and detect coordinated activity or connected fake accounts.
              </p>
            </div>
          </div>
        </div>

        <Separator />
        
        <ComparisonForm onComparisonResults={handleComparisonResults} />
        
        {comparisonResults && <ComparisonResults results={comparisonResults} />}
      </main>
    </div>
  );
};

export default ComparePage;