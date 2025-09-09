"use client";

import ImageUploader from "@/components/image-uploader";
import ImagesUploader from "@/components/images-uploader";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useCategorys from "@/hooks/useCategorys";
import apiClient from "@/lib/apiClient";
import ProductSchema from "@/schemas/Product";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import * as z from "zod";

// Zod validation schema
const productFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  thumbnail: z.string().url("Invalid URL").optional(),
  images: z.array(z.string().url("Invalid URL")).optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  colors: z
    .array(
      z.object({
        name: z.string().min(1, "Color name required"),
        code: z.string().min(4).max(7),
      })
    )
    .optional(),
  sizes: z.array(z.string()).optional(),
  type: z.string().optional(),
  price: z.number().min(0.01, "Price must be greater than 0"),
  category: z.string().min(1, "Category is required"),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

interface Props {
  product?: ProductSchema;
}

export default function ProductForm({ product }: Props) {
  const { data: categorys } = useCategorys();
  const [isLoading, setLoading] = useState(false);
  const types = ["Featured", "Regular"];

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name ?? "",
      description: product?.description ?? "",
      price: product?.price ?? 0,
      sizes: product?.sizes ?? [],
      images: product?.images ?? [],
      colors: product?.colors ?? [],
      thumbnail: product?.thumbnail ?? "",
      category: product?.category._id ?? "",
      type: product?.type ?? "",
    },
  });

  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray({
    control: form.control,
    name: "colors",
  });

  async function onSubmit(data: ProductFormValues) {
    setLoading(true);
    try {
      if (product) {
        await apiClient.put(`/products/${product._id}`, data);
        toast.success("Product updated successfully!");
      } else {
        await apiClient.post("/products", data);
        form.reset();
        toast.success("Product created successfully!");
        console.log(data);
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">
        {product ? "Edit Product" : "Add New Product"}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categorys?.data.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Thumbnail */}
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <ImageUploader
                      image={field.value}
                      onPickImage={field.onChange}
                      onClearImage={() => field.onChange("")}
                      maxFileSizeKB={300}
                      ASPECT_RATIO={3 / 2}
                      MIN_DIMENSION={200}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Images */}

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <ImagesUploader
                      images={field.value || []}
                      onPickImages={(newImages) => field.onChange(newImages)}
                      maxFiles={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Product Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {types.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detailed product description..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Sizes */}
            <div className="md:col-span-2">
              <FormLabel className="mb-2">Sizes</FormLabel>
              <div className="flex flex-wrap gap-2">
                {["S", "M", "L", "XL", "XXL", "SMALL", "MEDIUM", "LARGE"].map(
                  (size) => (
                    <Button
                      key={size}
                      type="button"
                      variant={
                        form.watch("sizes")?.includes(size)
                          ? "default"
                          : "outline"
                      }
                      onClick={() => {
                        const current = form.getValues("sizes") || [];
                        if (current.includes(size)) {
                          form.setValue(
                            "sizes",
                            current.filter((s) => s !== size)
                          );
                        } else {
                          form.setValue("sizes", [...current, size]);
                        }
                      }}
                    >
                      {size}
                    </Button>
                  )
                )}
              </div>
              <FormMessage>{form.formState.errors.sizes?.message}</FormMessage>
            </div>

            {/* Colors */}
            <div className="md:col-span-2">
              <FormLabel className="mb-2">Colors</FormLabel>
              {colorFields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-2 gap-4 mb-4">
                  <FormField
                    control={form.control}
                    name={`colors.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Color name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name={`colors.${index}.code`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="#FFFFFF" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeColor(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendColor({ name: "", code: "" })}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Color
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <BeatLoader size={8} />
              ) : product ? (
                "Update"
              ) : (
                "Create Product"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
