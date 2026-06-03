"use cache";
import "server-only";


import { cacheLife, cacheTag } from 'next/cache'
import type { ArticleFilters, ResponseType } from '../types/types';

export const API_URL = process.env.NEWS_API_URL || '';
export const API_TOKEN = process.env.NEWS_API_TOKEN || '';

export async function getBreakingNews() {
  try {
    const path = `${API_URL}/breaking-news`

    const response = await fetch(path, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-vercel-protection-bypass': API_TOKEN,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch breaking news: ${response.statusText}`);
    }

    const data: ResponseType = await response.json();
    return { success: true, data: data.data}
  } catch (error) {
    return { error: `${error}: CATCH Failed to fetch breaking news.`, success: false }
  }
}

export async function getTrendingArticles() {
  "use cache";
  try {
    const path = `${API_URL}/articles/trending`
    cacheLife('trending')
    cacheTag('trending') // Invalidate when any article changes
    const response = await fetch(path, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-vercel-protection-bypass': API_TOKEN,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch trending articles: ${response.statusText}`);
    }
    
    const data: ResponseType = await response.json();
    return { success: true, data: data.data }
  } catch (error) {
    return { error: `${error}: CATCH Failed to fetch trending articles.`, success: false }
  }
}

function buildArticlesQuery (featured?:boolean, limit?: number, filter?: ArticleFilters): string {
  let queryString = '';
  const stringParams = new URLSearchParams()

  if (featured) {
    stringParams.append("featured", String(featured))
  }

  if (limit) {
    stringParams.append("limit", String(limit))
  }
  if (filter?.page) {
    stringParams.append("page", String(filter.page))
  }

  if (filter?.category) {
    stringParams.append("category", String(filter.category))
  }
  
  if (filter?.search) {
    stringParams.append("search", String(filter.search))
  }
  queryString = stringParams.toString()
  return queryString
}

export async function getArticles(featured?: boolean, limit?: number, filter?: ArticleFilters) {
  "use cache";
  try {
    let path = `${API_URL}/articles?`
    path += buildArticlesQuery(featured, limit, filter);

    cacheLife('articles')
    cacheTag('articles')

    const response = await fetch(path, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-vercel-protection-bypass': API_TOKEN,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to GET ARTICLES: ${response.statusText}`);
    }
    
    const data: ResponseType = await response.json();

    return { success: true, data: data.data, meta: data?.meta }
  } catch (error) {
    return { error: `${error}: CATCH Failed to fetch GET ARTICLES.`, success: false }
  }
}

export async function getArticleBySlug(slug: string) {
  "use cache";
  try {
    const path = `${API_URL}/articles/${slug}`
    cacheLife('articles')
    cacheTag('articles', `articles-${slug}`) // Invalidate when any article changes
    const response = await fetch(path, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-vercel-protection-bypass': API_TOKEN,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to GET ARTICLES: ${response.statusText}`);
    }
    
    const data: ResponseType = await response.json();
    return { success: true, data: data.data, meta: data?.meta }
  } catch (error) {
    return { error: `${error}: CATCH Failed to fetch GET ARTICLES.`, success: false }
  }
}

export async function getArticleCategories() {
  try {
    const path = `${API_URL}/categories`
    cacheLife('categories')
    cacheTag('categories') // Invalidate when any category changes
    const response = await fetch(path, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-vercel-protection-bypass': API_TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to GET CATEGORIES: ${response.statusText}`);
    }
    const data: ResponseType = await response.json();
    return { success: true, data: data.data, meta: data?.meta }
  } catch (error) {
    return { error: `${error}: CATCH Failed to fetch GET CATEGORIES.`, success: false }
  }
}