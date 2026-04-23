'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { House, Search } from 'lucide-react'

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/', icon: House },
  {
    name: 'Search',
    href: '/search',
    icon: Search,
  },
];
export default function Header() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-12 items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:opacity-65 md:justify-start md:p-2 md:px-3',
              {
                'opacity-65': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6 h-auto" />
            <span className="hidden md:block">{link.name}</span>
          </Link>
        );
      })}
    </>
  );
}
