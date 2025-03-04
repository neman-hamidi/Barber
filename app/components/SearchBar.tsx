"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { memo } from "react";

const SearchBar = memo(() => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = useMemo(
    () => searchParams.get("search") || "",
    [searchParams]
  );
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const updateUrl = useCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParams);
      term ? params.set("search", term) : params.delete("search");
      router.replace(`/barbers?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => updateUrl(searchTerm), 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, updateUrl]);

  return (
    <div className="relative w-full max-w-lg mx-auto mb-10 px-4 animate-fade-in">
      <div className="relative group">
        <input
          type="text"
          placeholder="جستجوی آرایشگاه..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-5 py-3.5 pr-12 text-base bg-white 
                    border border-gray-200 rounded-xl shadow-md
                    focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                    focus:border-blue-500 transition-all duration-300
                    placeholder-gray-400 hover:shadow-lg
                    bg-gradient-to-r from-gray-50 to-white"
        />
        <svg
          className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 
                    text-gray-500 group-hover:text-blue-500 
                    transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
});

SearchBar.displayName = "SearchBar";
export default SearchBar;
