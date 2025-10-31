"use client";
import { Post } from "@/types/post";
import { useState } from "react";

interface Props {
  post: Post;
  expanded: boolean;
  onToggle: () => void;
}

export default function ExpandablePost({ post, expanded, onToggle }: Props) {
  return (
    <div className="border rounded-lg shadow-sm p-4 mb-4 bg-white">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={onToggle}
      >
        <h3 className="text-lg font-semibold">{post.title}</h3>
        <span className="text-indigo-600">{expanded ? "▲" : "▼"}</span>
      </div>

      {expanded && (
        <div className="mt-2 text-gray-700">
          {post.excerpt && <p className="mb-2">{post.excerpt}</p>}
          <a
            href={`/posts/${post.slug}`}
            className="text-indigo-600 hover:underline"
          >
            Read full article
          </a>
        </div>
      )}
    </div>
  );
}
