"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface Article {
  id: string;
  title: string;
  source: string;
  timestamp: string;
  summary: string;
  category: string;
  originalUrl: string;
}

interface NewsCardProps {
  article: Article;
  index: number;
}

export function NewsCard({ article, index }: NewsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      whileHover={{ y: -5, transition: { duration: 0.15 } }}
      className="h-full"
    >
      <Card className="flex flex-col h-full hover:shadow-md hover:border-primary/20 transition-all duration-200 border-border/60 dark:bg-card/80 overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start gap-2">
            <Badge variant="outline" className="text-xs font-normal">
              {article.category}
            </Badge>
            <div className="text-xs text-muted-foreground">
              {article.timestamp}
            </div>
          </div>
          <Link href={`/article/${article.id}`} className="group">
            <h3 className="text-lg font-semibold mt-2 group-hover:text-primary transition-colors line-clamp-2">
              {article.title}
            </h3>
          </Link>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-sm text-muted-foreground line-clamp-4">
            {article.summary}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between items-center pt-2 text-xs">
          <span className="text-muted-foreground">{article.source}</span>
          <div className="flex gap-2">
            <Link
              href={article.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary hover:underline"
            >
              Original <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
