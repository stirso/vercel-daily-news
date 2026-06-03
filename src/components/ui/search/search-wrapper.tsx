
import { getArticles, getArticleCategories } from '@/services/articles';
import { Articles, CategoryList, ResponseType } from '@/types/types';
import SearchBody from '../articles/search-body';

export type SearchWrapperProps = {
  filters: Promise<{
    search?: string;
    filter?: string;
  }>
}

export default async function SearchWrapper ({ filters }: SearchWrapperProps) {
  const {
    search,
    filter
  } = await filters;

  const categoriesResponse: ResponseType = await getArticleCategories();
  const categories: CategoryList = categoriesResponse.data as never as CategoryList;
  const list: ResponseType = await getArticles(false, 9, {
    page: 1,
    category: filter !== '' ? filter : '',
    search: search !== '' ? search : ''
  })
  const articles: Articles = list?.data ? list.data as never as Articles : [];

  return (
    <SearchBody
      articles={articles}
      categories={categories || []}        
      filter={filter}
      search={search}
      showFilters={true}
    />
  );
}
