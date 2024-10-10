import { Button, buttonVariants } from "@/components/ui/button";
import Movie from "@/features/Movie";
import { getCurrentSession } from "@/lib/auth";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page(props: Props) {
  const session = await getCurrentSession();

  return (
    <div className="container pt-8">
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-6xl">Movies</h1>
        {session !== null ? (
          <Link href={`/movies/${props.params.id}/edit`} className={buttonVariants()}>
            Edit
          </Link>
        ) : null}
      </div>
      <Movie />
    </div>
  );
}
