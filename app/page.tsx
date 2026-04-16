import HomeBanner from "./ui/home-banner";
import HomeHero from "./ui/home-hero";
import HomeFeatured from "./ui/articles/home-featured";

export default function Home () {
  return (
    <>
      <HomeBanner />
      <div className="w-full container px-4 flex flex-col justify-between items-start pt-8 gap-8 lg:gap-16">
        <HomeHero />
        <HomeFeatured />
      </div>
    </>
  );
}
