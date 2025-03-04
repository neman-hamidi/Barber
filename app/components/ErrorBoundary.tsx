"use client";
import { ReactNode, useState, useEffect } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

const ErrorBoundary = ({ children, fallback }: ErrorBoundaryProps) => {
  const [hasError, setHasError] = useState(false);

  // مدیریت خطاها با useEffect
  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error("ErrorBoundary caught an error:", error);
      setHasError(true);
    };

    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, []);

  // تابع برای گرفتن خطاهای رندر
  const handleError = (error: Error, info: { componentStack: string }) => {
    console.error("ErrorBoundary caught an error:", error, info);
    setHasError(true);
  };

  // ریست کردن خطا
  const resetError = () => setHasError(false);

  if (hasError) {
    return (
      fallback || (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center transform transition-all duration-300 hover:shadow-2xl">
            <div className="mx-auto mb-6 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              اوه! یه مشکلی پیش اومد
            </h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              متأسفیم، چیزی درست کار نکرد. لطفاً صفحه رو رفرش کنید یا بعداً
              دوباره امتحان کنید.
            </p>
            <button
              onClick={() => {
                resetError();
                window.location.reload();
              }}
              className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              رفرش صفحه
            </button>
          </div>
        </div>
      )
    );
  }

  try {
    return children;
  } catch (error) {
    handleError(error as Error, { componentStack: "Caught in render" });
    return null;
  }
};

export default ErrorBoundary;
