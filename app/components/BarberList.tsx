"use client";
import { memo, useMemo } from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";
import axios from "axios";

// Lazy load کردن ShimmerEffect
const ShimmerEffect = dynamic(() => import("./ShimmerEffect"), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />,
});

// Fetcher برای SWR
const fetcher = (url: string) =>
  axios
    .get(url)
    .then((res) => (Array.isArray(res.data.results) ? res.data.results : []));

// بهینه‌سازی BarberList
const BarberList = memo(
  ({ search, isShop }: { search: string; isShop: string }) => {
    const apiUrl = `https://lookee.nwhco.ir/aapi/barbers?search=${encodeURIComponent(
      search
    )}&is_shop=${encodeURIComponent(isShop)}`;

    const {
      data: barbers,
      error,
      isLoading,
    } = useSWR(apiUrl, fetcher, {
      revalidateOnFocus: false,
      dedupingInterval: 2000,
      fallbackData: [],
    });
    const barberItems = useMemo(() => {
      if (isLoading) return null;
      if (error) {
        return (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-red-500 font-medium bg-red-50 inline-block px-6 py-3 rounded-lg shadow-sm">
              خطا در بارگذاری داده‌ها: {error.message || "مشکل ناشناخته"}
            </p>
          </div>
        );
      }
      if (!barbers || barbers.length === 0) {
        return (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-gray-500 font-medium bg-gray-50 inline-block px-6 py-3 rounded-lg shadow-sm">
              هیچ آرایشگاهی یافت نشد
            </p>
          </div>
        );
      }

      return barbers.map((barber: any, index: number) => {
        // تولید key منحصربه‌فرد
        const uniqueKey = barber.id
          ? barber.id
          : `${barber.fullname || "unknown"}-${
              barber.address || "no-address"
            }-${index}`;

        return (
          <div
            key={uniqueKey}
            className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 overflow-hidden border border-gray-100 group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="p-6 relative z-10">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-2 group-hover:text-indigo-600 transition-colors duration-200">
                {barber.fullname || "بدون نام"}
              </h2>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {barber.address || "آدرس نامشخص"}
              </p>
              <div className="flex items-center mb-4">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="ml-2 text-gray-700 font-medium">
                  {barber.rate ?? "بدون امتیاز"}{" "}
                  <span className="text-gray-500 text-sm">
                    ({barber.reviews_count ?? 0} نظر)
                  </span>
                </span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {(barber.services || []).map((service: string, idx: number) => (
                  <li
                    key={idx}
                    className="text-sm text-gray-700 bg-indigo-50 px-3 py-1 rounded-full shadow-sm hover:bg-indigo-100 transition-colors duration-200"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 border-t border-gray-100">
              <button className="w-full py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                مشاهده جزئیات
              </button>
            </div>
          </div>
        );
      });
    }, [barbers, isLoading, error]);

    return (
      <div className="container mx-auto px-4 py-8">
        {isLoading && <ShimmerEffect />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {barberItems}
        </div>
      </div>
    );
  }
);

BarberList.displayName = "BarberList";
export default BarberList;
