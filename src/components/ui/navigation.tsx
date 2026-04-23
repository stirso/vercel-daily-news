'use server';

import Link from 'next/link';
import Header from './header';
import Image from "next/image";
import BtnSubscribe from './buttons/btn-subscribe';
import { checkUserSubscriptionState } from '../../services/subscription';

export default async function Navigation () {
  const subStatus = await checkUserSubscriptionState();
  const isSubscribed = subStatus.success

  return (
    <header className="flex w-full h-full flex-col justify-center items-center sticky top-0 z-10 bg-white border-b">
      <div className="relative container px-4 flex justify-between items-center">
        <div className="relative flex w-full max-w-full justify-between items-center">
          <Link
            className="flex items-center justify-center gap-2 pr-4"
            href="/"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            <span className="font-medium hidden md:block">Vercel Daily</span>
          </Link>
          <div className="flex flex-1 flex-row justify-start">
            <Header />
          </div>
          <BtnSubscribe isSubscribed={isSubscribed} />
        </div>
      </div>
    </header>
  );
}
