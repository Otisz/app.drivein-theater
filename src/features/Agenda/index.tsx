"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Agenda() {
  const agendaQuery = useQuery({
    queryKey: ["agenda"],
    queryFn: () => {
      return axios.get<ApiPaginationResponse<Agenda>>("/api/agenda");
    },
  });

  if (agendaQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (agendaQuery.isError) {
    return <div>Error: {agendaQuery.error.message}</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {agendaQuery.data?.data.payload.map((agenda) => {
        return (
          <Card key={agenda.id} className="">
            <CardHeader className="flex-row justify-between">
              <div className="flex flex-col space-y-1.5">
                <CardTitle>
                  {agenda.movie.title} {agenda.movie.ageRating > 0 ? `(${agenda.movie.ageRating}+)` : ""}
                </CardTitle>
                <CardDescription>{agenda.movie.description}</CardDescription>
              </div>
              <figure className="relative flex">
                <Image
                  src={agenda.movie.coverImage}
                  alt={agenda.movie.title}
                  fill
                  className="h-full w-full object-cover"
                />
              </figure>
            </CardHeader>
            <CardContent>
              <p>
                Time: <time dateTime={agenda.startDate}>{new Date(agenda.startDate).toLocaleString("hu")}</time>
              </p>
              <p>Seats: {agenda.seats}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
