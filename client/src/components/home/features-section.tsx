import { 
  Shield, 
  Users, 
  BarChart3, 
  Zap, 
  Scale, 
  FileText 
} from "lucide-react";

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
}) => (
  <div className="pt-6">
    <div className="flow-root bg-slate-50 rounded-lg px-6 pb-8">
      <div className="-mt-6">
        <div>
          <span className="inline-flex items-center justify-center p-3 bg-secondary rounded-md shadow-lg">
            <Icon className="h-6 w-6 text-white" />
          </span>
        </div>
        <h3 className="mt-8 text-lg font-medium text-slate-900 tracking-tight">{title}</h3>
        <p className="mt-5 text-base text-slate-600">
          {description}
        </p>
      </div>
    </div>
  </div>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Credibility Score",
      description: "Our algorithm analyzes multiple factors to generate a comprehensive credibility score that helps you determine if an account is authentic."
    },
    {
      icon: Users,
      title: "Multi-Platform Support",
      description: "Verify accounts across major social media platforms including Twitter, Instagram, Facebook, and TikTok with a single tool."
    },
    {
      icon: BarChart3,
      title: "Detailed Analysis",
      description: "Get comprehensive breakdowns of what makes an account trustworthy or suspicious, with factor-by-factor explanations."
    },
    {
      icon: Zap,
      title: "Bot Detection",
      description: "Our advanced algorithms can identify automated behavior patterns to help you distinguish between human users and bot accounts."
    },
    {
      icon: Scale,
      title: "Reporting System",
      description: "Easily report suspicious accounts directly to the relevant platform with our streamlined reporting tools."
    },
    {
      icon: FileText,
      title: "Comparison Tool",
      description: "Compare multiple accounts side-by-side to identify patterns and connections between potentially related fake accounts."
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">
            Key Features
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-slate-600 sm:mt-4">
            Our platform offers comprehensive tools to verify social media accounts.
          </p>
        </div>
        
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
