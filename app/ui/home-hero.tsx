import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function HomeHero () {
  return (
    <div className="flex w-full h-full flex-col justify-start items-start gap-8">
      <h1 className="text-5xl font-bold mb-0 max-w-full md:max-w-[23ch]">
        <span className="text-base font-bold text-gray-500 uppercase block mb-2 tracking-widest">
          The Vercel Daily
        </span>
        News and insights for modern web developers.
      </h1>
      <div className="text-lg text-gray-500  md:max-w-[50ch]">
        Changelogs, engeneering deepdives, customer stories, and community updates - all in one place.
      </div>
      <div className="flex gap-4">
        <Link
          className="flex items-center justify-center gap-2 bg-black text-white rounded-md px-4 py-2  hover:opacity-65 hover:cursor-pointer"
          href="/articles"
        >
          <span>Browse Articles</span>
          <ArrowRight className="w-4" />
        </Link>
        <button className="flex items-center justify-center gap-2 rounded-md px-4 py-2 hover:text-black hover:cursor-pointer text-black border-2 border-gray-400 hover:border-black hover:text-gray-400">
          <span>Subscribe</span>
        </button>
      </div>
    </div>
  );
}
