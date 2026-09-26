export type BlogPostCard = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateISO: string;
  imageUrl: string;
  href: string;
  category: string;
};

export type BlogPost = BlogPostCard & {
  contentHtml: string;
};

export type BlogListResult = {
  posts: BlogPostCard[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

export const BLOG_PER_PAGE = 12;
export const BLOG_REVALIDATE_SECONDS = 3600;
