import { Link } from "wouter";

const HeroSection = () => {
  const scrollToVerify = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('verify')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section className="pt-10 pb-12 sm:pt-16 lg:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-4xl font-extrabold text-primary sm:text-5xl">
              <span className="block">Verify social media</span>
              <span className="block text-secondary">accounts instantly</span>
            </h1>
            <p className="mt-3 text-base text-slate-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Our advanced algorithm analyzes social media profiles to detect fake accounts, bots, and suspicious behavior. Protect yourself from scams and verify credibility in seconds.
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
                <a 
                  href="#verify" 
                  onClick={scrollToVerify}
                  className="block w-full sm:w-auto rounded-md px-5 py-3 bg-secondary text-base font-medium text-white shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-10 text-center"
                >
                  Start Verifying
                </a>
                <Link 
                  href="#how-it-works"
                  className="block w-full sm:w-auto mt-3 sm:mt-0 sm:ml-3 rounded-md px-5 py-3 bg-white text-base font-medium text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-10 border border-slate-300 text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-span-6">
            <div className="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden lg:h-full flex items-center justify-center p-8 shadow-lg">
              <svg
                className="w-full h-auto text-secondary"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="100" height="100" rx="20" fill="currentColor" fillOpacity="0.1" />
                <path 
                  d="M50 85C31.2 85 16 69.8 16 51C16 32.2 31.2 17 50 17C68.8 17 84 32.2 84 51C84 57 82 62.4 79 67"
                  stroke="currentColor" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                />
                <path 
                  d="M79 34L50 63L38 51" 
                  stroke="currentColor" 
                  strokeWidth="5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M35 45C33.3431 45 32 46.3431 32 48V72C32 73.6569 33.3431 75 35 75H65C66.6569 75 68 73.6569 68 72V48C68 46.3431 66.6569 45 65 45H52M35 45H52M52 45L46 38L40 45" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M42 55L44 58L50 52" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M42 65L44 68L50 62" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <line 
                  x1="56" 
                  y1="57" 
                  x2="63" 
                  y2="57" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
                <line 
                  x1="56" 
                  y1="67" 
                  x2="63" 
                  y2="67" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
