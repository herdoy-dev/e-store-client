"use client";
import {
  TableHead as ShadcnTableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSortUp } from "react-icons/fa";

interface Column {
  _id: number;
  value: string;
  label: string;
}

interface Props {
  columns: Column[];
}

const TableHead = ({ columns }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const renderSortIcon = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    return (
      params.get("orderBy") === value && <FaSortUp className="inline-block" />
    );
  };

  return (
    <TableHeader>
      <TableRow>
        {columns.map((column) => (
          <ShadcnTableHead
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              const isExist = params.get("orderBy");
              if ((isExist && isExist === column.value) || !column.value) {
                params.delete("orderBy");
              } else {
                params.set("orderBy", column.value.toString());
              }
              const query = params.toString();
              router.push("?" + query);
            }}
            key={column._id}
          >
            <div className="flex items-center gap-1 cursor-pointer">
              {column.label} {renderSortIcon(column.value)}
            </div>
          </ShadcnTableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default TableHead;
