import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionDivider } from "./SectionDivider";
import { ParallaxBackground } from "./ParallaxBackground";

export const Branches = () => {
  const { t } = useLanguage();

  const branches = [
    { city: t("jeddah"), address: t("jeddahAddress"), latitude: 21.7587, longitude: 39.0843 },
    { city: t("alkhumra"), address: t("alkhumraAddress"), latitude: 21.7211, longitude: 39.1538 },
  ];

  const handleViewOnMap = (latitude: number, longitude: number) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${latitude},${longitude}`;
          window.open(url, '_blank');
        },
        (error) => {
          console.error('Error getting location:', error);
          // If user denies location or error occurs, just show the business location
          const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
          window.open(url, '_blank');
        }
      );
    } else {
      // Geolocation not supported, just show the business location
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      window.open(url, '_blank');
    }
  };

  return (
    <>
      <SectionDivider icon={MapPin} variant="accent" />
      
      <section id="branches" className="relative py-32 bg-muted/30 overflow-hidden">
        <ParallaxBackground speed={-0.3}>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        </ParallaxBackground>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-block px-6 py-2 mb-6 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-primary font-bold text-sm">{t("ourBranches")}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight">{t("premiumLocations")}</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{t("branchesDescription")}</p>
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          {branches.map((branch, index) => (
            <Card key={index} className="group relative p-10 hover-lift bg-gradient-to-br from-card via-card to-muted/20 border border-border/50 hover:border-primary/40 transition-all duration-500 overflow-hidden shadow-[0_2px_8px_-2px_hsl(215,85%,16%/0.06)] hover:shadow-[0_12px_32px_-8px_hsl(215,85%,16%/0.15)]">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:from-primary/5 group-hover:via-primary/5 group-hover:to-transparent transition-all duration-500" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative flex items-start gap-6 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/25 rounded-3xl blur-2xl group-hover:blur-3xl group-hover:bg-primary/35 transition-all duration-500" />
                  <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-[0_8px_24px_-6px_hsl(215,85%,18%/0.3)] group-hover:shadow-[0_12px_32px_-8px_hsl(215,85%,18%/0.4)] group-hover:scale-110 transition-all duration-500">
                    <MapPin className="w-10 h-10 text-primary-foreground" strokeWidth={2.5} />
                  </div>
                </div>
                <div className="text-right flex-1">
                  <h3 className="text-3xl font-black text-foreground mb-3 group-hover:text-primary transition-colors">{branch.city}</h3>
                  <div className="h-0.5 w-20 bg-gradient-to-r from-primary to-transparent mb-4 group-hover:w-28 transition-all duration-300" />
                  <p className="text-lg text-muted-foreground leading-relaxed mb-5 group-hover:text-foreground/90 transition-colors">{branch.address}</p>
                  <button onClick={() => handleViewOnMap(branch.latitude, branch.longitude)} className="text-primary hover:text-primary-light font-bold transition-colors flex items-center gap-2 hover:gap-3 transition-all duration-300">
                    <MapPin className="w-5 h-5" />
                    {t("viewOnMap")}
                  </button>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/5 to-transparent rounded-tr-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl text-muted-foreground font-medium">{t("visitUs")}</p>
        </div>
      </div>
    </section>
    </>
  );
};
