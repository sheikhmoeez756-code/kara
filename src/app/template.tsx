"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduce
          ? { duration: 0.01 }
          : { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }
      }
    >
      {children}
    </motion.div>
  );
}
