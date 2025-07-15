"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import apiClient from "@/lib/apiClient";
import APIResponse from "@/schemas/APIResponse";
import Category from "@/schemas/Category";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
  category?: Category;
}

export default function CategoryForm({ category }: Props) {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name ?? "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      if (!category) {
        const response = await apiClient.post<APIResponse<string>>(
          "/categorys",
          data
        );
        toast.success(response.data.message);
        form.reset();
      } else {
        const response = await apiClient.put<APIResponse<string>>(
          `/categorys/${category._id}`,
          data
        );
        toast.success(response.data.message);
        form.reset();
      }
      setError("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          setError(error.response.data.message);
        }
      }
    }
  };

  return (
    <>
      {error && <p className="text-center text-red-500"> {error} </p>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="your category name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {isLoading ? <BeatLoader /> : "Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
}
