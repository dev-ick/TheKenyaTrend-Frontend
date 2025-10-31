// src/types/post.ts
export interface Post {
  id?: string;
  slug: string;
  title: string;
  body: string;
  excerpt?: string;
  published_date: string;
  featured_image?: string;
  category?: {
    id?: string;
    name: string;
    slug: string;
  };
  subcategory?: {
    id?: string;
    name: string;
    slug: string;
  };
  author_name?: string;
  date_published?: string;
  date_modified?: string;

  // Flags for special sections
  is_featured?: boolean;
  is_trending?: boolean;
  is_sponsored?: boolean;
  is_editor_pick?: boolean;
  is_read_also?: boolean;
  is_affiliate?: boolean;
  is_breaking?: boolean;
  meta_description: string;
}
