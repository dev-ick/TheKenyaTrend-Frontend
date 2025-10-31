"use client";
import { Post } from "@/types/post";
import Link from "next/link";

interface Props {
  posts: Post[];
}

export default function SubcategoryClient({ posts }: Props) {
  return (
    <div className="space-y-4">
      {posts.map(post => (
        <Link key={post.slug} href={`/posts/${post.slug}`}>
          <div className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-50 transition">
            <h3 className="text-lg font-semibold text-blue-600">{post.title}</h3>
            {post.excerpt && <p className="text-gray-600 mt-1">{post.excerpt}</p>}
          </div>
        </Link>
      ))}
    </div>
  );
}