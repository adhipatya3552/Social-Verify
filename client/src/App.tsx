import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";
import ComparePage from "@/pages/compare";
import HowItWorksPage from "@/pages/how-it-works";
import ApiPage from "@/pages/api";
import PricingPage from "@/pages/pricing";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/compare" component={ComparePage} />
      <Route path="/how-it-works" component={HowItWorksPage} />
      <Route path="/api" component={ApiPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
