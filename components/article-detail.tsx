"use client"

import { Badge } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Share2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface Article {
  id: string
  title: string
  source: string
  timestamp: string
  category: string
  summary: string
  fullSummary: string
  originalUrl: string
  relatedArticles: string[]
}

interface ArticleDetailProps {
  article: Article
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Badge variant="outline">{article.category}</Badge>
        <span className="text-sm text-muted-foreground">{article.timestamp}</span>
        <span className="text-sm text-muted-foreground">•</span>
        <span className="text-sm text-muted-foreground">{article.source}</span>
      </div>

      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {article.title}
      </motion.h1>

      <div className="prose dark:prose-invert max-w-none mb-8">
        {article.fullSummary.split("\n\n").map((paragraph, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href={article.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-primary hover:underline"
          >
            Read original article <ExternalLink className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.button
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Share2 className="h-4 w-4" /> Share
        </motion.button>
      </div>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-xl font-semibold mb-4">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {article.relatedArticles.map((title, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-4">
                  <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                    {title}
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
