import Image from "next/image";
import Link from "next/link";
import { getArticles } from '@/app/lib/articles';
import type { Articles, ResponseType } from '@/app/lib/types';
import ArticleGrid from "./article-grid";

export default async function HomeFeatured () {
  const articles: ResponseType = await getArticles(true, 6);
  
  if (!articles.success) return null;

  const articleItems = (articles.data as never as Articles);

  return (
    <div className="flex w-full h-full flex-col justify-center items-center gap-6">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl lg:text-3xl font-bold">
            Featured
          </h2>
          <span className="text-base text-gray-500">
            Handpicked stories from the team.
          </span>
        </div>
        <Link
          className="text-gray-500 text-base hover:cursor-pointer"
          href="/articles"
        >
          View All
        </Link>
      </div>
      {articleItems && <ArticleGrid articles={articleItems} />}
    </div>
  );
}
