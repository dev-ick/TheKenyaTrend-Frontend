import { fetchPostBySlug, fetchCategories, fetchPostsByCategory } from "@/lib/api";
import { notFound } from "next/navigation";
import MainContent from "@/app/components/MainContent";
import { Post } from "@/types/post";
import { Category } from "@/lib/api";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fixed: notFound() cannot be in ||
  const post = await fetchPostBySlug(slug);
  if (!post) notFound(); // Throws early, type-safe

  let categories: Category[] = [];
  let groupedPosts: Record<string, Post[]> = {};

  try {
    categories = await fetchCategories();

    for (const cat of categories) {
      const posts = await fetchPostsByCategory(cat.slug);

      const readAlso = posts.filter((p) => p.is_read_also).slice(0, 1);
      const affiliate = posts.filter((p) => p.is_affiliate).slice(0, 1);

      const specialPost =
        readAlso.length > 0 && Math.random() < 0.5
          ? readAlso[0]
          : affiliate.length > 0
          ? affiliate[0]
          : null;

      const regularPosts = posts
        .filter((p) => !p.is_read_also && !p.is_affiliate)
        .slice(0, 4);

      groupedPosts[cat.slug] = specialPost
        ? [...regularPosts, specialPost]
        : regularPosts;
    }
  } catch (error) {
    console.error("Failed to fetch categories or posts:", error);
  }

  return (
    <div>
      <MainContent post={post} groupedPosts={groupedPosts} categories={categories} />
    </div>
  );
}
export const dynamic = 'force-dynamic';
