
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarDays, Clock, User } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      title: "Understanding Macronutrients: A Complete Guide",
      excerpt: "Learn the fundamentals of proteins, carbohydrates, and fats for optimal nutrition.",
      author: "Dr. Sarah Johnson",
      date: "March 21, 2024",
      readTime: "8 min read",
      category: "Nutrition",
      image: "/placeholder.svg"
    },
    {
      title: "10 Essential Compound Exercises for Strength",
      excerpt: "Master these fundamental movements to build functional strength and muscle.",
      author: "Mike Thompson",
      date: "March 20, 2024",
      readTime: "6 min read",
      category: "Training",
      image: "/placeholder.svg"
    },
    {
      title: "The Science Behind Progressive Overload",
      excerpt: "Discover how to properly implement progressive overload in your training routine.",
      author: "James Wilson",
      date: "March 19, 2024",
      readTime: "7 min read",
      category: "Training",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-dark">
      {/* Hero Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            Latest <span className="text-primary">Insights</span> & Tips
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Discover evidence-based articles about fitness, nutrition, and wellness to help you reach your goals.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-primary hover:bg-secondary">Subscribe</Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              Browse Categories
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="bg-white/5 border-white/10 overflow-hidden hover:border-primary/50 transition-colors">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <User size={16} />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays size={16} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{post.title}</h3>
                  <p className="text-gray-400 mb-4">{post.excerpt}</p>
                  <Button variant="link" className="text-primary hover:text-secondary p-0">
                    Read More →
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
