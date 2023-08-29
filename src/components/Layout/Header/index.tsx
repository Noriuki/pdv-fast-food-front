import Image from 'next/image';
import MenuLink from './MenuLink';

export default function Header() {
  return (
    <header className="w-full bg-green-800 px-8 flex flex-wrap flex-col justify-between md:flex-row">
      <Image
        src="/logo.svg"
        alt="logo"
        width={0}
        height={0}
        sizes="100vw"
        className="w-40 h-auto flex"
      />

      <nav className="flex flex-wrap justify-end p-4 space-x-4">
        <MenuLink label="Pedido" path="/" />
        <MenuLink label="Cozinha" path="/cozinha" />
        <MenuLink label="Retirada" path="/retirada" />
      </nav>
    </header>
  );
}
