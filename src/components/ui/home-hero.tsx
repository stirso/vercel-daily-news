import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Article } from "@/types/types";

type HomeHeroProps = {
  article?: Article;
}

export default async function HomeHero ({ article }: Readonly<HomeHeroProps>) {

  return (
    <div className="flex w-full h-full flex-col justify-start items-center lg:grid lg:grid-cols-2 gap-6 lg:gap-8">
      <div className="flex w-full flex-col gap-8 justitfy-start items-start">
        <h1 className="text-3xl lg:text-5xl font-bold mb-0 max-w-full md:max-w-[23ch]">
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
            href="/search"
          >
            <span>Browse Articles</span>
            <ArrowRight className="w-4" />
          </Link>
        </div>
      </div>
      {article ? (
        <div className="flex flex-col justify-start items-between gap-4 bg-gray-100/50 h-full">
          <div className="relative overflow-hidden aspect-video w-full bg-white">
            {article.image && 
              <Image
                alt={article.title}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                src={article.image}
              />
            }
          </div>
          <div className="flex flex-col gap-4 px-4 pb-4 items-between">
            <Link
              href={`/articles/${article.slug}`}
              className="flex flex-col justify-start items-between gap-4 bg-gray-100/50 h-full"
            >
              <h2 className="text-lg lg:text-2xl font-semibold">
                {article.title}
              </h2>
            </Link>
            <p className="text-sm text-gray-800">
              {article.excerpt}
            </p>
          </div>
        </div>
      ) :null}
    </div>
  );
}
