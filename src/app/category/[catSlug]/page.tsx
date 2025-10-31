// src/app/category/[catSlug]/page.tsx
import { fetchPostsByCategory, fetchBreakingNews, fetchPartnershipPosts } from '@/lib/api';
import CategoryLayout from '@/app/components/CategoryLayout';

interface Props {
  params: Promise<{ catSlug: string }>;  // <-- Promise!
}

export default async function CategoryPage({ params }: Props) {
  const { catSlug } = await params;  // <-- AWAIT HERE

  const [posts, breaking, partnership] = await Promise.all([
    fetchPostsByCategory(catSlug),
    fetchBreakingNews(),
    fetchPartnershipPosts(),
  ]);

  const title = catSlug.replace(/-/g, ' ');

  return (
    <CategoryLayout
      title={title}
      posts={posts}
      breakingNews={breaking}
      partnership={partnership}
    />
  );
}