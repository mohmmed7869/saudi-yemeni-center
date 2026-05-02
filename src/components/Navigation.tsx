import { useState, useEffect } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Info, Hammer, MapPin, Phone, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = ["services", "branches"];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection("#" + current);
      else if (window.scrollY < 100) setActiveSection("/");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("home"), icon: Home },
    { href: "/about", label: t("aboutUs"), icon: Info },
    { href: "#services", label: t("services"), icon: Settings, isHash: true },
    { href: "#branches", label: t("branches"), icon: MapPin, isHash: true },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const id = href.substring(1);
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <>
      {/* Top Header - For Logo and Language */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 md:py-6 px-4 pointer-events-none">
        <nav className="max-w-6xl mx-auto glass rounded-[2rem] px-6 py-3 flex justify-between items-center organic-shadow pointer-events-auto">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg shadow-primary/20">
              <span className="text-white font-black text-xl">A</span>
            </div>
            <span className="font-black tracking-tighter text-lg md:text-2xl text-primary">
              {t("companyName")}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-8 items-center mr-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-bold opacity-60 hover:opacity-100 transition-opacity tracking-tight"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <LanguageSwitcher />
            <a 
              href="tel:0551307790" 
              className="hidden md:flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-2xl text-sm font-black hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
            >
              <Phone size={16} />
              {t("callUsNow")}
            </a>
          </div>
        </nav>
      </header>

      {/* Mobile Bottom Navigation - Anti-gravity Style */}
      <nav className="fixed bottom-0 left-0 right-0 z-[60] md:hidden pb-6 px-4 flex justify-center pointer-events-none">
        <div className="w-full max-w-md bg-[#1D1D1F]/90 backdrop-blur-2xl border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-[2.5rem] flex justify-around items-center h-20 px-2 pointer-events-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.isHash ? activeSection === link.href : location.pathname === link.href;
            
            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`flex flex-col items-center justify-center flex-1 gap-1 transition-all duration-300 ${isActive ? 'text-accent' : 'text-white/40'}`}
              >
                <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-accent/10' : ''}`}>
                  <Icon size={20} strokeWidth={isActive ? 3 : 2} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-tighter">
                  {link.label}
                </span>
              </button>
            );
          })}
          
          <a 
            href="tel:0551307790" 
            className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-primary shadow-lg shadow-accent/30 active:scale-90 transition-transform animate-pulse"
          >
            <Phone size={24} fill="currentColor" />
          </a>
        </div>
      </nav>
    </>
  );
};