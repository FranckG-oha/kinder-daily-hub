import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Page({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="mx-auto max-w-[440px] px-5 pb-8 pt-4"
    >
      {children}
    </motion.main>
  );
}