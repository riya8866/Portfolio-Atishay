import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  activeSection?: string;
}

export default function Navigation({ activeSection }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const navbarHeight = 80; // Adjust this to match your navbar height
      const y =
        element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-2xl font-bold  text-blue-800 hover:text-blue-700 hover-elevate px-2 py-1 rounded-md"
            data-testid="button-logo"
          >
            AJ
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === item.href.slice(1)
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                data-testid={`link-${item.label.toLowerCase()}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-sm font-medium text-left transition-colors hover:text-primary ${
                    activeSection === item.href.slice(1)
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                  data-testid={`mobile-link-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
