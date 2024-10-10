import MovieCreate from "@/features/MovieCreate";
import { getCurrentSession } from "@/lib/auth";
import { redirect, RedirectType } from "next/navigation";

export default async function Page() {
  const session = await getCurrentSession();
  if (session === null) redirect("/auth/login", RedirectType.push);

  return (
    <div className="container pt-8">
      <h1 className="pb-4 text-6xl">Create Movie</h1>
      <MovieCreate />
    </div>
  );
}
