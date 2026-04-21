import type { Metadata } from 'next'
import { metadata } from '../layout';
import { getArticles, getArticleCategories } from '../lib/articles';
import { Articles, CategoryList, ResponseType } from '../lib/types';
import SearchBody from '../ui/articles/search-body';


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
          url: '',
          width: 1200,
          height: 630,
          alt: "Search for specific topics by keywords or filter by category our articles.",
        },
      ],
      type: 'website'
    },
  }
}

type SearchProps = {
  searchParams: Promise<{
    search?: string;
    filter?: string;
  }>
}

export default async function Search ({ searchParams }: SearchProps) {
  const {
    search,
    filter
  } = await searchParams;

  const categoriesResponse: ResponseType = await getArticleCategories();
  const categories: CategoryList = categoriesResponse.data as never as CategoryList;
  const list: ResponseType = await getArticles(false, 9, {
    page: 1,
    category: filter !== '' ? filter : '',
    search: search !== '' ? search : ''
  })
  const articles: Articles = list?.data ? list.data as never as Articles : [];

  return (
    <div className="w-full container px-4 flex flex-col justify-between items-start pt-8 gap-8 lg:gap-16">
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-3xl lg:text-5xl font-bold mb-0 max-w-full md:max-w-[23ch]">
          Search Articles
        </h1>
      </div>
      <SearchBody categories={categories || []} search={search} filter={filter} articles={articles} />
    </div>
  );
}
