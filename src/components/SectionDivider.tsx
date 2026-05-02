import { motion, useScroll, useTransform } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useRef } from "react";

interface SectionDividerProps {
  icon?: LucideIcon;
  variant?: "primary" | "accent";
  animate?: boolean;
}

export const SectionDivider = ({ 
  icon: Icon, 
  variant = "primary",
  animate = true 
}: SectionDividerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <div ref={ref} className="relative w-full h-32 flex items-center justify-center overflow-hidden">
      {/* Central Line - Perfectly Centered */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        style={{ opacity }}
      />
      
      {/* Decorative Dots - Grouped in Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-12 md:gap-24 w-full max-w-4xl">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="w-1.5 h-1.5 rounded-full bg-primary/20"
          />
        ))}
      </div>

      {/* Main Icon - Centered */}
      {Icon && (
        <motion.div 
          className="relative z-10"
          style={{ y: animate ? y : 0 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20 border border-white/10"
          >
            {/* Soft Glow */}
            <div className="absolute inset-0 rounded-2xl blur-lg bg-primary/20" />
            
            <Icon 
              className="text-white relative z-10"
              size={24}
              strokeWidth={2}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};