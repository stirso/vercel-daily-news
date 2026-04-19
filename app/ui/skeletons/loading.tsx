import { LoaderCircle } from "lucide-react";


export default function Loading () {
  return (
    <div className="w-full container px-4 flex justify-center items-center pt-8 min-h-[50vh]">
      <LoaderCircle className="size-12 stroke-gray-500 animate-spin" />
    </div>
  )
}