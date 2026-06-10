'use server';

import { Suspense } from 'react';
import type { Metadata } from 'next'
import { metadata } from '../layout';
import SearchWrapper from '@/components/ui/search/search-wrapper';
import type { SearchProps } from '../search/page';
import { ArticleGridSkeleton } from '@/components/ui/skeletons/skeletons';

// ✅ Direct data access - preferred approach
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${metadata?.openGraph?.title || 'Vercel Daily News'} | Articles`,
    description: "View a list of articles from The Vercel Daily News archive.",
    keywords: "changelogs deepdives stories updates vercel nextjs react js",
    alternates: {
      canonical: `/articles`,
    },
    openGraph: {
      title: `${metadata?.openGraph?.title || 'Vercel Daily News'} | Articles`,
      description: "View a list of articles from The Vercel Daily News archive.",
      images: [
        {
          url: '/vercel.svg',
          width: 1200,
          height: 630,
          alt: "View a list of articles from The Vercel Daily News archive.",
        },
      ],
      type: 'website'
    },
  }
}

export default async function ArticlesPage ({ searchParams }: SearchProps) {
  const filters = searchParams.then(sp => ({ search: sp.search, filter: sp.filter }))

  return (
    <div className="w-full container px-4 flex flex-col justify-between items-start pt-8 gap-8 lg:gap-16">
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-3xl lg:text-5xl font-bold mb-0 max-w-full md:max-w-[23ch]">
          Articles
        </h1>
      </div>
      <Suspense fallback={<ArticleGridSkeleton isPage />}>
        <SearchWrapper filters={filters} />
      </Suspense>
    </div>
  );
}
