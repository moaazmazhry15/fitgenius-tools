
import { Building, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface AboutSectionProps {
  onScheduleClick: () => void;
}

const AboutSection = ({ onScheduleClick }: AboutSectionProps) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accent/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 text-foreground">
            Why Choose <span className="text-primary">FitCalcs?</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            We combine cutting-edge technology with proven fitness expertise to help you achieve your health and wellness goals.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
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

        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="w-full sm:w-auto text-base sm:text-lg rounded-full btn-modern hover:scale-105 transform duration-300"
            onClick={onScheduleClick}
          >
            Schedule a Free Consultation <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

const AboutCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="p-6 md:p-8 rounded-xl bg-card border border-border">
    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2 text-center">{title}</h3>
    <p className="text-muted-foreground text-center">{description}</p>
  </div>
);

export default AboutSection;
