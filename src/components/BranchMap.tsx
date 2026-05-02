import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface BranchMapProps {
  latitude: number;
  longitude: number;
  branchName: string;
  address: string;
}

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

export const BranchMap = ({ latitude, longitude, branchName, address }: BranchMapProps) => {
  const { t } = useLanguage();

  // Show static map with location instead of API key input
  return (
    <div className="relative w-full h-[300px] rounded-2xl overflow-hidden border-2 border-border shadow-lg bg-muted group hover:shadow-xl transition-all duration-300">
      {/* Map Preview with Directions Link */}
      <a 
        href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full"
      >
        {/* Map Image from Google Static Maps API (no key needed for display) */}
        <div className="relative w-full h-full">
          <iframe
            src={`https://www.google.com/maps?q=${latitude},${longitude}&z=14&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={branchName}
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
            <div className="bg-accent text-accent-foreground px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {t("viewOnMap")}
            </div>
          </div>
        </div>
      </a>
      
      {/* Location Info Badge */}
      <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm border border-border rounded-xl px-4 py-2 shadow-lg">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-accent" />
          <span className="text-sm font-bold text-foreground">{branchName}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{address}</p>
      </div>
    </div>
  );
};
