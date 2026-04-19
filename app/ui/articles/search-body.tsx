'use client';
import { useState, useEffect, ChangeEvent, useCallback } from 'react';
import { Articles, CategoryList, ResponseType } from '@/app/lib/types';
import { Search } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { getArticles } from '@/app/lib/articles';
import ArticleGrid from './article-grid';

type Props = {
  data: CategoryList;
}

export default function SearchBody(props: Props) {
  const [currentSearch, setCurrentSearch] = useState('');
  const [currentFilter, setCurrentFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [articleList, setArticleList] = useState<Articles>();
  const [isLoaded, setIsLoaded] = useState(false);
  const { data } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleGetArticles = useCallback(async () => {
    const list: ResponseType = await getArticles(false, 9, {
      page: currentPage,
      category: currentFilter !== '' ? currentFilter : undefined,
      search: currentSearch !== '' ? currentSearch : undefined
    })
    const data: Articles = list?.data ? list.data as never as Articles : [];
    setArticleList(data);
    
    if (!isLoaded) setIsLoaded(true);
  }, [currentFilter, currentPage, currentSearch, isLoaded])

  const handleCurrentFilter = (e: ChangeEvent) => {
    const params = new URLSearchParams(searchParams);
    const searchVal = (e.target as HTMLSelectElement)?.selectedOptions[0].value
    
    if (searchVal !== '') {
      setCurrentFilter(searchVal)
      params.set('filter', searchVal)
    } else {
      params.delete('filter')
    }

    replace(`${pathname}?${params.toString()}`);

    handleGetArticles()
  }

  const handleSearch = useDebouncedCallback((e: ChangeEvent) => {
    const target = (e.target as HTMLInputElement)
    const targetVal = target.value.trim()
    const params = new URLSearchParams(searchParams);
    
    if (targetVal !== '') {
      setCurrentSearch(targetVal)
      target.dataset.value = targetVal
      params.set('search', encodeURI(targetVal))
    } else {
      params.delete('search')
    }
    replace(`${pathname}?${params.toString()}`);

    handleGetArticles()
  }, 300);

  if (!isLoaded) {
    handleGetArticles();
    console.log('ArticleList > ', articleList)
  }
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex w-full h-full flex-nowrap justify-center items-center gap-6 max-w-300 mx-auto">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-2 relative">
            <input
              className="w-full lg:min-w-112.5 px-4 pr-8 py-2 border border-black rounded-md"
              data-value={currentSearch}
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
              disabled
              value=""
            >
              Choose Category
            </option>
            {data.map((category, i) => {
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
        <ArticleGrid articles={articleList} />
      )
      : null} 
    </div>
  )
}