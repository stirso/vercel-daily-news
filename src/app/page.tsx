import { getArticles } from "@/services/articles";
import type { Article, Articles, ResponseType } from "@/types/types";
import HomeBanner from "../components/ui/home-banner";
import HomeHero from "../components/ui/home-hero";
import HomeFeatured from "../components/ui/articles/home-featured";

export default async function Home () {
  const articles: ResponseType = await getArticles(true, 6);
  const articleItems = (articles.data as never as Articles);
  const featuredHero: Article = articleItems[0];
  
  return (
    <>
      <HomeBanner />
      <div className="w-full container px-4 flex flex-col justify-between items-start pt-8 gap-8 lg:gap-16">
        {articleItems ? (
          <>
            <HomeHero article={featuredHero} />
            <HomeFeatured articles={articleItems} />
          </>
        ) : null}
      </div>
    </>
  );
}
