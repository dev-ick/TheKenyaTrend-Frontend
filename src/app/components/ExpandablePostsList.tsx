"use client";
import { useState } from "react";
import { Post } from "@/types/post";
import ExpandablePost from "./ExpandablePost";

interface Props {
  posts: Post[];
}

export default function ExpandablePostsList({ posts }: Props) {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const handleToggle = (slug: string) => {
    setExpandedSlug(prev => (prev === slug ? null : slug));
  };

  return (
    <>
      {posts.map(post => (
        <ExpandablePost
          key={post.slug}
          post={post}
          expanded={expandedSlug === post.slug}
          onToggle={() => handleToggle(post.slug)}
        />
      ))}
    </>
  );
}
