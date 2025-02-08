import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, Heart, Activity, Weight, Building, Users, Trophy, Instagram, Twitter, Youtube, Star, Quote } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-dark">
      {/* Hero Section */}
      <section className="h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
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
      <section className="h-[60vh] flex items-center px-4 sm:px-6 lg:px-8 bg-black/50">
        <div className="max-w-7xl mx-auto py-20">
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
      <section className="h-[60vh] flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-20">
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

      {/* Testimonials Section */}
      <section className="h-[60vh] flex items-center px-4 sm:px-6 lg:px-8 bg-black/50">
        <div className="max-w-7xl mx-auto py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What Our <span className="text-primary">Users Say</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join thousands of satisfied users who have transformed their fitness journey with FitCalcs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="The calculators are so accurate and easy to use. They've helped me stay on track with my fitness goals!"
              author="Sarah Mitchell"
              role="Fitness Enthusiast"
              rating={5}
            />
            <TestimonialCard
              quote="As a personal trainer, I recommend FitCalcs to all my clients. It's an invaluable tool for tracking progress."
              author="Mike Johnson"
              role="Personal Trainer"
              rating={5}
            />
            <TestimonialCard
              quote="The TDEE calculator helped me understand my nutritional needs. I've lost 20 pounds using these tools!"
              author="Emily Roberts"
              role="Weight Loss Success"
              rating={5}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const TestimonialCard = ({ quote, author, role, rating }: { quote: string; author: string; role: string; rating: number }) => (
  <div className="p-8 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg hover-scale">
    <div className="mb-4">
      <Quote className="w-8 h-8 text-primary opacity-50" />
    </div>
    <p className="text-gray-300 mb-4 italic">{quote}</p>
    <div className="flex items-center justify-center mb-2">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-4 h-4 text-primary" fill="currentColor" />
      ))}
    </div>
    <h4 className="text-white font-semibold">{author}</h4>
    <p className="text-gray-400 text-sm">{role}</p>
  </div>
);

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
