"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="relative h-9 w-9 rounded-xl flex items-center justify-center bg-background border border-border">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        // Force immediate theme change without transitions
        document.documentElement.classList.add("no-transitions");
        setTheme(resolvedTheme === "dark" ? "light" : "dark");

        // Remove the class after a short delay to re-enable transitions
        setTimeout(() => {
          document.documentElement.classList.remove("no-transitions");
        }, 50);
      }}
      className="relative h-9 w-9 rounded-xl flex items-center justify-center bg-background border border-border hover:bg-accent"
      aria-label="Toggle theme"
    >
      <div className="relative">
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute top-0 left-0 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </div>
    </motion.button>
  );
}
