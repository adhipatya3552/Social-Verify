import { Link } from "wouter";

const CtaSection = () => {
  const scrollToVerify = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('verify')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-secondary">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span className="block">Ready to verify social accounts?</span>
          <span className="block text-blue-100">Start using our platform today.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a 
              href="#verify" 
              onClick={scrollToVerify}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-secondary bg-white hover:bg-blue-50"
            >
              Get started
            </a>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <Link 
              href="#how-it-works"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
