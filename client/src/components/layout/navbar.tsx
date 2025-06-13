import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";

const Navbar = () => {
  const [location] = useLocation();
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <svg className="h-8 w-8 text-secondary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="6" fill="currentColor" fillOpacity="0.1" />
                <path d="M19 8L12 15L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 13.5 20.5 15 19.5 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8 10C7.44772 10 7 10.4477 7 11V17C7 17.5523 7.44772 18 8 18H16C16.5523 18 17 17.5523 17 17V11C17 10.4477 16.5523 10 16 10H13.5M8 10H13.5M13.5 10L12 8.5L10.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="ml-2 text-xl font-bold text-primary">SocialVerify</span>
            </Link>
            <nav className="ml-8 flex space-x-8">
              <Link href="/" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${location === '/' ? 'border-secondary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
                Home
              </Link>
              <Link href="/compare" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${location === '/compare' ? 'border-secondary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
                Compare Accounts
              </Link>
              <Link href="/how-it-works" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${location === '/how-it-works' ? 'border-secondary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
                How It Works
              </Link>
              <Link href="/api" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${location === '/api' ? 'border-secondary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
                API
              </Link>
              <Link href="/pricing" className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${location === '/pricing' ? 'border-secondary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
                Pricing
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/signin">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={
                  "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white " +
                  (location === "/signin"
                    ? "bg-blue-700"
                    : "bg-blue-600 hover:bg-blue-700") +
                  " focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform duration-200"
                }
              >
                Sign In
              </motion.button>
            </Link>
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={
                  "inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-lg " +
                  (location === "/signup"
                    ? "bg-white text-blue-700"
                    : "bg-white text-blue-600 hover:bg-blue-50") +
                  " focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform duration-200"
                }
              >
                Sign Up
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
