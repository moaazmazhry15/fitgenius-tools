
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Index = () => {
  const headerRef = useScrollAnimation();
  const descriptionRef = useScrollAnimation();
  const cardsRef = useScrollAnimation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-16 md:py-0">
      <div className="text-center space-y-6 md:space-y-8 max-w-7xl w-full">
        <div ref={headerRef}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-primary">
            Welcome to Your Fitness Journey
          </h1>
        </div>
        
        <div ref={descriptionRef}>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Start building your amazing healthy lifestyle with our comprehensive tools and guidance.
          </p>
        </div>
        
        <div ref={cardsRef} className="flex flex-col md:flex-row gap-4 justify-center px-4">
          <div className="glass-card p-6 hover-scale flex-1 max-w-md mx-auto md:mx-0">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">Track Progress</h2>
            <p className="text-gray-600">Monitor your fitness journey with our advanced tracking tools.</p>
          </div>
          <div className="glass-card p-6 hover-scale flex-1 max-w-md mx-auto md:mx-0">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">Get Support</h2>
            <p className="text-gray-600">Join our community and get expert guidance on your journey.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
