'use client';

export default function Footer() {
  const copyYear = new Date().getFullYear();

  return (
    <footer className="flex w-full h-full flex-col justify-center items-center">
      <div className="container px-4 py-2 flex justify-center items-center">
        &copy; {copyYear} Vercel Daily. All rights reserved.
      </div>
    </footer>
  );
}
