import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getArticleBySlug } from '@/app/lib/articles'
import type { Article, ResponseType } from '@/app/lib/types'
import { RenderArticleContent } from '@/app/lib/helpers'
import PostTrending from '@/app/ui/articles/post-trending'
import clsx from 'clsx'

// ✅ Direct data access - preferred approach
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post: ResponseType = await getArticleBySlug(slug);
  const data: Article = post.data as never as Article;
  
  console.log('POST IN GET METADATA > ', post)
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
      title: data.title,
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
        <header className="flex flex-col gap-4">
          <div className="relative overflow-hidden aspect-square md:aspect-5/2 w-full bg-gray-100/50 rounded-lg before:content-[''] before:z-1 before:absolute before:w-full before:h-full before:bg-gray-300/50">
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
            
            <h1 className="font-bold text-3xl lg:text-5xl absolute z-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-[25ch] text-balance px-6">{data.title}</h1>
          </div>
          <div className="text-sm text-gray-500">
            By {data.author.name} | {publishedDate.toLocaleDateString()}
          </div>
        </header>

        <div className={clsx(
            "flex flex-col prose max-w-full md:max-w-4/5 mx-auto *:last:mb-0 **:text-pretty **:wrap-break-word",
            "[&_p]:mb-4 [&_p]:max-w-full",
            "[&_ul]:pl-8 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:list-outside [&_ol]:pl-8 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:list-outside [&_li]:pb-2",
            "[&_h3]:text-lg [&_h3]:lg:text-2xl [&_h3]:font-semibold [&_h3]:mb-2",
            "[&_a]:underline"
          )}
        >
          <RenderArticleContent blocks={data.content} />
        </div>

        <footer className="flex flex-col gap-8">
          <div className="flex flex-wrap gap-2 border-y py-4">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-600 font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
          <PostTrending />
        </footer>
      </article>
    </div>
  )
}