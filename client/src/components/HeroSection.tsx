import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-32 pb-12 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Atishay Jain
            </span>
          </h1>
        </div>

        <div
          className={`transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xl md:text-2xl text-muted-foreground mb-3">
            Developer. Problem-Solver. Builder of Things that Matter.
          </p>
        </div>

        <div
          className={`transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            I design and develop scalable web apps and real-time platforms that
            simplify workflows and create impact.
          </p>
        </div>

        <div
          className={`transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              onClick={scrollToProjects}
              className="text-base px-8 py-6 bg-blue-800 hover:bg-blue-700 text-white"
              data-testid="button-explore-projects"
            >
              Explore Projects
            </Button>
            <Button
              variant="outline"
              onClick={scrollToContact}
              className="text-base px-8 py-6"
              data-testid="button-contact-me"
            >
              Contact Me
            </Button>
          </div>
        </div>

        <div
          className={`transition-all duration-1000 delay-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex justify-center gap-6 mb-8">
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-primary"
              onClick={() => window.open("mailto:aj722@snu.edu.in", "_blank")}
              data-testid="button-email"
            >
              <Mail size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-primary"
              onClick={() =>
                window.open("https://www.linkedin.com/in/atishay08/", "_blank")
              }
              data-testid="button-linkedin"
            >
              <Linkedin size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-primary"
              onClick={() =>
                window.open("https://github.com/atishay08", "_blank")
              }
              data-testid="button-github"
            >
              <Github size={20} />
            </Button>
          </div>
        </div>

        <div
          className={`transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Button
            variant="ghost"
            size="icon"
            className="animate-bounce"
            onClick={() => {
              const element = document.querySelector("#about");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            data-testid="button-scroll-down"
          >
            <ChevronDown size={24} />
          </Button>
        </div>
      </div>
    </section>
  );
}
