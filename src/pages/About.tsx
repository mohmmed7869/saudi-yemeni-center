import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, Target, Rocket, History } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: History,
      title: t("ourStory"),
      desc: t("ourStoryDesc"),
      color: "bg-blue-500/10 text-blue-500"
    },
    {
      icon: Target,
      title: t("ourVision"),
      desc: t("ourVisionDesc"),
      color: "bg-accent/10 text-accent"
    },
    {
      icon: Rocket,
      title: t("ourMission"),
      desc: t("ourMissionDesc"),
      color: "bg-primary/10 text-primary"
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden" dir={language === "ar" ? "rtl" : "ltr"}>
      <Navigation />

      {/* Background Subtle Elements (Matching Home Page) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 blur-[120px] rounded-full animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 blur-[100px] rounded-full animate-float" style={{ animationDelay: '-3s' }} />

      <main className="relative z-10 pt-32 pb-20 px-4">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-6 py-2 mb-8 bg-white/50 backdrop-blur-xl rounded-full text-xs font-black tracking-widest uppercase opacity-60 border border-white/50"
          >
            {t("aboutUsTitle")}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-black tracking-[-0.05em] leading-none text-primary mb-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.1)]"
          >
            {t("companyName")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-primary/60 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            {t("aboutUsSubtitle")}
          </motion.p>
        </section>

        {/* Content Sections */}
        <section className="max-w-7xl mx-auto space-y-20">
          {/* Main Story Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="glass p-12 md:p-20 rounded-[4rem] organic-shadow border-none relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 blur-[120px] rounded-full group-hover:bg-accent/10 transition-colors duration-1000" />

              <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center">
                    <Shield className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight">{t("ourStory")}</h2>
                  <p className="text-xl text-primary/70 leading-loose font-medium">
                    {t("ourStoryDesc")}
                  </p>
                </div>
                <div className="relative">
                  <div className="aspect-square glass rounded-[3rem] organic-shadow animate-float flex items-center justify-center">
                    <span className="text-primary/10 font-black text-[12rem] select-none">15+</span>
                    <div className="absolute bottom-10 left-10 right-10 text-center">
                      <p className="text-primary font-black text-2xl uppercase tracking-widest">{t("wideExperience")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Vision & Mission Grid */}
          <div className="grid md:grid-cols-2 gap-10">
            {features.slice(1).map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass p-12 rounded-[3.5rem] organic-shadow organic-shadow-hover border-none h-full text-center group">
                  <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-8 ${feature.color} transition-transform group-hover:scale-110 duration-500`}>
                    <feature.icon className="w-10 h-10" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-3xl font-black mb-6 tracking-tight">{feature.title}</h3>
                  <p className="text-lg text-primary/60 leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
