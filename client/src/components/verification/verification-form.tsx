import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
// import { apiRequest } from "@/lib/queryClient";
// import { useMutation } from "@tanstack/react-query";
import { /*SocialVerificationRequest,*/ SocialVerificationResponse } from "@/lib/types";

const formSchema = z.object({
  profileUrl: z.string().min(2, {
    message: "Username or profile URL must be at least 2 characters.",
  }),
  platform: z.enum(["twitter", "instagram", "facebook", "tiktok"]),
});

type VerificationFormProps = {
  onResultsReceived: (results: SocialVerificationResponse) => void;
};

// ScoreFactor interface definition
export interface ScoreFactor {
  name: string;
  score: number;
  description: string;
}

// Enhanced mock data as an array with three accounts
export const MOCK_DATA_ARRAY = [
  {
    accountCreated: "9th September 2023",
    handle: "@shahrukhkhan",
    displayName: "Shahrukhkhan",
    description: "Digital enthusiast sharing thoughts and experiences. Views are my own.",
    credibilityScore: 78,
    followersCount: 91200,
    followingCount: 791,
    isVerified: true,
    humanLikelihood: 85,
    scoreFactors: [
      {
        name: "Account Age",
        score: 85,
        description: "Account has been active for over 1 year"
      },
      {
        name: "Verified Status",
        score: 100,
        description: "Officially verified account"
      },
      {
        name: "Posting Patterns",
        score: 75,
        description: "Natural posting frequency"
      },
      {
        name: "Engagement Ratio",
        score: 65,
        description: "Moderate follower interaction"
      }
    ],
    breakdown: {
      accountAge: "Good",
      verifiedStatus: "Officially verified account",
      postingPatterns: "Natural posting frequency",
      engagementRatio: "Moderate follower interaction",
      botBehaviorAnalysis: "Natural language patterns in posts"
    },
    botBehaviorIndicators: [
      { isPositive: true, text: "Natural language patterns in posts" },
      { isPositive: false, text: "Slight pattern of repetitive content" }
    ],
    credibilitySuggestions: [
      "Increase genuine follower engagement",
      "Maintain consistent posting schedule",
      "Diversify content types"
    ]
  },
  {
    accountCreated: "15th January 2024",
    handle: "@tech_news_daily",
    displayName: "Tech News Daily",
    description: "Breaking tech news and analysis. Covering the latest innovations and industry trends.",
    credibilityScore: 92,
    followersCount: 245000,
    followingCount: 532,
    isVerified: true,
    humanLikelihood: 95,
    scoreFactors: [
      {
        name: "Account Age",
        score: 70,
        description: "Account is relatively new but with consistent history"
      },
      {
        name: "Verified Status",
        score: 100,
        description: "Officially verified news source"
      },
      {
        name: "Posting Patterns",
        score: 95,
        description: "Professional publishing schedule"
      },
      {
        name: "Engagement Ratio",
        score: 90,
        description: "High quality engagement with followers"
      }
    ],
    breakdown: {
      accountAge: "Moderate",
      verifiedStatus: "Officially verified news source",
      postingPatterns: "Professional publishing schedule",
      engagementRatio: "High quality engagement with followers",
      botBehaviorAnalysis: "Content shows editorial oversight and curation"
    },
    botBehaviorIndicators: [
      { isPositive: true, text: "Content shows editorial oversight and curation" },
      { isPositive: true, text: "Responds to user comments with natural language" }
    ],
    credibilitySuggestions: [
      "Continue building account history",
      "Maintain high-quality source attribution",
      "Consider expanding content diversity"
    ]
  },
  {
    accountCreated: "22nd April 2022",
    handle: "@crypto_updates_247",
    displayName: "Crypto Updates 24/7",
    description: "Following all crypto trends and market movements. Not financial advice.",
    credibilityScore: 45,
    followersCount: 28700,
    followingCount: 15200,
    isVerified: false,
    humanLikelihood: 32,
    scoreFactors: [
      {
        name: "Account Age",
        score: 80,
        description: "Account has been active for over 2 years"
      },
      {
        name: "Verified Status",
        score: 0,
        description: "Not a verified account"
      },
      {
        name: "Posting Patterns",
        score: 30,
        description: "Unusually high posting frequency at odd hours"
      },
      {
        name: "Engagement Ratio",
        score: 40,
        description: "Low engagement despite high follower count"
      }
    ],
    breakdown: {
      accountAge: "Good",
      verifiedStatus: "Not a verified account",
      postingPatterns: "Unusually high posting frequency at odd hours",
      engagementRatio: "Low engagement despite high follower count",
      botBehaviorAnalysis: "Shows signs of automated content generation"
    },
    botBehaviorIndicators: [
      { isPositive: false, text: "Shows signs of automated content generation" },
      { isPositive: false, text: "Posts at consistent intervals regardless of time of day" },
      { isPositive: false, text: "Repetitive promotional content" }
    ],
    credibilitySuggestions: [
      "Reduce automated posting behavior",
      "Engage more authentically with followers",
      "Create more original content",
      "Consider verification options"
    ]
  }
];

