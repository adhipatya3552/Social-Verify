import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { X } from "lucide-react";
import { SocialPlatform } from "@shared/schema";

const MOCK_COMPARISON_DATA = {
  overallSimilarity: 75,
  possibleConnection: true,
  accounts: [
    {
      accountId: "twitter-shahrukhkhan",
      similarityScore: 82,
      commonFollowers: 245,
      creationDateProximity: 90,
      contentSimilarity: 78,
      behaviorPatternSimilarity: 85
    },
    {
      accountId: "twitter-tech_news_daily",
      similarityScore: 68,
      commonFollowers: 89,
      creationDateProximity: 45,
      contentSimilarity: 62,
      behaviorPatternSimilarity: 55
    },
    {
      accountId: "twitter-crypto_updates_247",
      similarityScore: 80,  
      commonFollowers: 220,
      creationDateProximity: 85,
      contentSimilarity: 75, 
      behaviorPatternSimilarity: 80 
    }
  ]
};

const comparisonFormSchema = z.object({
  accountId: z.string().min(1, {
    message: "Account ID cannot be empty",
  }),
});

type AccountEntry = {
  id: string;
  profileUrl: string;
  platform: string;
};

type ComparisonFormProps = {
  onComparisonResults: (results: any) => void;
};

const ComparisonForm = ({ onComparisonResults }: ComparisonFormProps) => {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<AccountEntry[]>([]);
  const [currentPlatform, setCurrentPlatform] = useState<string>("twitter");
  
  const form = useForm<z.infer<typeof comparisonFormSchema>>({
    resolver: zodResolver(comparisonFormSchema),
    defaultValues: {
      accountId: "",
    },
  });

  const compareAccountsMutation = useMutation({
    mutationFn: async (accountIds: string[]) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await apiRequest("POST", "/api/compare", { accountIds });
      return response.json();
      
      
    },
    onSuccess: (data) => {
      onComparisonResults(data);
      toast({
        title: "Comparison completed",
        description: "Account similarity analysis is ready.",
      });
    },
    onError: (error) => {
      toast({
        title: "Comparison Failed",
        description: error instanceof Error ? error.message : "Please verify accounts first and then try again.",
        variant: "destructive",
      });
    },
  });

  const addAccount = (values: z.infer<typeof comparisonFormSchema>) => {
    // First verify if the account exists (TODO: add API to check existing accounts)
    // For now we'll just add it to the list
    const accountId = values.accountId.trim();
    const profileUrl = accountId.startsWith('@') ? accountId : `@${accountId}`;
    
    // Check if account is already in the list
    if (accounts.some(account => account.profileUrl === profileUrl && account.platform === currentPlatform)) {
      toast({
        title: "Duplicate Account",
        description: "This account is already in the comparison list.",
        variant: "destructive",
      });
      return;
    }
    
    // Add account to the list
    const newAccount: AccountEntry = {
      id: `${Date.now()}`,
      profileUrl,
      platform: currentPlatform,
    };
    
    setAccounts([...accounts, newAccount]);
    form.reset();
  };
  
  const removeAccount = (id: string) => {
    setAccounts(accounts.filter(account => account.id !== id));
  };
  
  const handleCompare = () => {
    if (accounts.length < 2) {
      toast({
        title: "Not enough accounts",
        description: "You need at least 2 accounts to compare.",
        variant: "destructive",
      });
      return;
    }
    
    // Generate consistent accountIds for comparison
    const accountIds = accounts.map(account => {
      const normalizedUsername = account.profileUrl.replace('@', '').toLowerCase();
      return `${account.platform}-${normalizedUsername}`;
    });
    
    // Return mock data matching the account IDs
    const mockComparisonData = {
      ...MOCK_COMPARISON_DATA,
      accounts: MOCK_COMPARISON_DATA.accounts.filter(acc => 
        accountIds.includes(acc.accountId)
      ),
    };
    
    onComparisonResults(mockComparisonData);
    toast({
      title: "Comparison completed",
      description: "Account similarity analysis is ready.",
    });
  };
  
  const getPlatformDisplayName = (platform: string): string => {
    const platformMap: Record<string, string> = {
      [SocialPlatform.TWITTER]: 'Twitter',
      [SocialPlatform.INSTAGRAM]: 'Instagram',
      [SocialPlatform.FACEBOOK]: 'Facebook',
      [SocialPlatform.TIKTOK]: 'TikTok'
    };
    return platformMap[platform] || platform;
  };

  return (
    <section id="compare" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">
            Compare Multiple Accounts
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-slate-600 sm:mt-4">
            Analyze similarities between accounts to detect coordinated activity or related fake accounts.
          </p>
        </div>
        
        <div className="mt-10 max-w-xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(addAccount)} className="space-y-6">
              <div className="flex flex-wrap -mx-2">
                <div className="px-2 w-full md:w-4/5">
                  <FormField
                    control={form.control}
                    name="accountId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-slate-700">Username or Account ID</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="@username" 
                            className="focus:ring-secondary focus:border-secondary block w-full p-3 border-slate-300 rounded-md"
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="px-2 w-full md:w-1/5 mt-6">
                  <FormLabel className="block text-sm font-medium text-slate-700">Platform</FormLabel>
                  <Select
                    value={currentPlatform}
                    onValueChange={setCurrentPlatform}
                  >
                    <SelectTrigger className="w-full focus:outline-none focus:ring-secondary focus:border-secondary border-slate-300">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={SocialPlatform.TWITTER}>Twitter</SelectItem>
                      <SelectItem value={SocialPlatform.INSTAGRAM}>Instagram</SelectItem>
                      <SelectItem value={SocialPlatform.FACEBOOK}>Facebook</SelectItem>
                      <SelectItem value={SocialPlatform.TIKTOK}>TikTok</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-secondary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Account
                </Button>
              </div>
            </form>
          </Form>
          
          {/* Account list */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Accounts to Compare</h3>
            {accounts.length === 0 ? (
              <div className="text-center py-6 bg-slate-50 rounded-lg">
                <p className="text-slate-500">Add at least two accounts to compare</p>
              </div>
            ) : (
              <div className="space-y-3">
                {accounts.map(account => (
                  <div 
                    key={account.id} 
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                  >
                    <div>
                      <span className="font-medium text-slate-900">{account.profileUrl}</span>
                      <span className="ml-2 text-sm text-slate-500">({getPlatformDisplayName(account.platform)})</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeAccount(account.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-6">
              <Button
                onClick={handleCompare}
                disabled={accounts.length < 2 || compareAccountsMutation.isPending}
                className="w-full py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              >
                {compareAccountsMutation.isPending ? "Comparing..." : "Compare Accounts"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonForm;
