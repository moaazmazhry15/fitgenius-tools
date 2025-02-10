
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import Blog from "./pages/Blog";
import Coaching from "./pages/Coaching";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import BMICalculator from "./components/calculators/BMICalculator";
import BMRCalculator from "./components/calculators/BMRCalculator";
import TDEECalculator from "./components/calculators/TDEECalculator";
import BodyFatCalculator from "./components/calculators/BodyFatCalculator";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/calculators/bmi" element={<BMICalculator />} />
                <Route path="/calculators/bmr" element={<BMRCalculator />} />
                <Route path="/calculators/tdee" element={<TDEECalculator />} />
                <Route path="/calculators/bodyfat" element={<BodyFatCalculator />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/coaching" element={<Coaching />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
