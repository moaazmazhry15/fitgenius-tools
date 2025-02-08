
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-primary">
              FitCalcs
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-white hover:text-primary transition-colors">
              Home
            </a>
            <a href="/tools" className="text-white hover:text-primary transition-colors">
              Tools
            </a>
            <a href="/blog" className="text-white hover:text-primary transition-colors">
              Blog
            </a>
            <a href="/coaching" className="text-white hover:text-primary transition-colors">
              Coaching
            </a>
            <a href="/resources" className="text-white hover:text-primary transition-colors">
              Resources
            </a>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              Sign In
            </Button>
            <Button className="bg-primary text-white hover:bg-secondary">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden animate-slide-in">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="/"
                className="block px-3 py-2 text-white hover:text-primary transition-colors"
              >
                Home
              </a>
              <a
                href="/tools"
                className="block px-3 py-2 text-white hover:text-primary transition-colors"
              >
                Tools
              </a>
              <a
                href="/blog"
                className="block px-3 py-2 text-white hover:text-primary transition-colors"
              >
                Blog
              </a>
              <a
                href="/coaching"
                className="block px-3 py-2 text-white hover:text-primary transition-colors"
              >
                Coaching
              </a>
              <a
                href="/resources"
                className="block px-3 py-2 text-white hover:text-primary transition-colors"
              >
                Resources
              </a>
              <div className="space-y-2 mt-4">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                  Sign In
                </Button>
                <Button className="w-full bg-primary text-white hover:bg-secondary">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
