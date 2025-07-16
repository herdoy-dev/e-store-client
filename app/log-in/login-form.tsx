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
import { useCartStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginForm() {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const cartItems = useCartStore((s) => s.items);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await apiClient.post<APIResponse<string>>(
        "/auth/log-in",
        data
      );
      setError("");
      toast.success(response.data.message);
      Cookies.set("token", response.data.data);
      form.reset();
      setLoading(false);
      if (cartItems.length >= 1) {
        window.location.href = "/cart";
      } else {
        window.location.reload();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          setError(error.response.data.message);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <p className="text-center text-red-500"> {error} </p>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {isLoading ? <BeatLoader /> : "Log In"}
          </Button>
        </form>
      </Form>
    </>
  );
}
