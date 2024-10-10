"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateMovie } from "@/hooks/mutations/movie";
import { MovieCreateScheme, MovieCreateValues } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { Loader2Icon, SaveIcon } from "lucide-react";
import { useForm } from "react-hook-form";

export default function MovieCreate() {
  const mutator = useCreateMovie();

  const form = useForm<MovieCreateValues>({
    resolver: zodResolver(MovieCreateScheme),
    defaultValues: {
      title: "",
      description: "",
      ageRating: "0",
      language: "",
    },
  });

  function onSubmit(values: MovieCreateValues) {
    mutator.mutate(values, {
      onError: (e) => {
        if (isAxiosError(e) && e.response) {
          const payload = e.response.data as ApiValidationResponse<Movie>;
          if (e.response.status == 422) {
            for (const key in payload.errors) {
              form.setError(key as keyof MovieCreateValues, {
                type: "custom",
                message: payload.errors[key as keyof MovieCreateValues]!.at(0),
              });
            }
          }
        }
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ageRating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age rating</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">The program can be viewed regardless of age.</SelectItem>
                    <SelectItem value="6">
                      Viewing the program is not recommended for children under the age of 6.
                    </SelectItem>
                    <SelectItem value="12">
                      Viewing the program is not recommended for children under the age of 12.
                    </SelectItem>
                    <SelectItem value="16">
                      Viewing the program is not recommended for people under the age of 16.
                    </SelectItem>
                    <SelectItem value="18">
                      Viewing the program is not recommended for people under the age of 18.
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <FormControl>
                <Input required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutator.isPending}>
          {mutator.isPending ? (
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <SaveIcon className="mr-2 h-4 w-4" />
          )}
          <span>Submit</span>
        </Button>
      </form>
    </Form>
  );
}
