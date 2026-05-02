import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";
import { SEO } from "@/components/SEO";
import { Statistics } from "@/components/Statistics";
import { motion } from "framer-motion";
import { Award, Users, Target, Shield, Wrench, Clock, Star, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { lazy, Suspense } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import companyLogo from "@/assets/company-logo.png";

const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

const AboutUs = () => {
  const { t, language } = useLanguage();

  const values = [
    {
      icon: Shield,
      title: t("quality"),
      description: t("qualityDesc")
    },
    {
      icon: Users,
      title: t("professionalism"),
      description: t("professionalismDesc")
    },
    {
      icon: Target,
      title: t("accuracy"),
      description: t("accuracyDesc")
    },
    {
      icon: Clock,
      title: t("speed"),
      description: t("speedDesc")
    }
  ];

  const achievements = [
    {
      icon: CheckCircle,
      number: "15+",
      label: t("yearsExperience")
    },
    {
      icon: Users,
      number: "1000+",
      label: t("happyClients")
    },
    {
      icon: Wrench,
      number: "1000+",
      label: t("completedProjects")
    },
    {
      icon: Star,
      number: "100%",
      label: t("satisfactionRate")
    }
  ];

  return (
    <div className="min-h-screen" dir={language === "ar" ? "rtl" : "ltr"}>
      <SEO
        title={language === 'ar' 
          ? "من نحن - المركز السعودي اليمني | رؤيتنا ومهمتنا" 
          : "About Us - Saudi Yemeni Center | Our Vision and Mission"}
        description={language === 'ar'
          ? "تعرف على المركز السعودي اليمني، رؤيتنا، مهمتنا وقيمنا. نحن متخصصون في تقديم أفضل خدمات صيانة وإصلاح الشاحنات في جدة والخمرة بخبرة تمتد لسنوات"
          : "Learn about Saudi Yemeni Center, our vision, mission and values. We specialize in providing the best truck maintenance and repair services in Jeddah and Alkhumra with years of experience"}
        keywords={language === 'ar'
          ? "من نحن، المركز السعودي اليمني، رؤيتنا، مهمتنا، قيمنا، خبرة صيانة شاحنات، فريق العمل"
          : "About us, Saudi Yemeni Center, our vision, our mission, our values, truck maintenance experience, team"}
        canonicalUrl="https://saudi-yemeni-center.netlify.app/about"
      />

      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-background">
          <ParallaxBackground speed={0.3}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-background" />
          </ParallaxBackground>

          <div className="container mx-auto px-4 py-32 relative z-10">
            <div className="max-w-6xl mx-auto text-center">
              {/* Apple-style Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 px-5 py-2 mb-12 rounded-full bg-muted/50 backdrop-blur-xl border border-border/50"
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Award className="w-4 h-4 text-accent" />
                </motion.div>
                <span className="text-sm font-semibold text-foreground/80">{t("aboutUsTitle")}</span>
              </motion.div>

              {/* Company Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mb-12"
              >
                <img 
                  src={companyLogo} 
                  alt="شعار المركز السعودي اليمني - مركز متخصص في إصلاح هواء الشاحنات"
                  className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain mx-auto"
                  loading="eager"
                  fetchPriority="high"
                  width="192"
                  height="192"
                />
              </motion.div>

              {/* Apple-style Main Title with Gradient */}
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[0.95] tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, hsl(217, 91%, 60%) 0%, hsl(226, 64%, 33%) 50%, hsl(191, 100%, 50%) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {t("aboutUsHeading")}
              </motion.h1>
              
              {/* Apple-style Subtitle */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto font-normal leading-relaxed"
              >
                {t("aboutUsSubtitle")}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="relative py-32 bg-background overflow-hidden">
          <ParallaxBackground speed={0.2}>
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          </ParallaxBackground>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-4xl mx-auto text-center mb-20"
            >
              <div className="inline-block px-6 py-2 mb-6 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-primary font-bold text-sm">{t("ourStory")}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
                {t("ourStoryHeading")}
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8" />
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {t("ourStoryDesc")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="p-8 bg-gradient-to-br from-card to-muted/30 border-2 border-border hover:border-primary/30 transition-all duration-300">
                  <Target className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-4">{t("ourVision")}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("ourVisionDesc")}
                  </p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="p-8 bg-gradient-to-br from-card to-muted/30 border-2 border-border hover:border-accent/30 transition-all duration-300">
                  <Award className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-4">{t("ourMission")}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("ourMissionDesc")}
                  </p>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="relative py-32 bg-muted/30 overflow-hidden">
          <ParallaxBackground speed={-0.2}>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          </ParallaxBackground>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-block px-6 py-2 mb-6 rounded-full bg-accent/10 border border-accent/20">
                <span className="text-accent font-bold text-sm">{t("ourValues")}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
                {t("ourValuesHeading")}
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <Card className="p-8 text-center h-full bg-card border-2 hover:border-accent/40 transition-all duration-300">
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-2xl" />
                        <div className="relative w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
                          <Icon className="w-10 h-10 text-accent-foreground" strokeWidth={2.5} />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <Statistics />
      </main>

      <Suspense fallback={<LoadingSpinner />}>
        <Footer />
      </Suspense>
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
};

export default AboutUs;
