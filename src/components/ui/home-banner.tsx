import Link from 'next/link';
import { TriangleAlert } from 'lucide-react';
import { getArticleBySlug, getBreakingNews } from '../../services/articles';
import type { Article, BreakingNews, ResponseType } from '../../types/types';

export default async function HomeBanner () {
  const breakingNews: ResponseType = await getBreakingNews();

  if (!breakingNews.success) return null;

  const { headline, articleId } = breakingNews.data as never as BreakingNews;
  const articleResponse: ResponseType = await getArticleBySlug(articleId);
  const article: Article = articleResponse?.data as never as Article;

  return (
    <div className="flex w-full h-full flex-col justify-center items-center bg-zinc-600">
      <div className="container px-4 flex justify-between items-center">
        <div className="flex w-full max-w-full justify-start items-center py-2 gap-4">
          <TriangleAlert className="stroke-white" />
          <div className="text-white text-base">
            {headline}
            {article ? (
              <>&nbsp;- &nbsp;
                <Link
                  href={`/articles/${article.slug}`}
                  className="text-white underline"
                >
                  Read More
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
