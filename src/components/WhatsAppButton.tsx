import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();
  const phoneNumber = "966551307790";
  const message = language === "ar"
    ? "مرحباً، حاب أحجز موعد لخدمة الصيانة وأستفسر عن أقرب وقت متاح. بانتظار ردكم، وشكراً لكم!"
    : "Hello, I would like to book an appointment for maintenance service and inquire about the nearest available time. Waiting for your response, thank you!";

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank" rel="noopener noreferrer"
      className={`fixed bottom-28 md:bottom-8 left-6 md:left-8 z-50 group transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      aria-label="تواصل عبر واتساب"
    >
      {/* Pulsing Background */}
      <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20" />
      
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-[#25D366] rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
      
      {/* Main Button */}
      <div className="relative w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300">
        <MessageCircle className="w-8 h-8 text-primary-foreground" strokeWidth={2.5} />
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full mb-3 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-foreground text-background px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap shadow-xl">
          تواصل معنا عبر واتساب
          <div className="absolute top-full right-6 -mt-1 w-3 h-3 bg-foreground transform rotate-45" />
        </div>
      </div>
    </a>
  );
};
