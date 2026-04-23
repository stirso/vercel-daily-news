'use client';

import { useState } from 'react';
import { UserMinus, UserPlus } from 'lucide-react';
import { clearCookies, deactivateUser, subscribeUser, setCookies } from '@/app/lib/subscription';
import type { SubscriptionResponseType } from '@/app/lib/types';
import clsx from 'clsx';

type BtnSubscribeProps = {
  isSubscribed: boolean;
  isPaywall?: boolean;
}

export default function BtnSubscribe ({
  isSubscribed,
  isPaywall,
}: Readonly<BtnSubscribeProps>) {
  const [userSubscribed, setUserSubscribed] = useState(isSubscribed || false);

  const handleClick = async () => {
    if (userSubscribed) {
      const userToken = await clearCookies();
      if (userToken !== '') {
        const unsubscribeResponse: SubscriptionResponseType = await deactivateUser(userToken);
        console.log('unsubscribe respones > ', unsubscribeResponse)

        if ( unsubscribeResponse.success) {
          setUserSubscribed(false);
        }
      }      
    } else {
      const subscribeResponse: SubscriptionResponseType = await subscribeUser();
      if (subscribeResponse.success) {
        const userToken = String(subscribeResponse.data?.token);
        const cookiesSet = await setCookies(userToken);
        setUserSubscribed(true);

        if (isPaywall && cookiesSet) {
          console.log('SHOULD RELOAD')
          window.location.reload();
        }
      }
    }
  };

  return (
    <button
      className={clsx(
        "flex items-center justify-center gap-2 md:p-2 md:px-3 hover:cursor-pointer",
        isPaywall ? "bg-white border-black border hover:opacity-90" : "hover:opacity-65"
      )}
      onClick={handleClick}
    >
      {userSubscribed ? <UserMinus className="w-6" /> : <UserPlus className="w-6" />}
      <span>{userSubscribed ? 'Unsubscribe' : 'Subscribe'}</span>
    </button>
  );
}
