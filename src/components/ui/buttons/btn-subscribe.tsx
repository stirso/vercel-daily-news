'use client';

import { useState, useEffect, useRef } from 'react';
import { UserMinus, UserPlus } from 'lucide-react';
import { checkUserSubscriptionState, clearCookies, deactivateUser, subscribeUser, setCookies } from '@/services/subscription';
import type { SubscriptionResponseType } from '@/types/types';
import clsx from 'clsx';
import Loading from '../skeletons/loading';
import { usePathname, useRouter } from 'next/navigation';

export type BtnSubscribeProps = {
  isSubscribed: boolean;
  isPaywall?: boolean;
  isHome?: boolean;
}

export default function BtnSubscribe ({
  isSubscribed,
  isPaywall,
  isHome,
}: Readonly<BtnSubscribeProps>) {
  const [userSubscribed, setUserSubscribed] = useState(isSubscribed || false);
  const [pending, setPending] = useState(false);
  const subRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = async () => {    
    if (userSubscribed) {
      setPending(true);
      const userToken = await clearCookies();
      if (userToken !== '') {
        const unsubscribeResponse: SubscriptionResponseType = await deactivateUser(userToken);

        if ( unsubscribeResponse.success) {
          setUserSubscribed(false);

          if (isHome) {
            // window.location.reload();
            router.replace(pathname)
          }
        }
        setPending(false);
      }      
    } else {
      setPending(true);
      const subscribeResponse: SubscriptionResponseType = await subscribeUser();
      if (subscribeResponse.success) {
        const userToken = String(subscribeResponse.data?.token);
        const cookiesSet = await setCookies(userToken);
        setUserSubscribed(true);

        if ((isPaywall && cookiesSet) || (isHome && cookiesSet)) {
          window.location.reload();
          router.replace(pathname)
        }
      }
      setPending(false);
    }
  };

  useEffect(() => {
    const checkStatus = async () => {
      const subStatus = await checkUserSubscriptionState();
      setUserSubscribed(subStatus.success)
    }
    const subBtn = document.getElementsByClassName('subscribeBtn')

    if (subBtn) {
      Array.from(subBtn).forEach(btn => {
        const loaderElem = btn.querySelector('.subscribeLoading');

        (btn as HTMLButtonElement).disabled = pending
        if (pending) {
          loaderElem?.classList.remove('hidden');
          (btn as HTMLButtonElement).classList.add('cursor-wait', 'opacity-65!');
        } else {
          loaderElem?.classList.add('hidden');
          (btn as HTMLButtonElement).classList.remove('cursor-wait', 'opacity-65!');
        }
      })
      checkStatus();
    }
  }, [pending])

  return (
    <button
      className={clsx(
        "subscribeBtn relative flex items-center justify-center gap-2 md:p-2 md:px-3 hover:cursor-pointer",
        isPaywall ? "bg-white border-black border hover:opacity-90 px-4 py-2" : "hover:opacity-65",
        isHome ? "rounded-md border-2" : ""
      )}
      onClick={handleClick}
      ref={subRef}
    >
      {userSubscribed ? <UserMinus className="w-6" /> : <UserPlus className="w-6" />}
      <span>{userSubscribed ? 'Unsubscribe' : 'Subscribe'}</span>
      <Loading classname="subscribeLoading hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-5 min-h-auto! p-0!" svgClass="size-8" />
    </button>
  );
}
