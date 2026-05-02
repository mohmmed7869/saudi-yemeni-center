import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-white pt-24 pb-32 md:pb-12 relative overflow-hidden">
      {/* Subtle Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 text-right">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 justify-end">
              <span className="text-2xl font-black tracking-tighter">{t("companyName")}</span>
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                <span className="text-primary font-black text-xl">A</span>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed font-medium">
              {t("visitUs")}
            </p>
            <p className="text-white/40 text-sm leading-loose mt-4">
              {t("servicesDescription")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-8 text-accent uppercase tracking-widest">{t("quickLinks")}</h4>
            <ul className="space-y-4 text-white/60 font-medium">
              <li><a href="/" className="hover:text-accent transition-colors">{t("home")}</a></li>
              <li><a href="/about" className="hover:text-accent transition-colors">{t("aboutUs")}</a></li>
              <li><a href="#faq" className="hover:text-accent transition-colors">{t("faqTitle")}</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">{t("contactTitle")}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-8 text-accent uppercase tracking-widest">{t("contactUs")}</h4>
            <ul className="space-y-6 text-white/60 font-medium">
              <li className="flex items-center gap-4 justify-end">
                <span>0551307790</span>
                <Phone size={18} className="text-accent" />
              </li>
              <li className="flex items-center gap-4 justify-end">
                <span>info@saudi-yemeni.com</span>
                <Mail size={18} className="text-accent" />
              </li>
              <li className="flex items-center gap-4 justify-end">
                <span className="text-xs leading-loose">{t("jeddahAddress")}</span>
                <MapPin size={18} className="text-accent" />
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-bold mb-8 text-accent uppercase tracking-widest">{t("workHours")}</h4>
            <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
              <p className="text-sm text-white/80 leading-relaxed">
                {t("availableTime")}<br />
                <span className="text-accent font-bold">{t("workHours")}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-xs font-bold tracking-widest uppercase">
            &copy; 2026 {t("companyName")}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
              <Facebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
              <Twitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
