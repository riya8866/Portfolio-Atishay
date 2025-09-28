import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, ChefHat, Shirt, Calendar } from 'lucide-react';

export default function AchievementsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const achievements = [
    {
      icon: Trophy,
      title: "Leadership Excellence",
      description: "Hospitality and Logistics Lead in sports and cultural fest",
      category: "Leadership",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Users,
      title: "Google Developer Student Clubs (GDSC)",
      description: "Active member contributing to developer community",
      category: "Technology",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: ChefHat,
      title: "Sigree (Cooking Club)",
      description: "Member exploring culinary arts and team collaboration",
      category: "Culinary",
      color: "from-green-400 to-green-600"
    },
    {
      icon: Shirt,
      title: "Enchant (Fashion Club)",
      description: "Member exploring creativity in fashion and design",
      category: "Creative",
      color: "from-purple-400 to-purple-600"
    }
  ];

  return (
    <section ref={ref} id="achievements" className="py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Achievements & Extra-Curricular
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <Card 
              key={achievement.title}
              className={`hover-elevate transition-all duration-1000 delay-${(index + 1) * 200} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              data-testid={`card-achievement-${index}`}
            >
              <CardContent className="p-6">
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${achievement.color} mb-4`}>
                    <achievement.icon size={28} className="text-white" />
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {achievement.description}
                  </p>
                  
                  <Badge 
                    variant="secondary"
                    className="text-xs"
                    data-testid={`badge-category-${achievement.category.toLowerCase()}`}
                  >
                    {achievement.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
