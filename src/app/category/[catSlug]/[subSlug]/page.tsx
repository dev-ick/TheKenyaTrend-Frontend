// src/app/category/[catSlug]/[subSlug]/page.tsx
import { fetchPostsBySubcategory, fetchBreakingNews, fetchPartnershipPosts } from '@/lib/api';
import CategoryLayout from '@/app/components/CategoryLayout';

interface Props {
  params: Promise<{ catSlug: string; subSlug: string }>;
}

export default async function SubcategoryPage({ params }: Props) {
  const { catSlug, subSlug } = await params;

  const [posts, breaking, partnership] = await Promise.all([
    fetchPostsBySubcategory(catSlug, subSlug),
    fetchBreakingNews(),
    fetchPartnershipPosts(),
  ]);

  const title = `${subSlug.replace(/-/g, ' ')} in ${catSlug.replace(/-/g, ' ')}`;

  return (
    <CategoryLayout
      title={title}
      posts={posts}
      breakingNews={breaking}
      partnership={partnership}
    />
  );
}