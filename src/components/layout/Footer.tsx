
import { Facebook, Instagram, Twitter, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

const Footer = () => {
  const { theme, setTheme } = useTheme();

  return (
    <footer className="bg-black/50 backdrop-blur-lg border-t border-white/10 text-gray-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">FitGenius</h3>
            <p className="text-gray-400">
              Empowering your fitness journey with smart tools and expert guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tools" className="hover:text-primary transition-colors">
                  Tools
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/coaching" className="hover:text-primary transition-colors">
                  Coaching
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-primary transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-2">
              <li>support@fitgenius.com</li>
              <li>1-800-FIT-GENIUS</li>
              <li>123 Fitness Street</li>
              <li>Workout City, FC 12345</li>
            </ul>
          </div>

          {/* Social Links and Theme Toggle */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center">
          <p>&copy; {new Date().getFullYear()} FitGenius. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
