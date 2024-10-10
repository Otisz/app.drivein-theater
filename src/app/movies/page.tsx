import { Button, buttonVariants } from "@/components/ui/button";
import Agenda from "@/features/Movies";
import { getCurrentSession } from "@/lib/auth";
import Link from "next/link";

export default async function Page() {
  const session = await getCurrentSession();

  return (
    <div className="container pt-8">
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-6xl">Movies</h1>
        {session !== null ? (
          <Link href="/movies/create" className={buttonVariants()}>
            Create
          </Link>
        ) : null}
      </div>
      <Agenda />
    </div>
  );
}
