'use server';

import type { Metadata } from 'next'
import { metadata } from '../layout';
import { getArticles, getArticleCategories } from '../../services/articles';
import { Articles, CategoryList, ResponseType } from '../../types/types';
import SearchBody from '../../components/ui/articles/search-body';
import type { SearchProps } from '../search/page';

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
  const {
    search,
    filter
  } = await searchParams;

  const categoriesResponse: ResponseType = await getArticleCategories();
  const categories: CategoryList = categoriesResponse.data as never as CategoryList;
  const list: ResponseType = await getArticles(false, 9, {
    page: 1,
    category: '',
    search: ''
  })
  const articles: Articles = list?.data ? list.data as never as Articles : [];

  return (
    <div className="w-full container px-4 flex flex-col justify-between items-start pt-8 gap-8 lg:gap-16">
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-3xl lg:text-5xl font-bold mb-0 max-w-full md:max-w-[23ch]">
          Articles
        </h1>
      </div>
      <SearchBody
        articles={articles}
        categories={categories || []}
        filter={filter}
        search={search}
        showFilters={false}
      />
    </div>
  );
}
