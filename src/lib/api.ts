import { Post } from "@/types/post";

// API Base
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

// NEW: Detect if we're in build mode (no env var = likely build/static export)
const IS_BUILD_TIME = !process.env.NEXT_PUBLIC_API_BASE_URL;

if (IS_BUILD_TIME) {
  console.warn("Build time detected: Skipping API fetches, using mocks.");
}

// Fetch helper - UPDATED with build-time safety
async function fetchJson<T>(url: string): Promise<T> {
  if (IS_BUILD_TIME) {
    // Mock response for build (adjust structure to match your API)
    if (url.includes('/posts/')) return [] as T; // Empty posts array
    if (url.includes('/categories/')) return [] as T; // Empty categories
    throw new Error(`Mock not implemented for ${url}`);
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  return res.json();
}

// Normalize post (unchanged)
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
  search?: string;
}): Promise<Post[]> {
  if (IS_BUILD_TIME) return []; // Fast empty return for build

  const params = new URLSearchParams();
  if (filters?.category) params.append("category", filters.category);
  if (filters?.subcategory) params.append("subcategory", filters.subcategory);
  if (filters?.limit) params.append("limit", filters.limit.toString());
  if (filters?.trending) params.append("trending", "true");
  if (filters?.featured) params.append("featured", "true");
  if (filters?.is_breaking) params.append("is_breaking", "true");
  if (filters?.is_sponsored) params.append("is_sponsored", "true");
  if (filters?.search) params.append("search", filters.search);
  const queryString = params.toString();
  const url = queryString
    ? `${API_BASE}/posts/?${queryString}`
    : `${API_BASE}/posts/`;
  const data = await fetchJson<Post[]>(url);
  const results = Array.isArray(data) ? data : (data as any).results || [];
  return results.map(normalizePost);
}

// Single post - UPDATED
export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  if (IS_BUILD_TIME) return null; // Skip for build

  try {
    const post = await fetchJson<Post>(`${API_BASE}/posts/${slug}/`);
    return normalizePost(post);
  } catch {
    return null;
  }
}

// Category - UPDATED (similar pattern for all functions)
export async function fetchPostsByCategory(
  categorySlug: string
): Promise<Post[]> {
  return fetchAllPosts({ category: categorySlug });
}

export async function fetchPostsBySubcategory(
  categorySlug: string,
  subcategorySlug: string
): Promise<Post[]> {
  if (IS_BUILD_TIME) return []; // Add this line

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

export async function fetchTrendingPosts(limit = 6): Promise<Post[]> {
  return fetchAllPosts({ trending: true, limit });
}

export async function fetchFeaturedPosts(limit = 4): Promise<Post[]> {
  return fetchAllPosts({ featured: true, limit });
}

export async function fetchBreakingNews(): Promise<Post[]> {
  const posts = await fetchAllPosts({ is_breaking: true, limit: 4 });
  return posts
    .filter((p) => !p.is_read_also && !p.is_affiliate)
    .slice(0, 4);
}

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
  if (IS_BUILD_TIME) return []; // Add this

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
