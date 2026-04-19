import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./ui/navigation";
import Footer from "./ui/footer";
import { Suspense } from "react";
import Loading from "./ui/skeletons/loading";
import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
  description: 'Changelogs, engeneering deepdives, customer stories, and community updates - all in one place.',
  keywords: "changelogs deepdives stories updates vercel nextjs react js",
  alternates: {
    canonical: `/`,
  },
  openGraph: {
    title: 'Vercel Daily News',
    description: 'Changelogs, engeneering deepdives, customer stories, and community updates - all in one place.',
    siteName: 'Vercel Daily News',
    locale: 'en_US',
    type: 'website',
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="flex flex-col flex-1 items-center justify-start bg-zinc-50 font-sans">
          <Navigation />
          <main className="flex flex-col w-full justify-start items-center min-h-[50vh]">
            <Suspense fallback={<Loading />}>
            {children}
            </Suspense>
          </main>
          <Suspense fallback={<div>&copy; Vercel Daily. All rights reserved.</div>}>
            <Footer />
          </Suspense>
        </div>
      </body>
    </html>
  );
}
