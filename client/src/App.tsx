import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import LandingPage from "@/pages/LandingPage";
import Explore from "@/pages/Explore";
import ServiceDetail from "@/pages/ServiceDetail";
import Provider from "@/pages/Provider";
import Success from "@/pages/Success";
import Cancel from "@/pages/Cancel";
import Profile from "@/pages/Profile";
import Category from "@/pages/Category";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function Router() {
  return (
    <div className="min-h-screen">
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/explore" component={Explore} />
        <Route path="/service/:id" component={ServiceDetail} />
        <Route path="/perfil/:id" component={Profile} />
        <Route path="/categoria/:slug" component={Category} />
        <Route path="/provider" component={Provider} />
        <Route path="/success" component={Success} />
        <Route path="/cancel" component={Cancel} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
