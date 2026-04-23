"use client";
 
// Root error boundary - catches all runtime errors not handled by nested boundaries
// Must be a Client Component: error boundaries use React state internally
 
import { useEffect } from "react";
import Link from "next/link";

// Rename to ErrorBoundary to avoid shadowing global Error
export default function ErrorBoundary({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // biome-ignore lint/suspicious/noConsole: Error logging is intentional for debugging
    console.error("Root error boundary caught:", error);
  }, [error]);
 
  return (
    <div className="w-full container px-4 flex flex-col justify-between items-start pt-8 gap-8 lg:gap-16">
      <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
        <h2 className="mb-2 font-bold text-2xl text-red-800">
          Something went wrong
        </h2>
        <p className="mb-4 text-red-600">
          {error.message || "An unexpected error occurred"}
        </p>
        {/* digest is Next.js's auto-generated error ID for production - a unique hash that correlates client errors with server logs */}
        {error.digest && (
          <p className="mb-4 font-mono text-red-400 text-xs">
            Error ID: {error.digest}
          </p>
        )}
        <Link
        href="/"
        className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
      >
        Go home
      </Link>
      </div>
    </div>
  );
}