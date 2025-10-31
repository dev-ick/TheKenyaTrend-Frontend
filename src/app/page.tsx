import Link from "next/link";
import { fetchAllPosts } from "../lib/api";
import { Post } from "@/types/post";

function timeAgo(dateString?: string) {
  if (!dateString) return "";
  const diff = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

export default async function HomePage() {
  const rawPosts = await fetchAllPosts();

  // Fixed: Safe cast to Post[]
  const posts = (Array.isArray(rawPosts)
    ? rawPosts
    : Object.values(rawPosts).flat()
  ) as Post[];

  const featuredPosts = posts.filter(p => p.is_featured).slice(0, 4);
  const trendingPosts = posts.filter(p => p.is_trending).slice(0, 6);
  const sponsoredPosts = posts.filter(p => p.is_sponsored);
  const editorsRaw = posts.filter(p => p.is_editor_pick).slice(0, 6);

  const sponsoredForEditors = sponsoredPosts
    .filter(s => !editorsRaw.some(e => e.slug === s.slug))
    .slice(0, 2);

  let editorsChoice = [...editorsRaw];
  if (sponsoredForEditors.length > 0) {
    const firstPart = editorsRaw.slice(0, Math.max(0, 6 - sponsoredForEditors.length));
    editorsChoice = [...firstPart, ...sponsoredForEditors];
  }

  const usedSlugs = new Set(editorsChoice.map(p => p.slug));
  const fillers = posts
    .filter(p => !usedSlugs.has(p.slug) && !p.is_featured)
    .slice(0, 6 - editorsChoice.length);
  editorsChoice = [...editorsChoice, ...fillers];

  const fallbackImage =
    "https://res.cloudinary.com/dfepod4q0/image/upload/v1759245188/placeholder-hero_pcaegu.jpg";

  return (
    <div className="min-h-screen bg-white">
      {/* Trending Section */}
      {trendingPosts.length > 0 && (
        <section className="bg-gray-100 py-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-10">
              <div className="flex-1 border-t-2 border-blue-700"></div>
              <h2 className="px-6 text-2xl font-bold text-indigo-600 bg-gray-100 relative z-10">
                Trending
              </h2>
              <div className="flex-1 border-t-2 border-blue-700"></div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingPosts.map(post => (
                <Link key={post.slug} href={`/posts/${post.slug}`} className="group block">
                  <article className="bg-white rounded-lg shadow-sm hover:shadow-md overflow-hidden transition-shadow">
                    <img
                      src={
                        post.featured_image
                          ? `${post.featured_image}?f_auto,q_auto,w_800`
                          : fallbackImage
                      }
                      alt={post.title}
                      className="w-full aspect-[16/9] object-cover"
                      loading="lazy"
                    />
                    <div className="p-3">
                      <h3 className="text-lg font-bold line-clamp-2 text-gray-900 group-hover:text-indigo-600 underline-hover transition-colors">
                        {post.title}
                      </h3>
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>{post.category?.name || "General"}</span>
                        <span>{timeAgo(post.published_date)}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="container mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">
        <main className="lg:col-span-2 space-y-12">
          {/* Featured */}
          <div>
            <div className="flex items-center mb-10">
              <div className="flex-1 border-t-2 border-blue-700"></div>
              <h2 className="px-6 text-2xl font-bold text-indigo-600 bg-white relative z-10">
                Featured
              </h2>
              <div className="flex-1 border-t-2 border-blue-700"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map(post => (
                <Link key={post.slug} href={`/posts/${post.slug}`} className="group block">
                  <article className="bg-white rounded-lg shadow-sm hover:shadow-md overflow-hidden transition-shadow">
                    <img
                      src={
                        post.featured_image
                          ? `${post.featured_image}?f_auto,q_auto,w_800`
                          : fallbackImage
                      }
                      alt={post.title}
                      className="w-full aspect-[16/9] object-cover"
                      loading="lazy"
                    />
                    <div className="p-3">
                      <h3 className="text-lg font-bold line-clamp-2 text-gray-900 group-hover:text-indigo-600 underline-hover transition-colors">
                        {post.title}
                      </h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          {/* Editor's Choice */}
          {editorsChoice.length > 0 && (
            <div>
              <div className="flex items-center mb-10">
                <div className="flex-1 border-t-2 border-blue-700"></div>
                <h2 className="px-6 text-2xl font-bold text-indigo-600 bg-white relative z-10">
                  Editor's Choice
                </h2>
                <div className="flex-1 border-t-2 border-blue-700"></div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {editorsChoice.map(post => (
                  <Link key={post.slug} href={`/posts/${post.slug}`} className="group block">
                    <article className="bg-white rounded-lg shadow-sm hover:shadow-md overflow-hidden transition-shadow">
                      <img
                        src={
                          post.featured_image
                            ? `${post.featured_image}?f_auto,q_auto,w_600`
                            : fallbackImage
                        }
                        alt={post.title}
                        className="w-full aspect-square object-cover"
                        loading="lazy"
                      />
                      <div className="p-3">
                        <h3 className="text-base font-bold line-clamp-2 text-gray-900 group-hover:text-indigo-600 underline-hover transition-colors">
                          {post.title}
                        </h3>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Breaking News */}
          <div>
            <div className="flex items-center mb-6">
              <div className="flex-1 border-t-2 border-blue-700"></div>
              <h3 className="px-6 text-xl font-bold text-indigo-600 bg-white relative z-10">
                Breaking News
              </h3>
              <div className="flex-1 border-t-2 border-blue-700"></div>
            </div>
            <div className="space-y-3">
              {trendingPosts.slice(0, 4).map(post => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="group flex items-center gap-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <img
                    src={post.featured_image || fallbackImage}
                    alt={post.title}
                    className="w-16 h-16 object-cover rounded"
                    loading="lazy"
                  />
                  <span className="text-sm font-medium line-clamp-2 text-gray-900 group-hover:text-indigo-600 underline-hover transition-colors">
                    {post.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* AD SLOTS */}
          <div className="h-64 bg-gray-200 flex items-center justify-center text-gray-600">
            <span className="text-lg font-medium">ADVERTISEMENT</span>
          </div>

          <div className="h-64 bg-gray-200 flex items-center justify-center text-gray-600">
            <span className="text-lg font-medium">ADVERTISEMENT</span>
          </div>

          <div className="h-64 bg-gray-200 flex items-center justify-center text-gray-600">
            <span className="text-lg font-medium">ADVERTISEMENT</span>
          </div>
        </aside>
      </section>

      {/* FULL-WIDTH AD ABOVE FOOTER */}
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-600 mt-2 mb-0">
        <span className="text-xl font-medium">ADVERTISEMENT (Full Width)</span>
      </div>
    </div>
  );
}