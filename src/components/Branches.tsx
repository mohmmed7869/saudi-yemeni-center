import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionDivider } from "./SectionDivider";
import { ParallaxBackground } from "./ParallaxBackground";
import { BranchMap } from "./BranchMap";

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

        <div className="max-w-6xl mx-auto space-y-16">
          {branches.map((branch, index) => (
            <Card key={index} className="group relative overflow-hidden bg-white/80 backdrop-blur-xl border-none transition-all duration-700 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.06)] hover:shadow-[0_50px_100px_-30px_rgba(0,0,0,0.1)] rounded-[3rem]">
              <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
                {/* Branch Info */}
                <div className="p-12 relative flex flex-col justify-center">
                  <div className="relative flex items-start gap-8 mb-8">
                    <div className="relative shrink-0">
                      <div className="w-24 h-24 rounded-[2rem] bg-primary flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                        <MapPin className="w-12 h-12 text-accent" strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="text-right flex-1">
                      <h3 className="text-4xl font-black text-primary mb-4 tracking-tighter">{branch.city}</h3>
                      <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-medium">{branch.address}</p>
                      <button 
                        onClick={() => handleViewOnMap(branch.latitude, branch.longitude)} 
                        className="px-8 py-4 bg-background rounded-2xl text-primary font-bold transition-all hover:bg-accent hover:text-primary flex items-center gap-3 w-fit mr-auto lg:mr-0"
                      >
                        <MapPin className="w-5 h-5" />
                        {t("viewOnMap")}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Interactive Map */}
                <div className="relative min-h-[400px]">
                  <BranchMap 
                    latitude={branch.latitude} 
                    longitude={branch.longitude} 
                    branchName={branch.city} 
                    address={branch.address} 
                  />
                </div>
              </div>
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
