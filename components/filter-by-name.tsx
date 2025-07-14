"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function FilterByName() {
  const [name, setName] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  // Sync name from URL on mount
  useEffect(() => {
    const queryName = searchParams.get("name");
    if (queryName) {
      setName(queryName);
    }
  }, [searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (name.trim()) {
      params.set("name", name.trim());
    } else {
      params.delete("name");
    }

    router.push("?" + params.toString());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="rounded-[50px] bg-white overflow-hidden h-[40px] flex items-center justify-between px-1 shadow">
      <input
        placeholder="Search..."
        className="bg-transparent outline-none border-none flex-1 h-full px-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSearch}
        className="h-[30px] w-[30px] rounded-full bg-primary flex items-center justify-center"
      >
        <Search className="text-white" size={20} />
      </button>
    </div>
  );
}

export default FilterByName;
