
const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-6 animate-fade-in">
        <h1 className="text-4xl font-bold mb-4 text-primary">Welcome to Your Fitness Journey</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Start building your amazing healthy lifestyle with our comprehensive tools and guidance.
        </p>
        <div className="flex gap-4 justify-center">
          <div className="glass-card p-6 hover-scale">
            <h2 className="text-2xl font-semibold mb-2">Track Progress</h2>
            <p className="text-gray-600">Monitor your fitness journey with our advanced tracking tools.</p>
          </div>
          <div className="glass-card p-6 hover-scale">
            <h2 className="text-2xl font-semibold mb-2">Get Support</h2>
            <p className="text-gray-600">Join our community and get expert guidance on your journey.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
