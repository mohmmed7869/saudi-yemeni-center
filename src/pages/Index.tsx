import { lazy, Suspense } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { SEO } from "@/components/SEO";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";

import { useLanguage } from "@/contexts/LanguageContext";

// Lazy load heavy components for better performance (Hero should load immediately)
const Services = lazy(() => import("@/components/Services").then(m => ({ default: m.Services })));
const Gallery = lazy(() => import("@/components/Gallery").then(m => ({ default: m.Gallery })));
const Branches = lazy(() => import("@/components/Branches").then(m => ({ default: m.Branches })));
const FAQ = lazy(() => import("@/components/FAQ").then(m => ({ default: m.FAQ })));
const Contact = lazy(() => import("@/components/Contact").then(m => ({ default: m.Contact })));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

const Index = () => {
  const { language, t } = useLanguage();
  
  return (
    <div className="min-h-screen" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* SEO Component */}
      <SEO
        title={language === 'ar' 
          ? "المركز السعودي اليمني - إصلاح هواء جميع أنواع الشاحنات | جدة والخمرة" 
          : "Saudi Yemeni Center - Truck Air System Repair | Jeddah & Alkhumra"}
        description={language === 'ar'
          ? "المركز السعودي اليمني بجدة والخمرة: متخصصون في إصلاح هواء الشاحنات، صيانة بلوف الهواء، البواكم، وعمرة البساتم بأعلى جودة. اتصل بنا الآن: 0551307790"
          : "Saudi Yemeni Center in Jeddah & Alkhumra: Specialists in truck air system repair, valve maintenance, and piston overhaul with high quality. Call us: 0551307790"}
        keywords={language === 'ar'
          ? "إصلاح هواء شاحنات، المركز السعودي اليمني، صيانة شاحنات جدة، بلوف هواء، بواكم، عمرة بساتم، ورشة شاحنات الخمرة، صيانة معدات ثقيلة، جدة، الخمرة"
          : "truck air repair, Saudi Yemeni Center, truck maintenance Jeddah, air valves, pistons, truck workshop Alkhumra, heavy equipment maintenance, Jeddah, Alkhumra"}
        canonicalUrl="https://saudi-yemeni-center.netlify.app/"
      />
      
      {/* Performance Monitor */}
      <PerformanceMonitor />
      
      <ScrollProgress />
      <Navigation />
      
      {/* Main content - prioritized order for customer engagement */}
      <main>
        <Hero />
        
        <Suspense fallback={<LoadingSpinner />}>
          <Services />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <Gallery />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <Branches />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <Contact />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <FAQ />
        </Suspense>
      </main>
      
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      
      <WhatsAppButton />
      <BackToTop />
      <PWAInstallPrompt />
    </div>
  );
};

export default Index;
