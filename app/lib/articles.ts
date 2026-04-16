"use cache";

import { cacheLife, cacheTag } from 'next/cache'
import type { ResponseType } from './types';

const API_URL = process.env.NEWS_API_URL || '';
const API_TOKEN = process.env.NEWS_API_TOKEN || '';

export async function getBreakingNews() {
  try {
    const path = `${API_URL}/breaking-news`

    const response = await fetch(path, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-vercel-protection-bypass': API_TOKEN,
      },
      cache: 'no-cache',
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
  try {
    const path = `${API_URL}/articles/trending`

    const response = await fetch(path, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-vercel-protection-bypass': API_TOKEN,
      },
      cache: 'no-cache',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch trending articles: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('TRENDING ROUTE > response', data);
    return { success: true, data: data.data }
  } catch (error) {
    return { error: `${error}: CATCH Failed to fetch trending articles.`, success: false }
  }
}

export async function getArticles(featured?: boolean) {
  try {
    const path = `${API_URL}/articles${featured ? '?featured=true' : ''}`
    cacheLife('featured')
    cacheTag('featured') // Invalidate when any article changes
    const response = await fetch(path, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-vercel-protection-bypass': API_TOKEN,
      },
      cache: 'no-cache',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to GET ARTICLES: ${response.statusText}`);
    }
    
    const data: ResponseType = await response.json();
    console.log('GET ARTICLES ROUTE > response', data);
    return { success: true, data: data.data, meta: data?.meta }
  } catch (error) {
    return { error: `${error}: CATCH Failed to fetch GET ARTICLES.`, success: false }
  }
}

export async function getArticleBySlug(slug: string) {
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
      cache: 'no-cache',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to GET ARTICLES: ${response.statusText}`);
    }
    
    const data: ResponseType = await response.json();
    console.log('GET ARTICLES ROUTE > response', data);
    return { success: true, data: data.data, meta: data?.meta }
  } catch (error) {
    return { error: `${error}: CATCH Failed to fetch GET ARTICLES.`, success: false }
  }
}