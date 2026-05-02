import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxBackgroundProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxBackground = ({ 
  children, 
  speed = 0.5,
  className = ""
}: ParallaxBackgroundProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0"
      >
        {children}
      </motion.div>
    </div>
  );
};