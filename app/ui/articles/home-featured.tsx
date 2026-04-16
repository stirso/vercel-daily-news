import Link from "next/link";
import { getArticles } from '@/app/lib/articles';
import type { Articles, ResponseType } from '@/app/lib/types';


export default async function HomeFeatured () {
  const articles: ResponseType = await getArticles();
  
  if (!articles.success) return null;

  const articleItems = (articles.data as never as Articles).slice(0, 6);
  console.log('HOME FEATURED > articles', articleItems);

  return (
    <div className="flex w-full h-full flex-col justify-center items-center gap-6">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {articleItems.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="flex flex-col justify-start items-start gap-2"
          >
            <h3 className="text-lg font-semibold">
              {article.title}
            </h3>
            <p className="text-sm text-gray-500">
              {article.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
