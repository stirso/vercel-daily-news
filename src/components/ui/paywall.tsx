import { Suspense } from "react";
import BtnSubscribeWrapper from "./buttons/btn-subscribe-wrapper";
import { ButtonSkeleton } from "./skeletons/skeletons";

export default function Paywall () {
  return (
    <div className="w-full flex flex-col justify-end items-center gap-4 lg:gap-8 h-full mt-6 lg:mt-8 p-4 lg:p-8 bg-linear-to-t from-slate-800/90 via-gray-600/60 to-slate-300/40 z-5">
      <div className="w-full flex justify-center items-center">
        <span className="text-lg lg:text-xl font-semibold text-center text-shadow-[1px_1px_rgba(255,255,255,0.85)]">
          This content is only available to subscribers.<br />
          Want to view the full article?
        </span>
      </div>
      <Suspense fallback={<ButtonSkeleton />}>
        <BtnSubscribeWrapper isPaywall={true} />
      </Suspense>
    </div>
  );
}
