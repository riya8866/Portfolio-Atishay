import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Github,
  ShoppingCart,
  MessageCircle,
  MapPin,
} from "lucide-react";

export default function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      icon: ShoppingCart,
      title: "Full-Stack E-Commerce Platform",
      description:
        "Scalable MERN application with shopping cart and admin dashboard. Secure authentication with JWT and Redis. Responsive UI with React and Tailwind, images managed via Cloudinary.",
      technologies: ["MERN", "JWT", "Redis", "Tailwind", "Cloudinary"],
      githubUrl: "https://github.com/atishay08/E-Commerce-Store",
      liveUrl: null,
      color: "from-green-400 to-green-600",
    },
    {
      icon: MessageCircle,
      title: "Real-Time Messaging App (WhatsApp Clone)",
      description:
        "One-to-one chat and media sharing with Google OAuth login. Built with Socket.IO for instant messaging and presence. Integrated MongoDB GridFS for efficient media storage.",
      technologies: [
        "Socket.IO",
        "MongoDB GridFS",
        "Google OAuth",
        "Real-time",
      ],
      githubUrl: "https://github.com/atishay08/Whatsapp-Clone",
      liveUrl: "https://whatsapp-clone-1-heou.onrender.com/",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: MapPin,
      title: "Real-Time Tracking App",
      description:
        "Live GPS tracking on interactive maps with Leaflet.js and OpenStreetMap. Backend powered by Socket.IO for fast and accurate updates. Handles disconnections to keep data reliable.",
      technologies: [
        "Leaflet.js",
        "Socket.IO",
        "GPS Tracking",
        "OpenStreetMap",
      ],
      githubUrl: "https://github.com/atishay08/Realtime-Tracker",
      liveUrl: "https://realtime-tracker-5c1p.onrender.com",
      color: "from-purple-400 to-purple-600",
    },
  ];

  return (
    <section ref={ref} id="projects" className="py-12 px-8 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Projects
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className={`hover-elevate transition-all duration-1000 delay-${
                (index + 1) * 200
              } ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              data-testid={`card-project-${index}`}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-r ${project.color} flex items-center justify-center`}
                  >
                    <project.icon size={21} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {project.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4 p-2">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="text-xs"
                      data-testid={`badge-tech-${tech
                        .toLowerCase()
                        .replace(/[^a-z0-9]/g, "-")}`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(project.githubUrl, "_blank")}
                    className="flex-1"
                    data-testid={`button-github-${index}`}
                  >
                    <Github size={16} className="mr-2" />
                    Code
                  </Button>
                  {project.liveUrl && (
                    <Button
                      size="sm"
                      onClick={() => window.open(project.liveUrl, "_blank")}
                      className="flex-1 bg-blue-800 hover:bg-blue-700 text-white"
                      data-testid={`button-live-${index}`}
                    >
                      <ExternalLink size={16} className="mr-2 " />
                      Live Demo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
