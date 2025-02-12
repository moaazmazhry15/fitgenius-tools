
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  onScheduleClick: () => void;
}

const HeroSection = ({ onScheduleClick }: HeroSectionProps) => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground mb-6">
            Optimize Your Fitness with
            <span className="text-primary"> Smart Calculators!</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Track your health, set goals, and train smarter with FitCalcs.
            Our precision tools help you achieve your fitness goals faster.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/tools">
              <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg rounded-full btn-modern hover:scale-105 transform duration-300">
                Try Free Calculators <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Button 
              size="lg"
              className="w-full sm:w-auto text-base sm:text-lg rounded-full bg-transparent border-2 border-primary hover:bg-accent hover:border-accent text-primary hover:text-primary-foreground hover:scale-105 transform transition-all duration-300 ease-in-out"
              onClick={onScheduleClick}
            >
              Get In Touch <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
