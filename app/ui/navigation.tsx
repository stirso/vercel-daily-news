import Link from 'next/link';
import Header from './header';
import Image from "next/image";
import { UserPlus } from 'lucide-react';

export default function Navigation () {
  return (
    <header className="flex w-full h-full flex-col justify-center items-center">
      <div className="container px-4 flex justify-between items-center">
        <div className="flex w-full max-w-full justify-between items-center">
          <Link
            className="flex items-end justify-start"
            href="/"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            <span className="font-medium">Vercel Daily</span>
          </Link>
          <div className="flex flex-1 flex-row justify-start">
            <Header />
          </div>
          <button className="flex items-center justify-center gap-2 md:p-2 md:px-3">
            <UserPlus className="w-6" /> <span>Subscribe</span>
          </button>
        </div>
      </div>
    </header>
  );
}
