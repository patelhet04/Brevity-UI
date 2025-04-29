"use client";

import { NewsDashboard } from "@/components/news-dashboard";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-6">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Today's Top Stories
      </motion.h1>
      <NewsDashboard />
    </div>
  );
}
