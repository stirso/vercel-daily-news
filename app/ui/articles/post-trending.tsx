import Image from "next/image";
import Link from "next/link";
import { getTrendingArticles } from '@/app/lib/articles';
import type { Articles, ResponseType } from '@/app/lib/types';


export default async function PostTrending () {
  const articles: ResponseType = await getTrendingArticles();
  
  if (!articles.success) return null;

  const articleItems = (articles.data as never as Articles).slice(0, 3);
  // console.log('Trending > articles', articleItems);

  return (
    <div className="flex w-full h-full flex-col justify-center items-center gap-6">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl lg:text-3xl font-bold">
            Trending Now
          </h2>
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
            className="flex flex-col justify-start items-between gap-4 bg-gray-100/50 h-full"
          >
            <div className="relative overflow-hidden aspect-video w-full bg-white">
              {article.image && 
                <Image
                  alt={article.title}
                  className="object-cover"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  src={article.image}
                />
              }
            </div>
            <div className="flex flex-col gap-4 px-4 pb-4 items-between">
              <h3 className="text-lg lg:text-2xl font-semibold">
                {article.title}
              </h3>
              <p className="text-sm text-gray-800">
                {article.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
