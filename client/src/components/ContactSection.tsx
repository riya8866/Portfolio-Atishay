import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

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

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_z9qv0ac",
        "template_h9g5f59",
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
        },
        "I8j2M6PKFky4qh7wf"
      );

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Unable to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "atishay8866@gmail.com",
      href: "mailto:atishay8866@gmail.com",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "/in/atishay08",
      href: "https://www.linkedin.com/in/atishay08/",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@atishay08",
      href: "https://github.com/atishay08",
    },
  ];

  return (
    <section
      ref={ref}
      id="contact"
      className="min-h-[90vh] flex items-center justify-center px-4 py-1 bg-card/30"
    >
      <div className="max-w-5xl w-full">
        {/* Heading */}
        <div
          className={`transition-all duration-1000 text-center mb-6 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-1">Get in Touch</h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Let's collaborate, build, or just chat tech!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <Card className="h-full p-3">
              <CardHeader className="p-2">
                <CardTitle className="text-base">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary/10 rounded-md">
                      <info.icon size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-xs">{info.label}</p>
                      <Button
                        variant="ghost"
                        className="p-0 h-auto text-muted-foreground hover:text-primary justify-start text-xs"
                        onClick={() => window.open(info.href, "_blank")}
                        data-testid={`button-${info.label.toLowerCase()}`}
                      >
                        {info.value}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <Card className="h-full p-3">
              <CardHeader className="p-2">
                <CardTitle className="text-base">Send Message</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-2 max-w-xs mx-auto"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              className="text-xs py-1"
                              {...field}
                              data-testid="input-name"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your.email@example.com"
                              className="text-xs py-1"
                              {...field}
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your message..."
                              rows={2}
                              className="text-xs"
                              {...field}
                              data-testid="input-message"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full text-xs py-1 bg-blue-800 hover:bg-blue-700 text-white"
                      disabled={isSubmitting}
                      data-testid="button-send"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send size={12} className="mr-1 " />
                          Send
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
