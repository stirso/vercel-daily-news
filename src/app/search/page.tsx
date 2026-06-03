import { Suspense } from 'react';
import type { Metadata } from 'next'
import { metadata } from '../layout';
import SearchWrapper from '@/components/ui/search/search-wrapper';

// ✅ Direct data access - preferred approach
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${metadata?.openGraph?.title || 'Vercel Daily News'} | Search`,
    description: "Search for specific topics by keywords or filter by category our articles.",
    keywords: "changelogs deepdives stories updates vercel nextjs react js",
    alternates: {
      canonical: `/search`,
    },
    openGraph: {
      title: `${metadata?.openGraph?.title || 'Vercel Daily News'} | Search`,
      description: "Search for specific topics by keywords or filter by category our articles.",
      images: [
        {
          url: '/vercel.svg',
          width: 1200,
          height: 630,
          alt: "Search for specific topics by keywords or filter by category our articles.",
        },
      ],
      type: 'website'
    },
  }
}

export type SearchProps = {
  searchParams: Promise<{
    search?: string;
    filter?: string;
  }>
}

export default async function Search ({ searchParams }: SearchProps) {
  const filters = searchParams.then(sp => ({ search: sp.search, filter: sp.filter }))

  return (
    <div className="w-full container px-4 flex flex-col justify-between items-start pt-8 gap-8 lg:gap-16">
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-3xl lg:text-5xl font-bold mb-0 max-w-full md:max-w-[23ch]">
          Search Articles
        </h1>
      </div>
      <Suspense fallback={null}>
        <SearchWrapper filters={filters} />
      </Suspense>
    </div>
  );
}
