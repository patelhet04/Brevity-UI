"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navigation from "@/components/navigation"
import ChatbotPanel from "@/components/chatbot-panel"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <div className="flex flex-1 w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.main
            className="flex-1 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
        <ChatbotPanel />
      </div>
    </div>
  )
}
