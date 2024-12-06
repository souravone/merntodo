import { motion } from "motion/react";

function FloatingShape({ color, size, top, left, delay }) {
  return (
    <motion.div
      className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}
      style={{ top, left }}
      animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        // rotate: [0, 360],
      }}
      transition={{
        duration: 30,
        ease: "easeIn",
        repeat: Infinity,
        delay,
      }}
      aria-hidden="true"
    />
  );
}

export default FloatingShape;
