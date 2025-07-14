"use client";

import { Slider } from "@/components/ui/slider";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function FilterByPrice() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [maxPrice, setMaxPrice] = useState<number>(1000);

  // Sync state with URL
  useEffect(() => {
    const priceParam = searchParams.get("price");
    if (priceParam) {
      setMaxPrice(Number(priceParam));
    }
  }, [searchParams]);

  const handlePriceChange = (values: number[]) => {
    const newPrice = values[0];
    setMaxPrice(newPrice);

    const params = new URLSearchParams(searchParams.toString());

    if (newPrice > 0) {
      params.set("price", newPrice.toString());
    } else {
      params.delete("price");
    }

    router.push("?" + params.toString());
  };

  return (
    <div className="bg-white rounded-2xl mt-6">
      <div className="p-4 border-b">
        <h4 className="font-semibold">Filter by Price</h4>
      </div>
      <div className="p-4">
        <div className="flex justify-between text-sm text-gray-700 mb-2">
          <span>0</span>
          <span>${maxPrice}</span>
          <span>1000</span>
        </div>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={[maxPrice]}
          onValueChange={handlePriceChange}
        />
      </div>
    </div>
  );
}

export default FilterByPrice;
