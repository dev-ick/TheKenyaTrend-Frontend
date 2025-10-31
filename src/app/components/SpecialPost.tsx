// src/components/SpecialPost.tsx
"use client";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Post } from "@/types/post";

interface Props {
  post: Post;
  expanded: boolean;
  onToggle: () => void;
  isReadAlso?: boolean;
}

const timeAgo = (dateString?: string) => {
  if (!dateString) return "";
  const diff = Date.now() - new Date(dateString).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return days === 0 ? "Today" : `${days} days ago`;
};

export default function SpecialPost({
  post,
  expanded,
  onToggle,
  isReadAlso = false,
}: Props) {
  const sentences = post.body.split(". ").map((s) => s.trim() + ".");

  return (
    <article className="relative bg-white rounded-lg shadow-md p-4">
      {/* READ ALSO badge */}
      {isReadAlso && (
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded font-bold z-10">
          READ ALSO
        </span>
      )}

      {/* Featured Image */}
      {post.featured_image && (
        <img
          src={`${post.featured_image}?f_auto,q_auto,c_fit,w_600,h_400`}
          alt={post.title}
          className={`w-full h-48 object-cover rounded-lg mt-4`}
          loading="lazy"
        />
      )}

      <h4 className="text-lg font-semibold mt-2">{post.title}</h4>

      {/* Category & Published Date */}
      <div className="flex items-center justify-between text-xs text-blue-600 mb-2 mt-2">
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

      {/* Post Body */}
      <div className="prose">
        {(expanded ? sentences : sentences.slice(0, 3)).map((s, i) => (
          <p key={i} className="mb-4">
            {s}
          </p>
        ))}
      </div>

      {/* Read More / Collapse Button */}
      <button onClick={onToggle} className="text-blue-600 hover:underline block mt-2">
        {expanded ? "Collapse" : "Read More →"}
      </button>
    </article>
  );
}
