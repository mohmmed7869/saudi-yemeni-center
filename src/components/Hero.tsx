import { Suspense } from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Truck3D } from "./Truck3D";
import { LoadingSpinner } from "./LoadingSpinner";

export const Hero = () => {
  const { t } = useLanguage();
  const whatsappUrl = "https://wa.me/966551307790";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
      {/* Background Subtle Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 blur-[120px] rounded-full animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 blur-[100px] rounded-full animate-float" style={{ animationDelay: '-3s' }} />

      <div className="container max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block px-8 py-2.5 mb-10 bg-primary/5 backdrop-blur-2xl rounded-full text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-primary border border-primary/10 organic-shadow"
        >
          {t("premiumService")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-black tracking-[-0.05em] leading-none text-primary mb-12 drop-shadow-[0_4px_4px_rgba(0,0,0,0.1)]"
        >
          {t("companyName")}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary/70 mb-12 tracking-tight max-w-4xl mx-auto leading-tight"
        >
          {t("heroTitle")}
        </motion.h2>

        {/* Anti-gravity Interactive 3D Truck - Smaller & Sleeker */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="relative py-4 flex flex-col justify-center items-center mb-8 w-full max-w-lg mx-auto"
        >
          <div className="absolute w-full h-32 bg-accent/10 blur-[100px] rounded-full animate-pulse pointer-events-none" />

          <div className="w-full h-[280px] md:h-[400px] glass rounded-[3rem] organic-shadow flex flex-col items-center justify-center border-white/40 relative overflow-hidden group">
            <div className="w-full h-full">
              <Suspense fallback={<LoadingSpinner />}>
                <Truck3D />
              </Suspense>
            </div>

            <div className="absolute bottom-10 left-0 right-0 text-center z-20 pointer-events-none">
              <div className="inline-block px-8 py-2 bg-primary/10 backdrop-blur-md rounded-full border border-white/20">
                <span className="text-sm font-black uppercase tracking-[0.2em] text-primary">
                  {t("companyName")}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Button
            asChild
            className="w-full sm:w-auto px-12 py-8 text-lg font-bold rounded-[2rem] bg-primary text-white shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-1"
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              {t("bookNow")}
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto px-12 py-8 text-lg font-bold rounded-[2rem] border-primary/10 hover:bg-white organic-shadow transition-all duration-500"
          >
            <a href="tel:0551307790" className="flex items-center gap-3">
              <Phone className="h-5 w-5" />
              {t("callUsNow")}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
