import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  asChild?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "hero";
  size?: "default" | "sm" | "lg" | "icon";
}

export const AnimatedButton = ({ 
  children, 
  className = "",
  onClick,
  asChild,
  variant = "default",
  size = "default"
}: AnimatedButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button 
        className={className} 
        onClick={onClick}
        asChild={asChild}
        variant={variant}
        size={size}
      >
        {children}
      </Button>
    </motion.div>
  );
};
