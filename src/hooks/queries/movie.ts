import useAxios from "@/hooks/use-axios";
import { QueryOptions, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export function useMovie(props?: QueryOptions<Movie>) {
  const params = useParams<{ id: Movie["id"] }>();
  const axios = useAxios();

  return useQuery({
    queryKey: ["movie", params.id],
    queryFn: async ({ signal }) => {
      const response = await axios.get<ApiResponse<Movie>>(`/api/movies/${params.id}`, {
        signal,
      });

      return response.data.payload;
    },
    enabled: !!params.id,
    ...props,
  });
}
