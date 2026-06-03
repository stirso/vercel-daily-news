import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getArticleBySlug, getArticles } from '@/services/articles'
import type { Article, ResponseType } from '@/types/types'
import { RenderArticleContent } from '@/lib/helpers'
import PostTrending from '@/components/ui/articles/post-trending'
import clsx from 'clsx'
import { metadata } from '@/app/layout'
import { checkUserSubscriptionState } from '@/services/subscription'
import Paywall from '@/components/ui/paywall'
import { Suspense } from 'react'
import Loading from '@/components/ui/skeletons/loading'
import ArticleWrapper from '@/components/ui/articles/article-wrapper'

// ✅ Direct data access - preferred approach
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post: ResponseType = await getArticleBySlug(slug);
  const data: Article = post.data as never as Article;

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested article could not be found.',
    }
  }
  
  const publishedDate = new Date(data.publishedAt);
  return {
    title: data.title,
    description: data.excerpt,
    keywords: data.tags.join(', '),
    authors: [{ name: data.author.name }],
    alternates: {
      canonical: `/${slug}`,
    },
    openGraph: {
      title: `${data.title} | ${metadata?.openGraph?.title || 'Vercel Daily News'}`,
      description: data.excerpt,
      images: [
        {
          url: data.image,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      type: 'article',
      publishedTime: publishedDate.toISOString(),
      authors: [data.author.name],
    },
  }
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const response = await getArticles(false, 100)
  return response?.data?.map((article) => ({ slug: article.slug })) ?? []
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post: ResponseType = await getArticleBySlug(slug)
  const data: Article = post.data as never as Article;

  if (!post.success) {
    notFound();
  }

  const publishedDate = new Date(data.publishedAt);

  return (
    <div className="w-full container px-4 flex flex-col justify-between items-start pt-8 gap-8 lg:gap-16">
      <article className="flex flex-col gap-8 mx-auto max-w-full lg:max-w-300">
        <header className="flex flex-col gap-6 lg:gap-8">
          <h1 className="font-bold text-3xl lg:text-5xl text-center w-full text-balance px-6">{data.title}</h1>
          <div className="relative overflow-hidden aspect-square md:aspect-5/2 w-full bg-gray-100/50 rounded-lg">
            {data.image && 
              <Image
                alt={data.title}
                className="object-cover"
                fill
                fetchPriority='high'
                loading="eager"
                sizes="(max-width: 768px) 50vw, 33vw"
                src={data.image}
              />
            }
          </div>
          <div className="text-sm text-gray-500">
            By {data.author.name} | {publishedDate.toLocaleDateString()}
          </div>
        </header>
        
        <Suspense fallback={<Loading />}>
          <ArticleWrapper slug={slug} />
        </Suspense>
      </article>
    </div>
  )
}