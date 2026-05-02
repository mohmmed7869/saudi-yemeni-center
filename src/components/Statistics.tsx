import { useEffect, useState, useRef } from "react";
import { Users, Calendar, Star, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { SectionDivider } from "./SectionDivider";
import { ParallaxBackground } from "./ParallaxBackground";
const useCountAnimation = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        const startTime = Date.now();
        const animate = () => {
          const now = Date.now();
          const progress = Math.min((now - startTime) / duration, 1);
          const easeOutQuad = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(easeOutQuad * end));
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        animate();
      }
    }, {
      threshold: 0.3
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);
  return {
    count,
    ref
  };
};
export const Statistics = () => {
  const {
    t
  } = useLanguage();
  const stats = [{
    icon: Users,
    value: 1000,
    suffix: "+",
    label: t("happyCustomers"),
    color: "accent"
  }, {
    icon: Calendar,
    value: 15,
    suffix: "+",
    label: t("yearsExperience"),
    color: "primary"
  }, {
    icon: Star,
    value: 98,
    suffix: "%",
    label: t("satisfactionRate"),
    color: "accent"
  }, {
    icon: CheckCircle,
    value: 1000,
    suffix: "+",
    label: t("completedProjects"),
    color: "primary"
  }];
  return <>
      <SectionDivider icon={Star} variant="primary" />
      
      <section className="relative py-32 bg-primary overflow-hidden">
        <ParallaxBackground speed={0.2}>
          <div className="absolute inset-0 bg-white/5 opacity-20" />
        </ParallaxBackground>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true,
          margin: "-100px"
        }} transition={{
          duration: 1,
          ease: [0.16, 1, 0.3, 1]
        }} className="text-center mb-20">
          <div className="inline-block px-6 py-2 mb-6 rounded-full bg-accent/20 border border-accent/30">
            <span className="text-accent font-bold text-sm tracking-widest uppercase">{t("ourAchievements")}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            {t("numbersSpeak")}
          </h2>
          <div className="h-1 w-24 bg-accent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {stats.map((stat, index) => {
            const {
              count,
              ref
            } = useCountAnimation(stat.value);
            const Icon = stat.icon;
            return <motion.div key={index} ref={ref} initial={{
              opacity: 0,
              y: 40
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8,
              delay: index * 0.1
            }} whileHover={{
              y: -10
            }}>
                <Card className="group relative p-12 text-center border border-white/10 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 hover:bg-white/10">
                  <div className="relative z-10 flex flex-col items-center space-y-6">
                    <div className="w-20 h-20 rounded-2xl bg-accent/20 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-10 h-10 text-accent" strokeWidth={2.5} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-5xl md:text-6xl font-black text-white tracking-tighter">
                        {count}{stat.suffix}
                      </div>
                      <div className="text-sm font-bold text-white/50 uppercase tracking-widest">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>;
          })}
        </div>
      </div>
    </section>
    </>;
};