const VerificationForm = ({ onResultsReceived }: VerificationFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileUrl: "",
      platform: "twitter",
    },
  });


  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Get the username/handle from the input
    let handle = values.profileUrl.trim();
    
    // Strip @ symbol if present
    if (handle.startsWith('@')) {
      handle = handle.substring(1);
    }
    
    // Strip URL prefix if present
    if (handle.includes('/')) {
      handle = handle.split('/').pop() || handle;
    }
    
    // Find matching account in mock data or use a random one
    let matchedAccount = MOCK_DATA_ARRAY.find(account => {
      // Normalize both input and mock handle for comparison
      const inputHandle = handle.replace(/^@/, '').toLowerCase();
      const mockHandle = account.handle.replace(/^@/, '').toLowerCase();
      return inputHandle === mockHandle;
    });
    
    if (!matchedAccount) {
      // Use a random account if no match found
      const randomIndex = Math.floor(Math.random() * MOCK_DATA_ARRAY.length);
      matchedAccount = MOCK_DATA_ARRAY[randomIndex];
      
      // Add slight randomization to make it feel dynamic
      matchedAccount = {
        ...matchedAccount,
        credibilityScore: Math.max(1, Math.min(100, matchedAccount.credibilityScore + Math.floor(Math.random() * 11) - 5)),
        followersCount: matchedAccount.followersCount + Math.floor(Math.random() * 1000),
        followingCount: matchedAccount.followingCount + Math.floor(Math.random() * 50),
        humanLikelihood: Math.max(1, Math.min(100, matchedAccount.humanLikelihood + Math.floor(Math.random() * 11) - 5))
      };
    }
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      onResultsReceived(matchedAccount as any);
      
      toast({
        title: "Verification Complete",
        description: `Analysis of ${matchedAccount.handle} finished successfully.`,
      });
    }, 1500);
  }


  return (
<section id="verify" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">
            Verify Any Social Media Account
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-slate-600 sm:mt-4">
            Enter a username or profile URL to check if it's real or potentially fake.
          </p>
        </div>
        
        <div className="mt-10 max-w-xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-wrap -mx-2">
                <div className="px-2 w-full md:w-4/5">
                  <FormField
                    control={form.control}
                    name="profileUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-slate-700">Username or Profile URL</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="@username or https://..." 
                            className="focus:ring-secondary focus:border-secondary block w-full p-3 border-slate-300 rounded-md"
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="px-2 w-full md:w-1/5 mt-6">
                  <FormField
                    control={form.control}
                    name="platform"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-slate-700">Platform</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full focus:outline-none focus:ring-secondary focus:border-secondary border-slate-300">
                              <SelectValue placeholder="Select platform" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="twitter">Twitter</SelectItem>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="tiktok">TikTok</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-secondary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Verifying..." : "Verify Account"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default VerificationForm;
