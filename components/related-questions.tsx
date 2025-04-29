"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface RelatedQuestionsProps {
  articleId: string
}

export function RelatedQuestions({ articleId }: RelatedQuestionsProps) {
  // These would be dynamically generated based on the article content
  const questions = [
    "What are the technical specifications of the Starship rocket?",
    "How does this launch compare to previous SpaceX test flights?",
    "What are the next steps for SpaceX's Mars mission plans?",
    "How does Starship compare to NASA's SLS rocket system?",
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {questions.map((question, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 * index }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            className="text-sm"
            onClick={() => {
              // In a real app, this would trigger the chatbot with this question
              console.log(`Asked: ${question}`)
            }}
          >
            {question}
          </Button>
        </motion.div>
      ))}
    </div>
  )
}
