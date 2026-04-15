import { TriangleAlert } from 'lucide-react';
import { getBreakingNews } from '../lib/articles';
import type { BreakingNews, ResponseType } from '../lib/types';

export default async function HomeBanner () {
  const breakingNews: ResponseType = await getBreakingNews();

  if (!breakingNews.success) return null;

  const { headline } = breakingNews.data as never as BreakingNews;
  console.log('HOME BANNER > breakingNews', breakingNews);

  return (
    <div className="flex w-full h-full flex-col justify-center items-center bg-zinc-600">
      <div className="container px-4 flex justify-between items-center">
        <div className="flex w-full max-w-full justify-start items-center py-2 gap-4">
          <TriangleAlert className="stroke-white" />
          <div className="text-white text-base">
            {headline}
          </div>
        </div>
      </div>
    </div>
  );
}
