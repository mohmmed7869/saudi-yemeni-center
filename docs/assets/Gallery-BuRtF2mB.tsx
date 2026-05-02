import { Card } from "@/components/ui/card";
import { Image, ZoomIn, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { OptimizedImage } from "./OptimizedImage";
import { SectionDivider } from "./SectionDivider";
import { ParallaxBackground } from "./ParallaxBackground";

// استيراد صور المعرض الحقيقية للشاحنات
import truckAcRepairImg from "@/assets/gallery/truck-ac-repair.jpg";
import truckGasketImg from "@/assets/gallery/truck-gasket.jpg";
import truckPistonImg from "@/assets/gallery/truck-piston.jpg";
import truckOilSystemImg from "@/assets/gallery/truck-oil-system.jpg";
import truckAirFilterImg from "@/assets/gallery/truck-air-filter.jpg";
import truckWorkshopImg from "@/assets/gallery/truck-workshop.jpg";

// صور حقيقية لأعمال المركز على الشاحنات
const galleryImages = [
  {
    id: 1,
    titleKey: "gallery1Title",
    descriptionKey: "gallery1Desc",
    image: truckAcRepairImg,
  },
  {
    id: 2,
    titleKey: "gallery2Title",
    descriptionKey: "gallery2Desc",
    image: truckGasketImg,
  },
  {
    id: 3,
    titleKey: "gallery3Title",
    descriptionKey: "gallery3Desc",
    image: truckPistonImg,
  },
  {
    id: 4,
    titleKey: "gallery4Title",
    descriptionKey: "gallery4Desc",
    image: truckOilSystemImg,
  },
  {
    id: 5,
    titleKey: "gallery5Title",
    descriptionKey: "gallery5Desc",
    image: truckAirFilterImg,
  },
  {
    id: 6,
    titleKey: "gallery6Title",
    descriptionKey: "gallery6Desc",
    image: truckWorkshopImg,
  },
];

export const Gallery = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <>
      <SectionDivider icon={Image} variant="accent" />
      
      <section id="gallery" className="relative py-32 bg-muted/30 overflow-hidden">
        <ParallaxBackground speed={0.4}>
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        </ParallaxBackground>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-block px-6 py-2 mb-6 rounded-full bg-accent/10 border border-accent/20">
            <span className="text-accent font-bold text-sm">{t('galleryTitle')}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight">
            {t('ourWorkSpeaks')}
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-6" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('galleryDescription')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {galleryImages.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              onClick={() => setSelectedImage(item.id)}
              className="cursor-pointer"
            >
              <Card
                className="group relative overflow-hidden border-2 border-border hover:border-accent/50 transition-all duration-500"
              >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <OptimizedImage
                  src={item.image}
                  alt={t(item.titleKey)}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                    <ZoomIn className="w-8 h-8 text-accent-foreground" strokeWidth={2.5} />
                  </div>
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 right-0 left-0 p-6 text-right">
                  <h3 className="text-2xl font-black text-overlay-text mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {t(item.titleKey)}
                  </h3>
                  <div className="h-0.5 w-16 bg-accent mb-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                  <p className="text-overlay-muted font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
                    {t(item.descriptionKey)}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 left-6 w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:scale-110 transition-transform z-10"
              aria-label="إغلاق"
            >
              <X className="w-6 h-6" />
            </motion.button>
          
          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = galleryImages.findIndex(img => img.id === selectedImage);
              const prevIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
              setSelectedImage(galleryImages[prevIndex].id);
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card border-2 border-accent/50 text-foreground flex items-center justify-center hover:scale-110 hover:bg-accent hover:text-accent-foreground transition-all z-10"
            aria-label="السابق"
          >
            ‹
          </button>
          
          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = galleryImages.findIndex(img => img.id === selectedImage);
              const nextIndex = currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
              setSelectedImage(galleryImages[nextIndex].id);
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card border-2 border-accent/50 text-foreground flex items-center justify-center hover:scale-110 hover:bg-accent hover:text-accent-foreground transition-all z-10"
            aria-label="التالي"
          >
            ›
          </button>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl w-full" 
            onClick={(e) => e.stopPropagation()}
          >
            <OptimizedImage
              src={galleryImages.find((img) => img.id === selectedImage)?.image || ''}
              alt={t(galleryImages.find((img) => img.id === selectedImage)?.titleKey || '')}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <div className="text-center mt-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {t(galleryImages.find((img) => img.id === selectedImage)?.titleKey || '')}
              </h3>
              <p className="text-lg text-muted-foreground">
                {t(galleryImages.find((img) => img.id === selectedImage)?.descriptionKey || '')}
              </p>
            </div>
          </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
    </>
  );
};
