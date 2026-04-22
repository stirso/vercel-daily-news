'use client';

import BtnSubscribe from "./buttons/btn-subscribe";

type PaywallProps = {
  isSubscribed: boolean;
}

export default function Paywall ({
  isSubscribed,
}: Readonly<PaywallProps>) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 lg:gap-8 absolute left-0 bottom-0 h-full p-4 lg:p-8 bg-linear-to-t from-slate-900/80 via-gray-400/60 to-slate-300/50 z-5">
      <div className="w-full flex justify-center items-center">
        <span className="text-lg lg:text-xl font-semibold text-center">
          This content is only available to subscribers. Want to view the full article?
        </span>
      </div>
      <BtnSubscribe isSubscribed={isSubscribed} isPaywall={true} />
    </div>
  );
}
