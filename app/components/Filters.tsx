"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { memo } from "react";

const Filters = memo(() => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (filterType: string) => {
    const params = new URLSearchParams(searchParams);
    filterType === "all"
      ? params.delete("is_shop")
      : params.set("is_shop", filterType);
    router.replace(`/barbers?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 my-8 px-4 animate-fade-in">
      <button
        onClick={() => handleFilterChange("all")}
        className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border border-blue-500/20 hover:border-blue-400/40bg-gradient-to-r from-blue-600 to-blue-700"
      >
        همه
      </button>
      <button
        onClick={() => handleFilterChange("true")}
        className="px-6 py-2.5 bg-green-600 text-white font-medium rounded-full shadow-lg hover:bg-green-700 hover:shadow-xl transition-all duration-300  transform hover:scale-105 active:scale-95 border border-green-500/20 hover:border-green-400/40 bg-gradient-to-r from-green-600 to-emerald-700"
      >
        نقاط فروشگاه‌ها
      </button>
      <button
        onClick={() => handleFilterChange("false")}
        className="px-6 py-2.5 bg-purple-600 text-white font-medium rounded-full shadow-lg hover:bg-purple-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border border-purple-500/20 hover:border-purple-400/40 bg-gradient-to-r from-purple-600 to-violet-700"
      >
        آرایشگران فردی
      </button>
    </div>
  );
});

Filters.displayName = "Filters";
export default Filters;
