import { ArticleDetail } from "@/components/article-detail"
import { RelatedQuestions } from "@/components/related-questions"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ArticlePage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the article data based on the ID
  const article = {
    id: params.id,
    title: "SpaceX Successfully Launches Starship for Orbital Test Flight",
    source: "Tech Chronicle",
    timestamp: "2 hours ago",
    category: "Technology",
    summary:
      "SpaceX achieved a significant milestone today with the successful launch of its Starship vehicle for an orbital test flight. The massive rocket, designed for future Mars missions, reached orbit for the first time after previous test flights ended in explosions. CEO Elon Musk called it a 'historic achievement' that brings humanity one step closer to becoming a multi-planetary species.",
    fullSummary:
      "SpaceX achieved a significant milestone today with the successful launch of its Starship vehicle for an orbital test flight. The massive rocket, designed for future Mars missions, reached orbit for the first time after previous test flights ended in explosions. CEO Elon Musk called it a 'historic achievement' that brings humanity one step closer to becoming a multi-planetary species.\n\nThe launch took place at SpaceX's Starbase facility in Boca Chica, Texas, at 8:30 AM local time. Unlike previous tests, both the Super Heavy booster and the Starship upper stage performed as expected, with the booster returning for a controlled landing in the Gulf of Mexico. The Starship vehicle continued to orbit, completing a partial orbit before a planned splashdown in the Pacific Ocean.\n\nThis successful test marks a critical step in SpaceX's ambitious plans for lunar missions as part of NASA's Artemis program and eventually human missions to Mars. Engineers will now analyze data from the flight to refine the design for future launches. Industry experts note that this achievement could accelerate timelines for both government and commercial space exploration initiatives.",
    originalUrl: "https://techchronicle.com/spacex-starship-orbital-test",
    relatedArticles: [
      "NASA Announces New Artemis Mission Timeline",
      "Blue Origin Tests New Shepard Rocket System",
      "The Race to Mars: Private Companies Lead the Way",
    ],
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to News
          </Button>
        </Link>
      </div>

      <ArticleDetail article={article} />

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Ask about this article</h2>
        <RelatedQuestions articleId={article.id} />
      </div>
    </div>
  )
}
