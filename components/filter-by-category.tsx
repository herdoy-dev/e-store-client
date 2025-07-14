"use client";

import { Checkbox } from "@/components/ui/checkbox";
import Category from "@/schemas/Category";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  categorys: Category[];
}

function FilterByCategory({ categorys }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Sync selectedCategory with URL on mount
  useEffect(() => {
    const current = searchParams.get("categoryId");
    if (current) {
      setSelectedCategory(current);
    }
  }, [searchParams]);

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedCategory === categoryId) {
      // Uncheck
      params.delete("categoryId");
      setSelectedCategory(null);
    } else {
      // Check
      params.set("categoryId", categoryId);
      setSelectedCategory(categoryId);
    }

    router.push("?" + params.toString());
  };

  return (
    <div className="bg-white rounded-2xl">
      <div className="p-4 border-b">
        <h4 className="font-semibold">Filter by Category</h4>
      </div>
      <div className="space-y-2 py-4 px-3">
        {categorys.map((category) => (
          <div key={category._id} className="flex items-center space-x-2">
            <Checkbox
              id={category._id}
              checked={selectedCategory === category._id}
              onCheckedChange={() => handleCategoryChange(category._id)}
            />
            <label htmlFor={category._id} className="text-sm">
              {category.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterByCategory;
