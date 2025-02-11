
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Index = () => {
  const headerRef = useScrollAnimation();
  const descriptionRef = useScrollAnimation();
  const cardsRef = useScrollAnimation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section - With Grid */}
      <section className="section-with-grid min-h-[80vh] flex items-center justify-center px-4 py-16 md:py-0">
        <div className="text-center space-y-6 md:space-y-8 max-w-7xl w-full" ref={headerRef}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-gradient-primary">
            Welcome to Your Fitness Journey
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto px-4 font-normal">
            Start building your amazing healthy lifestyle with our comprehensive tools and guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="btn-modern">Get Started Today</button>
            <button className="btn-modern bg-transparent border-2 border-primary hover:bg-primary/10">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section - Plain */}
      <section className="min-h-[60vh] flex items-center justify-center px-4 py-16">
        <div ref={descriptionRef} className="max-w-7xl w-full">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-gradient-primary">
            Transform Your Lifestyle
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {['Track Progress', 'Get Support', 'Stay Motivated'].map((title) => (
              <div key={title} className="glass-card hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl md:text-2xl font-bold mb-4">{title}</h3>
                <p className="text-foreground/70 font-normal">
                  Experience the power of guided fitness transformation with our expert tools and community support.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - With Grid */}
      <section className="section-with-grid min-h-[40vh] flex items-center justify-center px-4 py-16">
        <div ref={cardsRef} className="max-w-7xl w-full">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { stat: '10K+', label: 'Active Users' },
              { stat: '95%', label: 'Success Rate' },
              { stat: '24/7', label: 'Support' }
            ].map(({ stat, label }) => (
              <div key={stat} className="text-center">
                <h3 className="text-4xl md:text-5xl font-extrabold text-primary mb-2">{stat}</h3>
                <p className="text-lg text-foreground/80 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Plain */}
      <section className="min-h-[40vh] flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-gradient-primary">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-foreground/80 mb-8 font-normal">
            Join thousands of others who have already transformed their lives with our platform.
          </p>
          <button className="btn-modern">
            Begin Your Transformation
          </button>
        </div>
      </section>
    </div>
  );
};

export default Index;

