import Link from "next/link";
import { Articles } from "@/types/types";
import ArticleGrid from "./article-grid";

type HomeFeaturedProps = {
  articles?: Articles;
}

export default async function HomeFeatured ({ articles }: Readonly<HomeFeaturedProps>) {

  return (
    <div className="flex w-full h-full flex-col justify-center items-center gap-6">
      <div className="flex justify-between w-full gap-2 items-start md:items-center">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl lg:text-3xl font-bold">
            Featured
          </h2>
          <span className="text-base text-gray-500">
            Handpicked stories from the team.
          </span>
        </div>
        <Link
          className="text-gray-500 text-base hover:cursor-pointer min-w-fit"
          href="/articles"
        >
          View All
        </Link>
      </div>
      {articles && <ArticleGrid articles={articles} />}
    </div>
  );
}
