import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Wrench, Lightbulb, Database } from 'lucide-react';

export default function SkillsSection() {
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

  const skillCategories = [
    {
      icon: Code,
      title: "Languages",
      skills: ["Java", "JavaScript", "HTML", "CSS", "MySQL", "NoSQL"]
    },
    {
      icon: Wrench,
      title: "Frameworks & Tools",
      skills: ["React", "Node.js", "Express", "Socket.IO", "WebRTC", "Leaflet.js", "Cloudinary", "Material UI", "Git"]
    },
    {
      icon: Lightbulb,
      title: "Concepts",
      skills: ["REST APIs", "Real-Time Communication", "WebSockets", "Authentication", "Responsive Design"]
    },
    {
      icon: Database,
      title: "Core CS",
      skills: ["Data Structures & Algorithms", "DBMS", "Operating Systems", "Computer Networks"]
    }
  ];

  return (
    <section ref={ref} id="skills" className="py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Technical Skills
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <Card 
              key={category.title}
              className={`hover-elevate transition-all duration-1000 delay-${(index + 1) * 200} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              data-testid={`card-skills-${category.title.toLowerCase().replace(' ', '-')}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-md">
                    <category.icon size={20} className="text-primary" />
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary"
                      className="text-xs"
                      data-testid={`badge-skill-${skill.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
