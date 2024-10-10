"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Movies() {
  const moviesQuery = useQuery({
    queryKey: ["movies"],
    queryFn: () => {
      return axios.get<ApiPaginationResponse<Movie>>("/api/movies");
    },
  });

  if (moviesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (moviesQuery.isError) {
    return <div>Error: {moviesQuery.error.message}</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {moviesQuery.data?.data.payload.map((movie) => {
        return (
          <Card key={movie.id} className="">
            <CardHeader className="flex-row justify-between">
              <div className="flex flex-col space-y-1.5">
                <CardTitle>
                  {movie.title} {movie.ageRating > 0 ? `(${movie.ageRating}+)` : ""}
                </CardTitle>
                <CardDescription>{movie.description}</CardDescription>
              </div>
              <figure className="relative flex">
                <Image src={movie.coverImage} alt={movie.title} fill className="h-full w-full object-cover" />
              </figure>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
