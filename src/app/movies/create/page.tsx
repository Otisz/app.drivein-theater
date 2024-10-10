import MovieCreate from "@/features/MovieCreate";

export default function Page() {
  return (
    <div className="container pt-8">
      <h1 className="pb-4 text-6xl">Create Movie</h1>
      <MovieCreate />
    </div>
  );
}
