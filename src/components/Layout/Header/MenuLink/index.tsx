'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MenuLink({
  path,
  label,
}: {
  path: string;
  label: string;
}) {
  const pathname = usePathname();
  const active = pathname === path;

  return (
    <Link
      href={path}
      className={`text-slate-50 py-2 px-4 ${
        active && 'bg-green-900 rounded-lg'
      }`}
    >
      {label}
    </Link>
  );
}
