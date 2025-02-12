
import { useState } from "react";
import ScheduleMeetingForm from "@/components/forms/ScheduleMeetingForm";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";

const Home = () => {
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onScheduleClick={() => setShowScheduleForm(true)} />
      
      <ScheduleMeetingForm 
        open={showScheduleForm} 
        onOpenChange={setShowScheduleForm}
      />

      <AboutSection onScheduleClick={() => setShowScheduleForm(true)} />
      <FeaturesSection />
      <TestimonialsSection />
      <FAQSection onScheduleClick={() => setShowScheduleForm(true)} />
    </div>
  );
};

export default Home;
