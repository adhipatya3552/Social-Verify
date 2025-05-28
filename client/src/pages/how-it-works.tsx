import { Separator } from "@/components/ui/separator";

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero section */}
        <div className="py-12 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:flex-col sm:align-center">
              <h1 className="text-4xl font-extrabold text-primary text-center sm:text-5xl">
                How SocialVerify Works
              </h1>
              <p className="mt-5 text-xl text-slate-600 text-center max-w-3xl mx-auto">
                Our comprehensive methodology for verifying and analyzing social media accounts
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Process section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-primary">Our Verification Process</h2>
              <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
                SocialVerify uses advanced AI and machine learning algorithms to analyze social media accounts 
                across multiple dimensions and provide reliable verification results.
              </p>
            </div>

            <div className="mt-10">
              <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12 lg:space-y-0">
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <div className="ml-16 space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">Account Analysis</h3>
                    <p className="text-base text-slate-600">
                      We analyze profile information, creation date, post frequency, engagement metrics, 
                      and behavioral patterns to build a comprehensive profile.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <div className="ml-16 space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">Multi-Factor Scoring</h3>
                    <p className="text-base text-slate-600">
                      Our algorithm assigns weighted scores across multiple verification factors including 
                      account age, verified status, posting patterns, and engagement metrics.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <div className="ml-16 space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">Bot Detection</h3>
                    <p className="text-base text-slate-600">
                      We employ specialized machine learning models to identify automated behavior, 
                      unusual posting patterns, and other indicators of non-human accounts.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <span className="text-xl font-bold">4</span>
                  </div>
                  <div className="ml-16 space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">Credibility Assessment</h3>
                    <p className="text-base text-slate-600">
                      Based on all collected data points, we calculate a comprehensive credibility 
                      score that reflects the overall authenticity of the account.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <span className="text-xl font-bold">5</span>
                  </div>
                  <div className="ml-16 space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">Similarity Comparison</h3>
                    <p className="text-base text-slate-600">
                      For accounts being compared, we analyze content patterns, creation dates,
                      follower overlap, and behavioral similarities to detect connections.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <span className="text-xl font-bold">6</span>
                  </div>
                  <div className="ml-16 space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">Actionable Insights</h3>
                    <p className="text-base text-slate-600">
                      We provide specific recommendations and insights based on the verification 
                      results to help you make informed decisions about the account.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Technology section */}
        <div className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-primary">Our Technology</h2>
              <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
                SocialVerify leverages cutting-edge technologies to provide accurate and reliable results
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-12 w-12 mx-auto flex items-center justify-center rounded-md bg-blue-100 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-medium text-slate-900 text-center">Advanced NLP</h3>
                <p className="mt-2 text-base text-slate-600 text-center">
                  Natural Language Processing analyzes content patterns, sentiment, and language usage to identify suspicious accounts.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-12 w-12 mx-auto flex items-center justify-center rounded-md bg-green-100 text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-medium text-slate-900 text-center">Behavior Pattern Analysis</h3>
                <p className="mt-2 text-base text-slate-600 text-center">
                  Machine learning algorithms detect abnormal posting patterns, engagement ratios, and automated activities.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-12 w-12 mx-auto flex items-center justify-center rounded-md bg-purple-100 text-purple-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-medium text-slate-900 text-center">Network Analysis</h3>
                <p className="mt-2 text-base text-slate-600 text-center">
                  Our tools map connections between accounts to identify coordinated networks and shared behavior patterns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HowItWorksPage;