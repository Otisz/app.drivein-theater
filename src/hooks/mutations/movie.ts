import useAxios from "@/hooks/use-axios";
import { MovieCreateValues } from "@/lib/zod-schemas";
import { queryClient } from "@/providers/query-provider";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function useCreateMovie() {
  const router = useRouter();

  const axios = useAxios();

  const [notification, setNotification] = useState<ReturnType<typeof toast>>();

  return useMutation({
    mutationFn: async (data: MovieCreateValues) => {
      const response = await axios.post<ApiResponse<Movie>>("/api/movies", data);

      return response.data.payload;
    },
    onMutate: () => {
      setNotification("Creating movie...");
    },
    onSuccess: (movie) => {
      toast.success("Movie has been created", { id: notification });
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      queryClient.setQueryData(["movie", movie.id], movie);
      router.push(`/movies/${movie.id}`);
    },
    onError: (e) => {
      const error = e as AxiosError<ApiValidationResponse<Movie>>;

      if (!error.response) return toast.error("Something went wrong", { id: notification });

      toast.error(error.response.data.message, { id: notification });
    },
  });
}
