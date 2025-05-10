import Image from "next/image";

const Header = () => (
  <header className="w-full h-20 flex items-center px-6 bg-gray-100 dark:bg-zinc-800 border-b">
    <a
      className="flex items-center gap-4"
      href="https://www.zellerfeld.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image src="/logo.svg" alt="Zellerfeld" width={35} height={35} />
      <Image src="/text-logo.svg" alt="Zellerfeld" width={120} height={20} />
    </a>
  </header>
);

export default Header;
