import { motion } from "framer-motion";
import { Truck } from "lucide-react";

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  size: Math.random() * 6 + 2,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 20 + 15,
  delay: Math.random() * 5,
}));

export const ModernBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Solid Background */}
      <div className="absolute inset-0 bg-primary opacity-20" />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: particle.id % 3 === 0 
              ? "hsl(215, 85%, 50%)" 
              : particle.id % 3 === 1 
              ? "hsl(38, 95%, 52%)" 
              : "hsl(215, 85%, 35%)",
            boxShadow: particle.id % 2 === 0 
              ? "0 0 20px hsl(215, 85%, 50%)" 
              : "0 0 20px hsl(38, 95%, 52%)",
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, particle.id % 2 === 0 ? 20 : -20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Animated Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <motion.line
          x1="0%"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="hsl(215, 85%, 50%)"
          strokeWidth="2"
          animate={{
            y1: ["50%", "30%", "50%"],
            y2: ["50%", "70%", "50%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.line
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          stroke="hsl(38, 95%, 52%)"
          strokeWidth="2"
          animate={{
            x1: ["50%", "30%", "50%"],
            x2: ["50%", "70%", "50%"],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* Glowing Orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-primary opacity-20"
        style={{
          filter: "blur(60px)",
        }}
        animate={{
          x: ["10%", "80%", "10%"],
          y: ["10%", "70%", "10%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-accent opacity-15"
        style={{
          filter: "blur(60px)",
        }}
        animate={{
          x: ["70%", "20%", "70%"],
          y: ["70%", "20%", "70%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated Truck */}
      <motion.div
        className="fixed bottom-20 left-0 z-10 pointer-events-none"
        animate={{
          x: ["-10%", "110vw"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 3,
        }}
      >
        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Truck 
            className="w-16 h-16 md:w-24 md:h-24 text-accent drop-shadow-2xl" 
            style={{ 
              filter: "drop-shadow(0 0 20px hsl(38, 95%, 52%))" 
            }}
          />
        </motion.div>
      </motion.div>

      {/* Second Truck (same direction) */}
      <motion.div
        className="fixed top-32 left-0 z-10 pointer-events-none"
        animate={{
          x: ["-10%", "110vw"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 5,
        }}
      >
        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Truck 
            className="w-12 h-12 md:w-20 md:h-20 text-primary drop-shadow-2xl opacity-70" 
            style={{ 
              filter: "drop-shadow(0 0 15px hsl(215, 85%, 50%))" 
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
