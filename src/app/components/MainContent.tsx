"use client";

import Link from "next/link";
import { Post } from "@/types/post";
import { Category } from "@/lib/api"
import { Clock } from "lucide-react";
import SocialSidebar from "@/app/components/SocialSidebar";

interface MainContentProps {
  post: Post;
  groupedPosts?: Record<string, Post[]>;
  categories?: Category[];
}

export default function MainContent({
  post,
  groupedPosts = {},
  categories = [],
}: MainContentProps) {
  if (!post) return <p>Loading...</p>;

  const timeAgo = (dateString?: string) => {
    if (!dateString) return "";
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  // Filter In Partnership posts
  const partnershipPosts = Object.values(groupedPosts)
    .flat()
    .filter((p) => p.is_sponsored && !p.is_read_also && !p.is_affiliate)
    .slice(0, 5);

  // Filter Breaking News posts
  const breakingNewsPosts = Object.values(groupedPosts)
    .flat()
    .filter((p) => p.is_breaking && !p.is_read_also && !p.is_affiliate)
    .slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6 min-h-screen">
      {/* Left Column: Social Media Icons */}
      <aside className="md:w-1/6 w-full md:sticky top-0 self-start">
        <SocialSidebar /> {/* ✅ responsive icon section */}
      </aside>

      {/* Center Column: Main Content */}
      <main className="md:w-3/5 w-full space-y-8">
        <article className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <span className="font-medium text-indigo-600">
              {post.category?.name || "General"}
            </span>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-gray-400" />
              <time>{timeAgo(post.published_date)}</time>
            </div>
          </div>
          <img
            src={
              post.featured_image ||
              "https://res.cloudinary.com/dfepod4q0/image/upload/v1759245188/placeholder-hero_pcaegu.jpg"
            }
            alt={post.title}
            className="w-full aspect-[16/9] object-cover rounded mb-4"
            loading="lazy"
          />
          <div
            className="prose max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </article>

        {/* Category Sections */}
        {categories.map((cat) => (
          <section key={cat.slug} className="space-y-6">
            <div className="relative flex justify-center items-center">
              <h2 className="text-2xl font-bold text-violet-700 text-center bg-white px-4 relative z-10">
                {cat.name}
              </h2>
              <div className="absolute inset-y-0 left-0 right-0 h-[2px] bg-violet-700 top-1/2 transform -translate-y-1/2"></div>
            </div>
            {(groupedPosts[cat.slug] || []).slice(0, 5).map((p) => (
              <Link
                key={p.slug}
                href={`/posts/${p.slug}`}
                className="block bg-gray-50 p-4 rounded hover:shadow flex items-center gap-4 relative"
              >
                <img
                  src={
                    p.featured_image ||
                    "https://res.cloudinary.com/dfepod4q0/image/upload/v1759245188/placeholder-hero_pcaegu.jpg"
                  }
                  alt={p.title}
                  className="w-20 h-20 object-cover rounded"
                  loading="lazy"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 line-clamp-2">
                    {p.title}
                  </h3>
                  {p.is_read_also && (
                    <span className="absolute top-2 right-2 text-xs text-white bg-green-600 px-2 py-1 rounded">
                      Read Also
                    </span>
                  )}
                  {p.is_affiliate && (
                    <span className="absolute top-2 right-2 text-xs text-white bg-blue-600 px-2 py-1 rounded">
                      Affiliate
                    </span>
                  )}
                </div>
              </Link>
            ))}
            <div className="bg-gray-200 h-32 flex items-center justify-center rounded">
              <span className="text-gray-600">Ad Placeholder</span>
            </div>
          </section>
        ))}
      </main>

      {/* Right Column: Breaking News and Partnership */}
      <aside className="md:w-1/4 w-full md:sticky top-0 self-start">
        <div className="bg-white rounded-lg shadow-sm p-4 space-y-6">
          {/* Breaking News */}
          <div className="space-y-6">
            <div className="relative flex justify-center items-center">
              <h2 className="text-lg font-bold text-violet-700 text-center bg-white px-4 relative z-10">
                Breaking News
              </h2>
              <div className="absolute inset-y-0 left-0 right-0 h-[2px] bg-violet-700 top-1/2 transform -translate-y-1/2"></div>
            </div>
            {breakingNewsPosts.length > 0 ? (
              breakingNewsPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/posts/${p.slug}`}
                  className="block bg-gray-50 p-4 rounded hover:shadow flex items-center gap-4"
                >
                  <img
                    src={
                      p.featured_image ||
                      "https://res.cloudinary.com/dfepod4q0/image/upload/v1759245188/placeholder-hero_pcaegu.jpg"
                    }
                    alt={p.title}
                    className="w-20 h-20 object-cover rounded"
                    loading="lazy"
                  />
                  <h3 className="font-semibold text-gray-800 line-clamp-2">
                    {p.title}
                  </h3>
                </Link>
              ))
            ) : (
              <p className="text-gray-600">No breaking news available.</p>
            )}
            <div className="bg-gray-200 h-[300px] flex items-center justify-center rounded">
              <span className="text-gray-600">Ad Placeholder</span>
            </div>
          </div>

          {/* In Partnership */}
          <div className="space-y-6">
            <div className="relative flex justify-center items-center">
              <h2 className="text-lg font-bold text-violet-700 text-center bg-white px-4 relative z-10">
                In Partnership
              </h2>
              <div className="absolute inset-y-0 left-0 right-0 h-[2px] bg-violet-700 top-1/2 transform -translate-y-1/2"></div>
            </div>
            {partnershipPosts.length > 0 ? (
              partnershipPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/posts/${p.slug}`}
                  className="block bg-gray-50 p-4 rounded hover:shadow flex items-center gap-4"
                >
                  <img
                    src={
                      p.featured_image ||
                      "https://res.cloudinary.com/dfepod4q0/image/upload/v1759245188/placeholder-hero_pcaegu.jpg"
                    }
                    alt={p.title}
                    className="w-20 h-20 object-cover rounded"
                    loading="lazy"
                  />
                  <h3 className="font-semibold text-gray-800 line-clamp-2">
                    {p.title}
                  </h3>
                </Link>
              ))
            ) : (
              <p className="text-gray-600">No partnership posts available.</p>
            )}
            <div className="bg-gray-200 h-[300px] flex items-center justify-center rounded">
              <span className="text-gray-600">Ad Placeholder</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
