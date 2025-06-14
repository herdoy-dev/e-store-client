"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
const categories = ["Electronics", "Books", "Clothing", "Home"];

function Aside() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <aside className="space-y-6 rounded-2xl">
      <div className="bg-white rounded-2xl">
        <div className="p-4 border-b">
          <h4 className="font-semibold">Filter by Category</h4>
        </div>
        <div className="space-y-2 py-4 px-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <label htmlFor={category} className="text-sm">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl">
        <div className="p-4 border-b">
          <h4 className="font-semibold">Filter by Category</h4>
        </div>
        <div className="space-y-2 py-4 px-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <label htmlFor={category} className="text-sm">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl">
        <div className="p-4 border-b">
          <h4 className="font-semibold">Filter by Category</h4>
        </div>
        <div className="space-y-2 py-4 px-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <label htmlFor={category} className="text-sm">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Aside;
