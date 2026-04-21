'use client';

import { UserMinus, UserPlus } from 'lucide-react';
import { subscribeUser } from '@/app/lib/subscription';
import type { ResponseType } from '@/app/lib/types';

type BtnSubscribeProps = {
  isSubscribed: boolean;
}
export default function BtnSubscribe (props: BtnSubscribeProps) {
  const { isSubscribed } = props;

  return (
    <button className="flex items-center justify-center gap-2 md:p-2 md:px-3 hover:opacity-65 hover:cursor-pointer">
      {isSubscribed ? <UserMinus className="w-6" /> : <UserPlus className="w-6" />} <span>Subscribe</span>
    </button>
  );
}
