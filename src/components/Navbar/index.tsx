import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex h-20 gap-4 bg-red-300">
      <Link href="/" className="inline-flex items-center px-8 text-3xl">
        Drive-in Theater
      </Link>
      <div className="flex flex-1 items-center justify-center gap-4">
        <Link href="/" className="inline-flex h-full items-center px-4">
          Agenda
        </Link>
        <Link href="/movies" className="inline-flex h-full items-center px-4">
          Movies
        </Link>
      </div>
      <div>Todo Theme switcher</div>
      <div>Todo Login</div>
    </nav>
  );
}
