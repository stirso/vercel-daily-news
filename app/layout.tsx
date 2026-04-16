import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./ui/navigation";
import Footer from "./ui/footer";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
            <Suspense fallback={<div className="w-full container px-4 flex justify-between items-center pt-8">Loading...</div>}>
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
