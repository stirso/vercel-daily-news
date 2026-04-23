import { LoaderCircle } from "lucide-react";
import { clsx } from "clsx";

type LoadingProps = {
  classname?: string;
  svgClass?: string;
}

export default function Loading ({ classname, svgClass }: Readonly<LoadingProps>) {
  return (
    <div className={clsx("w-full container px-4 flex justify-center items-center pt-8 min-h-[50vh]", classname)}>
      <LoaderCircle className={clsx(svgClass ? svgClass : "size-12", "stroke-gray-500 animate-spin")} />
    </div>
  )
}