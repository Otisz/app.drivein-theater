"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMovie } from "@/hooks/queries/movie";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Movie() {
  const movieQuery = useMovie();

  if (movieQuery.isPending) {
    return <div>Loading...</div>;
  }

  if (movieQuery.isError) {
    return <div>Error: {movieQuery.error.message}</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card key={movieQuery.data.id} className="">
        <CardHeader className="flex-row justify-between">
          <div className="flex flex-col space-y-1.5">
            <CardTitle>
              {movieQuery.data.title} {movieQuery.data.ageRating > 0 ? `(${movieQuery.data.ageRating}+)` : ""}
            </CardTitle>
            <CardDescription>{movieQuery.data.description}</CardDescription>
          </div>
          <figure className="relative flex">
            <Image
              src={movieQuery.data.coverImage}
              alt={movieQuery.data.title}
              fill
              className="h-full w-full object-cover"
            />
          </figure>
        </CardHeader>
      </Card>
    </div>
  );
}
