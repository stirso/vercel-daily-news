'use client';
import { useState, ChangeEvent, Suspense } from 'react';
import { Articles, CategoryList, ResponseType } from '@/app/lib/types';
import { Search } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { getArticles } from '@/app/lib/articles';
import ArticleGrid from './article-grid';

type Props = {
  categories: CategoryList;
  search?: string;
  filter?: string;
  articles?: Articles;
}

export default function SearchBody(props: Props) {
  const { categories, search, filter, articles } = props;
  const [searchVal, setSearchVal] = useState(search ? decodeURI(search) : '')
  const [currentPage, setCurrentPage] = useState(1); // use this later on for pagination
  const [currentFilter, setCurrentFilter] = useState(filter || '');
  const [articleList, setArticleList] = useState<Articles>(articles || []);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleGetArticles = async (newSearch?: string, newFilter?: string) => {
    let limit = 9
    setIsLoading(true);
    if (newSearch || newFilter) {
      if (newFilter !== '' || newSearch !== '') limit = 5;
    }
    const list: ResponseType = await getArticles(false, limit, {
      page: currentPage,
      category: newFilter !== '' ? newFilter : '',
      search: newSearch !== '' ? newSearch : ''
    })
    const data: Articles = list?.data ? list.data as never as Articles : [];
    
    setArticleList(() => data);
    setIsLoading(false);
  }

  const handleSearch = useDebouncedCallback((e: ChangeEvent) => {
    const target = (e.target as HTMLInputElement)
    const targetVal = target.value
    const params = new URLSearchParams(searchParams);

    if (targetVal !== '' && targetVal.length >= 3) {
      setSearchVal(targetVal)
      target.dataset.value = targetVal
      target.value = targetVal
      params.set('search', encodeURI(targetVal))
    } else {
      target.value = targetVal
      params.delete('search')
    }

    replace(`${pathname}?${params.toString()}`);
    handleGetArticles(targetVal, '');
  }, 300);

  const handleCurrentFilter = (e: ChangeEvent) => {
    const params = new URLSearchParams(searchParams);
    const filterVal = (e.target as HTMLSelectElement)?.selectedOptions[0].value
    
    if (filterVal !== '') {
      setCurrentFilter(filterVal)
      params.set('filter', filterVal)
    } else {
      setCurrentFilter(filterVal)
      params.delete('filter')
    }

    handleGetArticles('', filterVal)
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex w-full h-full flex-nowrap justify-center items-center gap-6 max-w-300 mx-auto">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-2 relative">
            <input
              className="w-full lg:min-w-112.5 px-4 pr-8 py-2 border border-black rounded-md"
              defaultValue={searchVal}
              id="search"
              name="search"
              onChange={(e) => {handleSearch(e)}}
              placeholder="Search..."
              type="text"
            />
            <Search className="absolute size-6 right-2 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div className="flex">
          <select
            className="px-4 py-2 border border-black rounded-md hover:cursor-pointer"
            id="filter"
            name="filter"
            onChange={(e) => handleCurrentFilter(e)}
            value={currentFilter}
          >
            <option
              value=""
            >
              Choose Category
            </option>
            {categories.map((category, i) => {
              return (
                <option key={`category_filter_${category.slug}_${i}`} value={category.slug}>{category.name}</option>
              )
            })}
          </select>
        </div>
      </div>
      
      {articleList && articleList.length > 0 
      ?
      (
        <ArticleGrid articles={articleList} isLoading={isLoading} />
      )
      : (
        <div className="flex w-full justify-center items-center p-8">
          <span className="text-lg">No articles found.</span>
        </div>
      )} 
    </div>
  )
}