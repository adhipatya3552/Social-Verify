import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ApiPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero section */}
        <div className="py-12 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:flex-col sm:align-center">
              <h1 className="text-4xl font-extrabold text-primary text-center sm:text-5xl">
                API Documentation
              </h1>
              <p className="mt-5 text-xl text-slate-600 text-center max-w-3xl mx-auto">
                Integrate SocialVerify's powerful account verification tools into your own applications
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* API Overview */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-4">
                <h2 className="text-2xl font-extrabold text-primary">API Overview</h2>
                <p className="mt-4 text-base text-slate-600">
                  Our RESTful API provides programmatic access to SocialVerify's account verification
                  and comparison capabilities. Use our API to integrate social media account verification
                  into your applications, websites, or services.
                </p>
                <div className="mt-6">
                  <a
                    href="#"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90"
                  >
                    Get API Key
                  </a>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 lg:col-span-8">
                <div className="bg-slate-50 p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-slate-900">Base URL</h3>
                  <div className="mt-2 p-3 bg-gray-800 rounded-md">
                    <code className="text-sm text-gray-200">https://api.socialverify.com/v1</code>
                  </div>
                  
                  <h3 className="mt-6 text-lg font-medium text-slate-900">Authentication</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    All API requests require an API key that should be included in the header:
                  </p>
                  <div className="mt-2 p-3 bg-gray-800 rounded-md">
                    <code className="text-sm text-gray-200">X-API-Key: your_api_key_here</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-primary text-center">API Endpoints</h2>
            <p className="mt-4 text-lg text-slate-600 text-center max-w-3xl mx-auto mb-12">
              Explore our available endpoints and learn how to integrate SocialVerify with your applications
            </p>
            
            <Tabs defaultValue="verify" className="max-w-5xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="verify">Verify Account</TabsTrigger>
                <TabsTrigger value="compare">Compare Accounts</TabsTrigger>
                <TabsTrigger value="report">Report Account</TabsTrigger>
              </TabsList>
              
              <TabsContent value="verify" className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">Verify Social Media Account</h3>
                <p className="mt-2 text-slate-600">
                  Analyze a single social media account and get detailed verification results.
                </p>
                
                <div className="mt-4">
                  <div className="flex items-center space-x-2 text-sm font-medium text-slate-800">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">POST</span>
                    <span>/verify</span>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-md font-medium text-slate-900">Request Body</h4>
                    <div className="mt-2 p-3 bg-gray-800 rounded-md">
                      <pre className="text-sm text-gray-200 whitespace-pre-wrap">
{`{
  "profileUrl": "@username or full URL",
  "platform": "twitter|instagram|facebook|tiktok"
}`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-md font-medium text-slate-900">Response</h4>
                    <div className="mt-2 p-3 bg-gray-800 rounded-md">
                      <pre className="text-sm text-gray-200 whitespace-pre-wrap overflow-auto" style={{ maxHeight: '300px' }}>
{`{
  "accountId": "twitter-username",
  "accountHandle": "@username",
  "displayName": "Display Name",
  "platformName": "Twitter",
  "accountCreationDate": "January 1, 2020",
  "credibilityScore": 85,
  "isVerified": true,
  "followersCount": "12.5K",
  "followingCount": "245",
  "accountBio": "Account bio text",
  "profileImageUrl": "https://...",
  "scoreFactors": [
    {
      "name": "Account Age",
      "score": 90,
      "description": "Account exists for several years (Excellent)"
    },
    // Additional score factors
  ],
  "humanLikelihood": 92,
  "botBehaviorIndicators": [
    {
      "isPositive": true,
      "text": "Natural language patterns in posts"
    },
    // Additional indicators
  ],
  "credibilitySuggestions": [
    "This account shows strong indicators of being authentic",
    // Additional suggestions
  ]
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="compare" className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">Compare Social Media Accounts</h3>
                <p className="mt-2 text-slate-600">
                  Compare multiple social media accounts to analyze similarities and potential connections.
                </p>
                
                <div className="mt-4">
                  <div className="flex items-center space-x-2 text-sm font-medium text-slate-800">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">POST</span>
                    <span>/compare</span>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-md font-medium text-slate-900">Request Body</h4>
                    <div className="mt-2 p-3 bg-gray-800 rounded-md">
                      <pre className="text-sm text-gray-200 whitespace-pre-wrap">
{`{
  "accountIds": [
    "twitter-username1",
    "instagram-username2",
    // Additional account IDs
  ]
}`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-md font-medium text-slate-900">Response</h4>
                    <div className="mt-2 p-3 bg-gray-800 rounded-md">
                      <pre className="text-sm text-gray-200 whitespace-pre-wrap overflow-auto" style={{ maxHeight: '300px' }}>
{`{
  "accounts": [
    {
      "accountId": "twitter-username1",
      "similarityScore": 72,
      "commonFollowers": 856,
      "creationDateProximity": 85,
      "contentSimilarity": 68,
      "behaviorPatternSimilarity": 75
    },
    // Additional account data
  ],
  "overallSimilarity": 75,
  "possibleConnection": true
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="report" className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">Report Account</h3>
                <p className="mt-2 text-slate-600">
                  Submit a report for a suspicious social media account.
                </p>
                
                <div className="mt-4">
                  <div className="flex items-center space-x-2 text-sm font-medium text-slate-800">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">POST</span>
                    <span>/report</span>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-md font-medium text-slate-900">Request Body</h4>
                    <div className="mt-2 p-3 bg-gray-800 rounded-md">
                      <pre className="text-sm text-gray-200 whitespace-pre-wrap">
{`{
  "accountId": "twitter-username",
  "reason": "Optional reason for reporting the account"
}`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-md font-medium text-slate-900">Response</h4>
                    <div className="mt-2 p-3 bg-gray-800 rounded-md">
                      <pre className="text-sm text-gray-200 whitespace-pre-wrap">
{`{
  "success": true,
  "message": "Report submitted successfully",
  "reportId": "12345"
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApiPage;