import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverScale?: number;
  hoverRotate?: number;
}

export const AnimatedCard = ({ 
  children, 
  className = "", 
  delay = 0,
  hoverScale = 1.03,
  hoverRotate = 0
}: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{ 
        scale: hoverScale,
        rotate: hoverRotate,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className={className}>
        {children}
      </Card>
    </motion.div>
  );
};
