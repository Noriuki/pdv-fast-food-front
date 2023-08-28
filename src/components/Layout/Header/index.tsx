'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-green-800 px-8">
      <div>
      </div>

      <nav className="w-full flex flex-wrap justify-end p-4  space-x-4">

        <Link href="pedidos" className={`text-slate-50 font-medium py-2 px-4 ${pathname === '/pedidos' && 'bg-green-900 rounded-lg'}`}>
          Pedidos
        </Link>

        <Link href="cozinha" className={`text-slate-50 font-medium py-2 px-4 ${pathname === '/cozinha' && 'bg-green-900 rounded-lg'}`}>
          Cozinha
        </Link>

        <Link href="retirada" className={`text-slate-50 font-medium py-2 px-4 ${pathname === '/retirada' && 'bg-green-900 rounded-lg'}`}>
          Retirada
        </Link>
      </nav>
    </header>
  )
}
