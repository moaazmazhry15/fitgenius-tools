
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, Heart, Activity, Weight } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-dark">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Optimize Your Fitness with
              <span className="text-primary"> Smart Calculators!</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Track your health, set goals, and train smarter with FitCalcs.
              Our precision tools help you achieve your fitness goals faster.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="bg-primary hover:bg-secondary text-white px-8 py-6 text-lg">
                Try Free Calculators <ArrowRight className="ml-2" />
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-lg">
                Join Online Coaching
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Calculator}
              title="BMI Calculator"
              description="Calculate your Body Mass Index instantly"
            />
            <FeatureCard
              icon={Activity}
              title="BMR Calculator"
              description="Find your Basal Metabolic Rate"
            />
            <FeatureCard
              icon={Weight}
              title="TDEE Calculator"
              description="Total Daily Energy Expenditure"
            />
            <FeatureCard
              icon={Heart}
              title="Body Fat Calculator"
              description="Estimate your body fat percentage"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg hover-scale">
    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default Home;
