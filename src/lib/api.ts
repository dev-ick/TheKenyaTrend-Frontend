import { Post } from "@/types/post";

// API Base
// API Base
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";


if (!process.env.NEXT_PUBLIC_API_URL) {
  console.warn("NEXT_PUBLIC_API_URL not set, using:", API_BASE);
}

// Fetch helper
async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  return res.json();
}

// Normalize post
function normalizePost(post: any): Post {
  return {
    ...post,
    is_affiliate: !!post.is_affiliate,
    is_featured: !!post.is_featured,
    is_trending: !!post.is_trending,
    is_read_also: !!post.is_read_also,
    is_sponsored: !!post.is_sponsored,
    is_breaking: !!post.is_breaking,
    is_editor_pick: !!post.is_editor_pick,
  };
}

// ==================== POSTS ====================

export async function fetchAllPosts(filters?: {
  category?: string;
  subcategory?: string;
  limit?: number;
  trending?: boolean;
  featured?: boolean;
  is_breaking?: boolean;
  is_sponsored?: boolean;
  search?: string; // NEW: for search
}): Promise<Post[]> {
  const params = new URLSearchParams();
  if (filters?.category) params.append("category", filters.category);
  if (filters?.subcategory) params.append("subcategory", filters.subcategory);
  if (filters?.limit) params.append("limit", filters.limit.toString());
  if (filters?.trending) params.append("trending", "true");
  if (filters?.featured) params.append("featured", "true");
  if (filters?.is_breaking) params.append("is_breaking", "true");
  if (filters?.is_sponsored) params.append("is_sponsored", "true");
  if (filters?.search) params.append("search", filters.search); // NEW

  const queryString = params.toString();
  const url = queryString
    ? `${API_BASE}/posts/?${queryString}`
    : `${API_BASE}/posts/`;

  // ✅ Fixed: Explicitly typing fetched data as Post[]
  const data = await fetchJson<Post[]>(url);

  // Handle DRF paginated or direct array responses
  const results = Array.isArray(data) ? data : (data as any).results || [];

  return results.map(normalizePost);
}

// Single post
export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  try {
    const post = await fetchJson<Post>(`${API_BASE}/posts/${slug}/`);
    return normalizePost(post);
  } catch {
    return null;
  }
}

// Category
export async function fetchPostsByCategory(
  categorySlug: string
): Promise<Post[]> {
  return fetchAllPosts({ category: categorySlug });
}

// Subcategory
export async function fetchPostsBySubcategory(
  categorySlug: string,
  subcategorySlug: string
): Promise<Post[]> {
  try {
    let posts = await fetchAllPosts({
      category: categorySlug,
      subcategory: subcategorySlug,
    });
    if (posts.length === 0) {
      console.warn("Subcategory backend filter failed, using client-side fallback.");
      posts = await fetchAllPosts({ category: categorySlug });
      posts = posts.filter((p) => p.subcategory?.slug === subcategorySlug);
    }
    return posts;
  } catch (e) {
    console.error("Subcategory fetch error:", e);
    return [];
  }
}

// Trending / Featured
export async function fetchTrendingPosts(limit = 6): Promise<Post[]> {
  return fetchAllPosts({ trending: true, limit });
}

export async function fetchFeaturedPosts(limit = 4): Promise<Post[]> {
  return fetchAllPosts({ featured: true, limit });
}

// BREAKING NEWS (max 4)
export async function fetchBreakingNews(): Promise<Post[]> {
  const posts = await fetchAllPosts({ is_breaking: true, limit: 4 });
  return posts
    .filter((p) => !p.is_read_also && !p.is_affiliate)
    .slice(0, 4);
}

// IN PARTNERSHIP (max 4)
export async function fetchPartnershipPosts(): Promise<Post[]> {
  const posts = await fetchAllPosts({ is_sponsored: true, limit: 4 });
  return posts
    .filter((p) => !p.is_read_also && !p.is_affiliate)
    .slice(0, 4);
}

// ==================== CATEGORIES ====================

export interface Category {
  id: number;
  name: string;
  slug: string;
  is_trending?: boolean;
  subcategories?: Category[];
}

export async function fetchCategories(): Promise<Category[]> {
  const data = await fetchJson<any>(`${API_BASE}/categories/`);
  const results = Array.isArray(data) ? data : data.results || [];
  return results.map((c: any) => ({
    ...c,
    subcategories: c.subcategories || [],
  }));
}

export async function fetchTrendingCategory(): Promise<Category[]> {
  const cats = await fetchCategories();
  return cats.filter((c) => c.is_trending);
}
