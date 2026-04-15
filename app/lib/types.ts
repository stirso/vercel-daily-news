export type ResponseType = {
  success: boolean;
  data?: Record<string, string | number | boolean | null | undefined| never>[];
  error?: string;
}

export type ImageType = {
  src: string;
  alt: string;
  caption?: string;	
}

export type ParagraphType = {
  text: string;
}

export type HeadingType = {
  level: 2 | 3;
  text: string;	
}

export type BlockquoteType = {
  text: string;
}

export type UnorderedListType = {
  items: string[];
}

export type OrderedListType = {
  items: string[];
}
export type ContentBlock = {
  paragraph: ParagraphType;	// A paragraph of text
  heading: HeadingType; // A section heading (h2 or h3)
  blockquote: BlockquoteType;	// A highlighted quote
  "unordered-list": UnorderedListType; // A bulleted list
  "ordered-list": OrderedListType; // A numbered list
  image: ImageType; // An image with optional caption
}

export type Article = {
  blocks: ContentBlock[];
}

export type BreakingNews = {
  articleId: string;
  category: string;
  headline: string;
  id: string;
  publishedAt: string;
  summary: string;
  urgent: boolean;
}