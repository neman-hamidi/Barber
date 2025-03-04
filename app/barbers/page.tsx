"use client";
import { Suspense, memo } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import BarberList from "../components/BarberList";
import ErrorBoundary from "../components/ErrorBoundary";

// کامپوننت‌های Lazy Loaded
const Filters = dynamic(() => import("../components/Filters"), {
  ssr: false,
  loading: () => <MiniLoading />,
});

const SearchBar = dynamic(() => import("../components/SearchBar"), {
  ssr: false,
  loading: () => <MiniLoading />,
});

// MiniLoading
const MiniLoading = memo(() => (
  <div className="w-full max-w-lg mx-auto mb-10 px-4 animate-pulse">
    <div className="h-12 bg-gray-200 rounded-xl" />
  </div>
));
MiniLoading.displayName = "MiniLoading";

// کامپوننت داخلی که از useSearchParams استفاده می‌کنه
const BarbersPageContent = memo(() => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("search") || "";
  const isShop = searchParams?.get("is_shop") || "";

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-teal-50 py-16 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
            <div className="w-96 h-96 bg-indigo-200 rounded-full blur-3xl absolute top-0 left-0 transform -translate-x-1/2 translate-y-1/4" />
            <div className="w-96 h-96 bg-teal-200 rounded-full blur-3xl absolute bottom-0 right-0 transform translate-x-1/2 -translate-y-1/4" />
          </div>

          <header className="text-center mb-12 animate-fade-in-down">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-teal-500">
                لیست آرایشگاه‌ها
              </span>
            </h1>
            <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
              بهترین آرایشگاه‌ها را با ما پیدا کنید!
            </p>
          </header>

          <section className="max-w-5xl mx-auto mb-16 space-y-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 to-teal-200 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              <div className="relative z-10 transform group-hover:-translate-y-1 transition-transform duration-300">
                <SearchBar />
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 to-teal-200 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              <div className="relative z-10 transform group-hover:-translate-y-1 transition-transform duration-300">
                <Filters />
              </div>
            </div>
          </section>

          <main className="animate-fade-in-up">
            <BarberList search={search} isShop={isShop} />
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
});
BarbersPageContent.displayName = "BarbersPageContent";

// صفحه اصلی با Suspense
const BarbersPage = () => (
  <Suspense
    fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-teal-50 py-16 animate-pulse">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-16 bg-gray-200 rounded-xl max-w-2xl mx-auto" />
          </div>
          <div className="max-w-5xl mx-auto mb-16 space-y-8">
            <MiniLoading />
            <MiniLoading />
          </div>
        </div>
      </div>
    }
  >
    <BarbersPageContent />
  </Suspense>
);

export default BarbersPage;
