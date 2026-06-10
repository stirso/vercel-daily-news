// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-[#ddd] before:to-transparent before:-translate-x-full before:animate-[shimmer_2s_infinite]';

export function ButtonSkeleton() {
  return (
    <button className={`${shimmer} relative flex items-center justify-center gap-2 md:p-2 md:px-3 hover:cursor-pointer hover:opacity-65 overflow-hidden`}>
      &nbsp;
    </button>
  )
};

export function ArticleSkelton() {
  return (
    <div className={`relative flex flex-col prose w-full max-w-full md:max-w-4/5 mx-auto [&_p]:mb-4 `}>
      <p className={`${shimmer} relative w-full overflow-hidden`}>&nbsp;</p>
      <p className={`${shimmer} relative w-full overflow-hidden`}>&nbsp;</p>
      <p className={`${shimmer} relative w-full overflow-hidden`}>&nbsp;</p>
      <p className={`${shimmer} relative w-full overflow-hidden`}>&nbsp;</p>
      <p className={`${shimmer} relative w-full overflow-hidden`}>&nbsp;</p>
      <p className={`${shimmer} relative w-full overflow-hidden`}>&nbsp;</p>
      <p className={`${shimmer} relative w-full overflow-hidden`}>&nbsp;</p>
    </div>
  )
}

export function ArticleCardSkeleton() {
  return (
    <div className={`flex flex-col justify-start items-between gap-4 bg-gray-100/50 h-full`}>
      <div className={`${shimmer} relative overflow-hidden aspect-video w-full bg-[#666]`}>
        <span className="bg-gray-500/85 p-2 text-xs text-white uppercase absolute font-medium right-4 top-4 rounded-sm min-w-18.75">
          &nbsp;
        </span>
      </div>
      <div className="relative flex flex-col gap-4 px-4 pb-4 items-between overflow-hidden">
        <h3 className={`${shimmer} relative text-lg lg:text-2xl font-semibold w-full`}>
          &nbsp;
        </h3>
        <p className={`${shimmer} relative text-sm text-gray-800 w-full`}>
          &nbsp;
        </p>
      </div>
    </div>
  )
}

export function ArticleGridSkeleton({isPage}: {readonly isPage?: boolean;}) {
  return (
    <>
      {isPage ? (
        <div className="flex w-full h-full flex-nowrap justify-center items-center gap-6 mx-auto">
          <div className="relative flex justify-between items-center w-full">
            <div className="flex flex-col gap-2 relative">
              <input
                className="w-full lg:min-w-112.5 px-4 pr-8 py-2 border border-black rounded-md"
                id="search"
                name="search"
                placeholder="Search..."
                type="text"
              />
            </div>
          </div>
          <div className="flex">
            <select
              className="px-4 py-2 border border-black rounded-md hover:cursor-pointer"
              id="filter"
              name="filter"
            >
              <option
                value=""
              >
                Choose Category
              </option>
            </select>
          </div>
        </div>
      ) : null}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
      </div>
    </>
  )
}