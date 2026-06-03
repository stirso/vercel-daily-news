'use server';

import BtnSubscribe from './btn-subscribe';
import { checkUserSubscriptionState } from '@/services/subscription';

type Props = {
  isPaywall?: boolean;
}

export default async function BtnSubscribeWrapper ({ isPaywall }: Readonly<Props>) {
  const subStatus = await checkUserSubscriptionState();
  const isSubscribed = subStatus.success

  return (
    <BtnSubscribe isPaywall={isPaywall} isSubscribed={isSubscribed} />
  );
}
