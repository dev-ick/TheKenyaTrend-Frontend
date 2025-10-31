"use client";

import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types/post";
import { Clock } from "lucide-react";
import { useState } from "react";


interface Props {
  post: Post;
}

export default function MainPost({ post }: Props) {
  const [expanded, setExpanded] = useState(false);

  const daysAgo = Math.floor(
    (Date.now() - new Date(post.published_date).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const toggleExpanded = () => setExpanded(!expanded);

  // ✅ JSON-LD schema for SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    author: {
      "@type": "Person",
      name: post.author_name || "Victor Oirere",
    },
    publisher: {
      "@type": "Organization",
      name: "TheTrend254",
    },
    datePublished: post.published_date,
    description: post.excerpt || post.meta_description || "",
  };

  return (
    <article className="bg-white rounded-lg shadow-md p-6 space-y-4">
      {/* ✅ JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Featured Image */}
      {post.featured_image && (
        <Image
          src={`${post.featured_image}?f_auto,q_auto,c_fill,g_auto,w_900,h_500`}
          alt={post.title}
          width={900}
          height={500}
          className="w-full h-[450px] object-cover bg-gray-50 rounded"
          priority={false}
        />
      )}

      <h1 className="text-3xl font-bold">{post.title}</h1>

      {/* Category & Published Time */}
      <div className="flex items-center justify-between mb-4">
        {post.category && (
          <Link
            href={`/category/${post.category.slug}`}
            className="text-blue-600 border border-blue-600 px-2 py-0.5 rounded text-xs hover:bg-blue-50"
          >
            {post.category.name}
          </Link>
        )}
        <div className="flex items-center space-x-1 text-blue-600 text-xs">
          <Clock className="w-4 h-4 text-red-300" />
          <span>{daysAgo} days ago</span>
        </div>
      </div>

      {/* Post Content */}
      <div
        className={`prose transition-max-h duration-500 ${
          expanded ? "max-h-full" : "max-h-40 overflow-hidden"
        }`}
        style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          lineHeight: "1.8",
          fontSize: "1.05rem",
          letterSpacing: "0.3px",
          color: "#1f2937",
          marginBottom: "1.2em",
        }}
        dangerouslySetInnerHTML={{ __html: post.body }}
      />

      <button
        onClick={toggleExpanded}
        className="text-blue-600 hover:underline"
      >
        {expanded ? "Collapse" : "Read Full Story →"}
      </button>
    </article>
  );
}
