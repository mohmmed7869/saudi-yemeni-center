import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  className?: string;
}

export const ScrollAnimationWrapper = ({ children, className = "" }: ScrollAnimationWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.95]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
