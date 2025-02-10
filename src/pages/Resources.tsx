
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, FileText, PlayCircle, BookOpen } from "lucide-react";

const Resources = () => {
  const categories = [
    {
      title: "Workout Templates",
      icon: FileText,
      items: [
        { name: "Beginner Full Body Routine", type: "PDF", size: "2.1 MB" },
        { name: "Advanced PPL Program", type: "PDF", size: "3.4 MB" },
        { name: "Home Workout Guide", type: "PDF", size: "1.8 MB" }
      ]
    },
    {
      title: "Video Tutorials",
      icon: PlayCircle,
      items: [
        { name: "Proper Squat Form", type: "Video", duration: "15 min" },
        { name: "Deadlift Masterclass", type: "Video", duration: "20 min" },
        { name: "Bench Press Tutorial", type: "Video", duration: "12 min" }
      ]
    },
    {
      title: "Nutrition Guides",
      icon: BookOpen,
      items: [
        { name: "Meal Prep Basics", type: "Guide", pages: "25 pages" },
        { name: "Supplement Guide", type: "Guide", pages: "30 pages" },
        { name: "Recipe Collection", type: "Guide", pages: "45 pages" }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-dark">
      {/* Hero Section */}
      <section className="px-4 py-8 sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
            Free Fitness <span className="text-primary">Resources</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            Access our comprehensive collection of workout templates, nutrition guides, and educational content.
          </p>
          <Button className="bg-primary hover:bg-secondary">
            Browse All Resources
          </Button>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="px-4 py-8 sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="space-y-6">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  <h2 className="text-xl sm:text-2xl font-bold">{category.title}</h2>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {category.items.map((item, i) => (
                    <Card key={i} className="bg-white/5 border-white/10 p-3 sm:p-4 hover:border-primary/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm sm:text-base font-semibold mb-1">{item.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-400">
                            {item.type} • {item.size || item.duration || item.pages}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" className="text-primary hover:text-secondary">
                          <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
