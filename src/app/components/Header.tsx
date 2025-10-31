"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, X, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { fetchCategories, fetchAllPosts } from "@/lib/api";

interface Subcategory {
  id: number;
  name: string;
  slug: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  subcategories: Subcategory[];
}

interface PostResult {
  slug: string;
  title: string;
  excerpt: string;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<PostResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const router = useRouter();
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load categories
  useEffect(() => {
    async function loadData() {
      try {
        const catData = await fetchCategories();
        setCategories((catData as Category[]) || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Search effect
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(async () => {
      setSearchLoading(true);
      setShowResults(true);
      try {
        const posts = await fetchAllPosts({ search: searchQuery, limit: 6 });
        setSearchResults(
          posts.map((p) => ({
            slug: p.slug,
            title: p.title,
            excerpt: p.excerpt || p.body.slice(0, 100) + "...",
          }))
        );
      } catch (error) {
        console.error("Search failed:", error);
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 300);
  }, [searchQuery]);

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target as Node) &&
        !document.querySelector("[data-search-results]")?.contains(e.target as Node)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchResultClick = (slug: string) => {
    setIsMenuOpen(false);
    setShowResults(false);
    setSearchQuery("");
    router.push(`/posts/${slug}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white" role="banner">
      {/* Top bar */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center" aria-label="Home">
            <span className="text-xl sm:text-2xl font-bold text-indigo-600">
              TheTrend
            </span>
            <Image
              src="/images/logo.png"
              alt="Kenya Trends Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </Link>

          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              if (!isMenuOpen) setTimeout(() => searchInputRef.current?.focus(), 100);
            }}
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            aria-label={isMenuOpen ? "Close search" : "Open search"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6 text-gray-600" /> : <Search className="w-6 h-6 text-gray-600" />}
          </button>
        </div>

        {/* Search Bar */}
        {isMenuOpen && (
          <div className="container mx-auto px-4 pb-3 relative">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 text-base"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Search Results Dropdown */}
            {showResults && (
              <div
                data-search-results
                className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg border max-h-96 overflow-y-auto z-50"
              >
                {searchLoading ? (
                  <div className="p-4 flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
                  </div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <button
                      key={result.slug}
                      onClick={() => handleSearchResultClick(result.slug)}
                      className="w-full text-left p-3 hover:bg-indigo-50 border-b last:border-b-0"
                    >
                      <div className="font-medium text-gray-900">{result.title}</div>
                      <div className="text-sm text-gray-600 line-clamp-1">{result.excerpt}</div>
                    </button>
                  ))
                ) : searchQuery.trim() ? (
                  <div className="p-4 text-center text-gray-500">No results found</div>
                ) : null}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Desktop Nav */}
      <nav className="bg-blue-600 hidden md:block" role="navigation" aria-label="Main navigation">
        <div className="container mx-auto px-4 py-2 flex justify-center items-center gap-6 text-white text-base font-semibold">
          <Link
            href="/"
            className="px-3 py-2 rounded-md hover:bg-white hover:text-indigo-600 whitespace-nowrap"
          >
            HOME
          </Link>

          {!loading &&
            categories.map((cat) => (
              <div key={cat.id} className="relative group">
                <Link
                  href={`/category/${cat.slug}`}
                  className="px-3 py-2 rounded-md hover:bg-white hover:text-indigo-600 whitespace-nowrap"
                >
                  {cat.name}
                </Link>
                {cat.subcategories.length > 0 && (
                  <div className="absolute left-0 mt-0 hidden group-hover:block bg-white shadow-md rounded-md z-50 min-w-[150px]">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/category/${cat.slug}/${sub.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </nav>

      {/* Mobile Nav */}
      {isMenuOpen && !showResults && (
        <nav className="bg-blue-600 md:hidden" role="navigation" aria-label="Mobile navigation">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4 text-white text-base font-semibold">
            <Link
              href="/"
              className="px-3 py-2 rounded-md hover:bg-white hover:text-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </Link>

            {!loading &&
              categories.map((cat) => (
                <div key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="px-3 py-2 rounded-md hover:bg-white hover:text-indigo-600 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                  {cat.subcategories.length > 0 && (
                    <div className="pl-6 pt-2 flex flex-col gap-2">
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/category/${cat.slug}/${sub.slug}`}
                          className="text-sm hover:bg-white hover:text-indigo-600 block"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </nav>
      )}
    </header>
  );
}