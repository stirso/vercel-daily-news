import { Source_Serif_4, Noto_Sans } from "next/font/google";
import "../styles/globals.css";
import Navigation from "../components/ui/navigation";
import Footer from "../components/ui/footer";
import type { Metadata } from "next";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'
  ),
  title: {
    template: '%s | Vercel Daily News',
    default: 'Vercel Daily News',
  },
  description: 'Changelogs, engineering deepdives, customer stories, and community updates - all in one place.',
  keywords: "changelogs deepdives stories updates vercel nextjs react js",
  alternates: {
    canonical: `/`,
  },
  openGraph: {
    title: 'Vercel Daily News',
    description: 'Changelogs, engineering deepdives, customer stories, and community updates - all in one place.',
    siteName: 'Vercel Daily News',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/vercel.svg',
        width: 1200,
        height: 630,
        alt: "View a list of articles from The Vercel Daily News archive.",
      },
    ]
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html
      lang="en"
      className={`${notoSans.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="flex flex-col flex-1 items-center justify-start font-sans">
          <Navigation />
          <main className="flex flex-col w-full justify-start items-center min-h-[50vh]">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
