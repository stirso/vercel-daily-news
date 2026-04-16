import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getArticleBySlug } from '@/app/lib/articles'
import type { Article, ResponseType } from '@/app/lib/types'
import { RenderArticleContent } from '@/app/lib/helpers'
import { Suspense } from 'react'
// ✅ Direct data access - preferred approach
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { slug } = await params
//   const post = await fetchPostBySlug(slug)
 
//   if (!post) {
//     return {
//       title: 'Post Not Found',
//       description: 'The requested blog post could not be found.',
//     }
//   }
 
//   return {
//     title: post.title, // Layout template adds " | VAF Blog" suffix
//     description: post.excerpt,
//     keywords: post.tags.join(', '),
//     authors: [{ name: post.author.name }],
//     alternates: {
//       canonical: `/${slug}`, // metadataBase resolves to absolute URL
//     },
//     openGraph: {
//       title: post.title,
//       description: post.excerpt,
//       images: [
//         {
//           url: post.coverImage,
//           width: 1200,
//           height: 630,
//           alt: post.title,
//         },
//       ],
//       type: 'article',
//       publishedTime: post.publishedAt.toISOString(),
//       authors: [post.author.name],
//     },
//   }
// }
type Props = {
  params: Promise<{ slug: string }>
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post: ResponseType = await getArticleBySlug(slug)
  const data: Article = post.data as never as Article;
  const publishedDate = new Date(data.publishedAt);
  console.log("POST > post", post);
  // if (!post) {
  //   notFound()
  // }
 
  return (
    <div className="w-full container px-4 flex flex-col justify-between items-start pt-8 gap-8 lg:gap-16">
      <article className="flex flex-col gap-4">
        <header className="flex flex-col gap-2">
          <h1 className="font-bold text-4xl">{data.title}</h1>
          <p className="text-sm text-gray-500">
            {publishedDate.toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500">By {data.author.name}</p>
        </header>

        <div className="prose max-w-none">
          <RenderArticleContent blocks={data.content} />
        </div>

        <footer className="flex flex-wrap gap-2 border-t pt-4">
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-600"
            >
              {tag}
            </span>
          ))}
        </footer>
      </article>
    </div>
  )
}