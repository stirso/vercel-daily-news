import Image from "next/image";
import Navigation from "./ui/navigation";
import Footer from "./ui/footer";

export default function Home () {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <Navigation />
      <main className="flex flex-col w-full justify-center items-center">
        <div className="container px-4 flex justify-between items-center">
          content here
        </div>
      </main>
      <Footer />
    </div>
  );
}
