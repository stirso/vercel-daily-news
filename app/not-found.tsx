// Root not-found.tsx - catches all 404s not handled by nested not-found files
import Link from "next/link";
 
export default function NotFound() {
  return (
    <div className="w-full container px-4 flex flex-col justify-center items-center pt-8 gap-8 lg:gap-16">
      <h1 className="mb-4 font-bold text-4xl">404</h1>
      <p className="mb-4 text-gray-600">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
      >
        Go home
      </Link>
    </div>
  );
}