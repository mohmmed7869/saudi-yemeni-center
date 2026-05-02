import { motion } from "framer-motion";
import { Sparkles, Zap, Clock, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Sparkles,
      title: t("airBlowerRepair"),
      description: t("airBlowerDesc"),
    },
    {
      icon: Zap,
      title: t("valves"),
      description: t("valvesDesc"),
    },
    {
      icon: Clock,
      title: t("pistonOverhaul"),
      description: t("pistonDesc"),
    },
    {
      icon: Settings,
      title: t("latheService"),
      description: t("latheDesc"),
    },
    {
      icon: Sparkles,
      title: t("oilSystem"),
      description: t("oilSystemDesc"),
    },
    {
      icon: Zap,
      title: t("airLineCleaning"),
      description: t("airLineDesc"),
    },
  ];

  return (
    <section id="services" className="py-32 px-4 bg-background">
      <div className="container max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-primary mb-6">
            {t("services")}
          </h2>
          <p className="text-xl text-primary/60 max-w-3xl mx-auto leading-relaxed mb-8">
            {t("servicesDescription")}
          </p>
          <div className="h-1.5 w-24 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="group glass p-12 rounded-[3rem] organic-shadow organic-shadow-hover cursor-pointer border-none h-full flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/5 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:bg-accent/10 transition-colors duration-500">
                    <Icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-primary/50 font-medium leading-relaxed">
                    {service.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
