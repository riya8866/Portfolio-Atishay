import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { GraduationCap, Code, Users, Heart, Download } from "lucide-react";

export default function AboutSection() {
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

  const highlights = [
    {
      icon: GraduationCap,
      title: "CS Student",
      description: "Shiv Nadar University (Batch 2026)",
    },
    {
      icon: Code,
      title: "Full-Stack Developer",
      description: "MERN stack, WebSockets, Cloud platforms",
    },
    {
      icon: Users,
      title: "Team Player",
      description: "Leadership in hospitality & logistics",
    },
    {
      icon: Heart,
      title: "Problem Solver",
      description: "Love automating workflows",
    },
  ];

  return (
    <section
      ref={ref}
      id="about"
      className="py-12 px-8 bg-card/30 min-h-[90vh]"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            About Me
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="flex justify-center lg:justify-start mb-8">
              {/* Avatar removed */}
            </div>

            <div className="space-y-3 text-muted-foreground text-base">
              <p>
                I'm a Computer Science undergraduate at Shiv Nadar University
                (Batch 2026), building impactful digital solutions.
              </p>

              <p>
                Skilled in the MERN stack and real-time systems, I create
                scalable, user-friendly applications.
              </p>

              <p>
                I focus on e-commerce platforms, live tracking apps, and robust
                web solutions.
              </p>

              <p>
                Beyond coding, I collaborate on university events and tech
                communities like GDSC.
              </p>
            </div>

            <div className="mt-6">
              <Button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/Atishay_Jain.pdf";
                  link.download = "Atishay_Jain.pdf";
                  link.click();
                }}
                className="flex items-center gap-2 bg-blue-800 hover:bg-blue-700 text-white"
                data-testid="button-download-resume"
              >
                <Download size={18} />
                Download Resume
              </Button>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <Card
                  key={item.title}
                  className={`hover-elevate transition-all duration-300 delay-${
                    index * 100
                  }`}
                  data-testid={`card-highlight-${item.title
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-md">
                        <item.icon size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
