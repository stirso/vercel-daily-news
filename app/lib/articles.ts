"use cache";

import { cacheLife, cacheTag } from 'next/cache'
import type { ResponseType } from './types';

const API_URL = process.env.NEWS_API_URL || '';
const API_TOKEN = process.env.NEWS_API_TOKEN || '';

export async function getBreakingNews() {
  try {
    const path = `${API_URL}/breaking-news`

    console.log('BREAKING NEWS ROUTE > ', { API_URL, API_TOKEN })
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
    console.log('BREAKING NEWS ROUTE > response', data);
    return { success: true, data: data.data}
  } catch (error) {
    return { error: `${error}: CATCH Failed to fetch breaking news.`, success: false }
  }
}

export async function getTrendingArticles() {
  try {
    const path = `${API_URL}/articles/trending`

    console.log('TRENDING ROUTE > ', { API_URL, API_TOKEN })
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