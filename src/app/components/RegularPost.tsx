// src/components/RegularPost.tsx
"use client";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Post } from "@/types/post";

interface Props {
  post: Post;
  expanded: boolean;
  onToggle: () => void;
}

// helper to calculate "x days ago"
const timeAgo = (dateString?: string) => {
  if (!dateString) return "";
  const diff = Date.now() - new Date(dateString).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return days === 0 ? "Today" : `${days} days ago`;
};

export default function RegularPost({ post, expanded, onToggle }: Props) {
  const sentences = post.body.split(". ").map((s) => s.trim() + ".");

  return (
    <article className="bg-white rounded-lg shadow-md p-6 space-y-4 mb-6">
      {post.featured_image && (
        <img
          src={`${post.featured_image}?f_auto,q_auto,c_fit,w_600,h_400`}
          alt={post.title}
          className="w-full h-[300px] object-cover rounded-lg bg-gray-50"
          loading="lazy"
        />
      )}

      <h3 className="text-xl font-semibold">{post.title}</h3>

      <div className="flex items-center justify-between text-xs text-blue-600 mb-2">
        {post.category && (
          <Link
            href={`/category/${post.category.slug}`}
            className="border border-blue-600 px-2 py-0.5 rounded text-xs hover:bg-blue-50"
          >
            {post.category.name}
          </Link>
        )}
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4 text-red-300" />
          <span>{timeAgo(post.published_date)}</span>
        </div>
      </div>

      <div className="prose">
        {(expanded ? sentences : sentences.slice(0, 3)).map((s, i) => (
          <p key={i} className="mb-4">
            {s}
          </p>
        ))}
      </div>

      <button onClick={onToggle} className="text-blue-600 hover:underline">
        {expanded ? "Collapse" : "Read More →"}
      </button>
    </article>
  );
}
