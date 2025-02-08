import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, Heart, Activity, Weight, Building, Users, Trophy, Instagram, Twitter, Youtube } from "lucide-react";

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

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose <span className="text-primary">FitCalcs?</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We combine cutting-edge technology with proven fitness expertise to help you achieve your health and wellness goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AboutCard
              icon={Building}
              title="Expert Team"
              description="Our certified fitness professionals bring years of experience to guide your journey."
            />
            <AboutCard
              icon={Users}
              title="Community Driven"
              description="Join thousands of users who are transforming their lives with our tools."
            />
            <AboutCard
              icon={Trophy}
              title="Proven Results"
              description="Science-based calculations and methods that deliver real results."
            />
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

      {/* Footer */}
      <footer className="bg-black/50 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
            {/* Tools Section */}
            <div>
              <h3 className="text-primary font-semibold mb-4">Tools</h3>
              <ul className="space-y-2">
                <li><a href="/tools/bmi" className="text-gray-400 hover:text-primary transition-colors">BMI Calculator</a></li>
                <li><a href="/tools/tdee" className="text-gray-400 hover:text-primary transition-colors">TDEE Calculator</a></li>
                <li><a href="/tools/bmr" className="text-gray-400 hover:text-primary transition-colors">BMR Calculator</a></li>
                <li><a href="/tools/bodyfat" className="text-gray-400 hover:text-primary transition-colors">Body Fat Calculator</a></li>
              </ul>
            </div>

            {/* Resources Section */}
            <div>
              <h3 className="text-primary font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="/blog" className="text-gray-400 hover:text-primary transition-colors">Blog</a></li>
                <li><a href="/coaching" className="text-gray-400 hover:text-primary transition-colors">Coaching</a></li>
                <li><a href="/guides" className="text-gray-400 hover:text-primary transition-colors">Fitness Guides</a></li>
              </ul>
            </div>

            {/* Company Section */}
            <div>
              <h3 className="text-primary font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact</a></li>
                <li><a href="/privacy" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Social & Newsletter Section */}
            <div>
              <h3 className="text-primary font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4 mb-6">
                <a href="https://instagram.com" className="text-gray-400 hover:text-primary transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://twitter.com" className="text-gray-400 hover:text-primary transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="https://youtube.com" className="text-gray-400 hover:text-primary transition-colors">
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="border-t border-white/10 py-6 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} FitCalcs. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
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

const AboutCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="p-8 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg hover-scale">
    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2 text-center">{title}</h3>
    <p className="text-gray-400 text-center">{description}</p>
  </div>
);

export default Home;
