import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import clsx from 'clsx'
import { getArticleBySlug } from '@/services/articles'
import type { Article, ResponseType } from '@/types/types'
import { RenderArticleContent } from '@/lib/helpers'
import PostTrending from '@/components/ui/articles/post-trending'
import { checkUserSubscriptionState } from '@/services/subscription'
import Paywall from '@/components/ui/paywall'
import Loading from '@/components/ui/skeletons/loading'

type Props = {
  slug: string
}

export default async function ArticleWrapper({ slug }: Props) {
  const post: ResponseType = await getArticleBySlug(slug)
  const data: Article = post.data as never as Article;
  const subStatus = await checkUserSubscriptionState();
  const isSubscribed = subStatus.success

  if (!post.success) {
    notFound();
  }

  const fullContent = isSubscribed ? data.content : data.content.slice(0, 1);

  return (
    <Suspense fallback={<Loading />}>
      <div className={clsx("relative w-full", !isSubscribed && "p-8" )}>
        <div className={clsx(
            "relative flex flex-col prose w-full max-w-full md:max-w-4/5 mx-auto *:last:mb-0 **:text-pretty **:wrap-break-word",
            "[&_p]:mb-4 [&_p]:max-w-full",
            "[&_ul]:pl-8 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:list-outside [&_ol]:pl-8 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:list-outside [&_li]:pb-2",
            "[&_h3]:text-lg [&_h3]:lg:text-2xl [&_h3]:font-semibold [&_h3]:mb-2",
            "[&_a]:underline"
          )}
        >
          <RenderArticleContent blocks={fullContent} />
        </div>
        
        {!isSubscribed ? <Paywall /> : null}
      </div>

      <footer className="flex flex-col gap-8">
        <div className="flex flex-wrap gap-2 border-y py-4 items-center">
          <span>Tags: </span>{data.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-gray-400/30 px-2 py-1 text-sm text-gray-600 font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
        <PostTrending />
      </footer>
    </Suspense>
  )
}