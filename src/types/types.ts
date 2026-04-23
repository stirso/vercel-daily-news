export type ResponseMeta = {
  pagination: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }
}

export type ResponseType = {
  success: boolean;
  data?: Record<string, string | number | boolean | Record<string, string | number >| null | undefined | never>[];
  meta?: ResponseMeta;
  error?: string;
}

export type SubscriptionResponseType = {
  success: boolean;
  data?: SubscriptionUser;
  error?: string;
}

export type SubscriptionUser = {
  token: string;
  status: string;
  subscribedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ImageType = {
  src: string;
  alt: string;
  caption?: string;	
}

export type ContentBlock = {
  type: "paragraph" | "heading" | "blockquote" | "unordered-list" | "ordered-list" | "image";
  text?:  string; // For paragraph, heading, blockquote
  level?: 2 | 3; // For heading
  items?: string[]; // For lists
  src?: string; // For image
  alt?: string; // For image
  caption?: string; // For image
}

export type Article = {
  author: {
    name: string;
    avatar?: string;
  };
  category: string;
  content: ContentBlock[];
  excerpt: string;
  featured: boolean;
  id: string;
  image:string;
  publishedAt: string;
  slug: string;
  tags: string[];
  title: string;
};

export type Articles = Article[];

export type BreakingNews = {
  articleId: string;
  category: string;
  headline: string;
  id: string;
  publishedAt: string;
  summary: string;
  urgent: boolean;
}

export type CategoryType = {
  slug: string;
  name: string;
  articleCount: number;
}

export type CategoryList = CategoryType[];

export type ArticleFilters = {
  page?: number;
  category?: string;
  search?: string;
}