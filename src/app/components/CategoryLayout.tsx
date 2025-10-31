"use client";

import Link from "next/link";
import { Post } from "@/types/post";
import SocialSidebar from "@/app/components/SocialSidebar";

interface CategoryLayoutProps {
  title: string;                 // e.g. "Business and Economy"
  posts: Post[];                 // filtered posts for the page
  breakingNews: Post[];          // is_breaking posts
  partnership: Post[];           // is_sponsored posts
  children?: React.ReactNode;    // optional extra content (ads, etc.)
}

export default function CategoryLayout({
  title,
  posts,
  breakingNews,
  partnership,
  children,
}: CategoryLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6 min-h-screen">
      
      {/* LEFT – Social Sidebar (reused, responsive) */}
      <aside className="md:w-1/6 w-full md:sticky top-0 self-start">
        <SocialSidebar />
      </aside>

      {/* CENTER – Main Posts */}
      <main className="md:w-3/5 w-full space-y-6">
        {/* Page Title */}
        <div className="relative flex justify-center items-center">
          <h1 className="text-2xl font-bold text-violet-700 bg-white px-4 relative z-10">
            {title}
          </h1>
          <div className="absolute inset-y-0 left-0 right-0 h-[2px] bg-violet-700 top-1/2 transform -translate-y-1/2"></div>
        </div>

        {/* Posts List */}
        {posts.length > 0 ? (
          posts.map((p) => (
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
                {p.excerpt && (
                  <p className="text-gray-600 mt-1 line-clamp-2">{p.excerpt}</p>
                )}
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
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">No posts found.</p>
        )}

        {children}
      </main>

      {/* RIGHT – Breaking News + Partnership */}
      <aside className="md:w-1/4 w-full md:sticky top-0 self-start">
        <div className="bg-white rounded-lg shadow-sm p-4 space-y-6">
          {/* BREAKING NEWS */}
          <div className="space-y-6">
            <div className="relative flex justify-center items-center">
              <h2 className="text-lg font-bold text-violet-700 bg-white px-4 relative z-10">
                Breaking News
              </h2>
              <div className="absolute inset-y-0 left-0 right-0 h-[2px] bg-violet-700 top-1/2 transform -translate-y-1/2"></div>
            </div>

            {breakingNews.length > 0 ? (
              breakingNews.map((p) => (
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

          {/* IN PARTNERSHIP */}
          <div className="space-y-6">
            <div className="relative flex justify-center items-center">
              <h2 className="text-lg font-bold text-violet-700 bg-white px-4 relative z-10">
                In Partnership
              </h2>
              <div className="absolute inset-y-0 left-0 right-0 h-[2px] bg-violet-700 top-1/2 transform -translate-y-1/2"></div>
            </div>

            {partnership.length > 0 ? (
              partnership.map((p) => (
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
