"use client";

import { useState } from "react";
import { NewsCard } from "./news-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

// Mock data for demonstration
const mockArticles = [
  {
    id: "spacex-starship",
    title: "SpaceX Successfully Launches Starship for Orbital Test Flight",
    source: "Tech Chronicle",
    timestamp: "2 hours ago",
    summary:
      "SpaceX achieved a significant milestone today with the successful launch of its Starship vehicle for an orbital test flight. The massive rocket, designed for future Mars missions, reached orbit for the first time after previous test flights ended in explosions.",
    category: "Technology",
    originalUrl: "#",
  },
  {
    id: "ai-regulation",
    title: "EU Passes Landmark AI Regulation Framework",
    source: "European Policy Review",
    timestamp: "5 hours ago",
    summary:
      "The European Union has approved comprehensive regulations for artificial intelligence applications, establishing the world's first broad legal framework for AI. The new rules create a tiered system based on risk levels and impose strict requirements for high-risk AI systems.",
    category: "Politics",
    originalUrl: "#",
  },
  {
    id: "market-update",
    title: "Global Markets Rally as Inflation Concerns Ease",
    source: "Financial Times",
    timestamp: "3 hours ago",
    summary:
      "Stock markets worldwide saw significant gains today as new economic data suggested inflation pressures may be easing. The S&P 500 rose 1.8%, while European and Asian markets also posted strong performances amid renewed investor optimism.",
    category: "Business",
    originalUrl: "#",
  },
  {
    id: "climate-report",
    title: "New Climate Report Warns of Accelerating Sea Level Rise",
    source: "Science Daily",
    timestamp: "Yesterday",
    summary:
      "A major new scientific assessment indicates that sea levels are rising faster than previously projected, potentially affecting coastal communities worldwide. Researchers attribute the acceleration to rapid ice sheet melting in Greenland and Antarctica.",
    category: "Science",
    originalUrl: "#",
  },
  {
    id: "vaccine-breakthrough",
    title: "Breakthrough in Universal Flu Vaccine Shows Promise in Trials",
    source: "Medical Journal",
    timestamp: "Yesterday",
    summary:
      "Scientists have reported promising results from early trials of a universal influenza vaccine that could provide protection against multiple strains. The experimental vaccine uses a novel approach targeting conserved parts of the virus.",
    category: "Health",
    originalUrl: "#",
  },
  {
    id: "streaming-wars",
    title: "Major Studios Announce New Streaming Platform Collaboration",
    source: "Entertainment Weekly",
    timestamp: "4 hours ago",
    summary:
      "Three major film studios have announced plans to launch a joint streaming service, challenging existing platforms in the increasingly competitive market. The new service will feature exclusive content from all three studios' extensive libraries.",
    category: "Entertainment",
    originalUrl: "#",
  },
];

const categories = [
  "All",
  "Politics",
  "Technology",
  "Business",
  "Health",
  "Science",
  "Entertainment",
  "Sports",
];

export function NewsDashboard() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("recent");

  const filteredArticles =
    activeCategory === "All"
      ? mockArticles
      : mockArticles.filter((article) => article.category === activeCategory);

  // Sort articles based on selected option
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === "recent") {
      // Simple mock sorting by timestamp
      return a.timestamp.includes("hour") ? -1 : 1;
    }
    return 0; // No sorting for other options in this demo
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="w-full sm:w-auto overflow-visible">
          <Tabs
            defaultValue="all"
            className="w-full sm:w-auto"
            onValueChange={(value) => {
              if (value === "all") setActiveCategory("All");
              else if (value === "politics") setActiveCategory("Politics");
              else if (value === "tech") setActiveCategory("Technology");
              else if (value === "business") setActiveCategory("Business");
              else if (value === "health") setActiveCategory("Health");
            }}
          >
            <TabsList className="grid grid-cols-5 w-full sm:w-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="politics">Politics</TabsTrigger>
              <TabsTrigger value="tech">Tech</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="health">Health</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-[240px]">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Sort by:
          </span>
          <div className="relative h-10 w-full min-w-[160px]">
            <Select defaultValue="recent" onValueChange={setSortBy}>
              <SelectTrigger className="w-full h-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent sideOffset={8} className="min-w-[180px]">
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="relevance">Relevance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedArticles.map((article, index) => (
          <NewsCard key={article.id} article={article} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
