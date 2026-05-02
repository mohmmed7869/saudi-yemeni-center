import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      variant="outline"
      size="icon"
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-lg border-2 border-accent/50 bg-card hover:bg-accent hover:border-accent transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      aria-label="العودة إلى الأعلى"
    >
      <ArrowUp className="w-5 h-5" />
    </Button>
  );
};
