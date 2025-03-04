"use client";
import { memo } from "react";

const ShimmerEffect = memo(() => {
  const shimmerItems = Array(6).fill(null);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-8 bg-gradient-to-br from-gray-50 to-gray-100">
      {shimmerItems.map((_, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg 
                    transition-shadow duration-300 animate-pulse 
                    border border-gray-100/50 overflow-hidden 
                    relative before:absolute before:inset-0 
                    before:-translate-x-full before:animate-[shimmer_2s_infinite] 
                    before:bg-gradient-to-r before:from-transparent 
                    before:via-gray-100/50 before:to-transparent"
        >
          <div className="h-7 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4 mb-4"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-2/3 mb-3"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-1/3 mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-5/12"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-7/12"></div>
          </div>
        </div>
      ))}
    </div>
  );
});

ShimmerEffect.displayName = "ShimmerEffect";
export default ShimmerEffect;
