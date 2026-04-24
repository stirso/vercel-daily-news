'use client';

import Image from "next/image";
import Link from "next/link";
import type { Articles } from "@/types/types";
import Loading from "../skeletons/loading";

type Props = {
  articles: Articles;
  isLoading?: boolean;
}

export default function ArticleGrid (props: Props) {
  const { articles, isLoading } = props
  console.log('articles > ', articles)
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {articles?.map((article) => (
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
                    sizes="(max-width: 768px) 50vw, 33vw"
                    src={article.image}
                  />
                }
                <span className="bg-gray-500/85 p-2 text-xs text-white uppercase absolute font-medium right-4 top-4 rounded-sm">
                  {article.category}
                </span>
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
      )}
    </>
  );
}
