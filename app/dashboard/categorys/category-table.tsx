import TableHead from "@/components/table-head";
import { Button, buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import formatDate from "@/lib/formatDate";
import { cn } from "@/lib/utils";
import Category from "@/schemas/Category";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";

interface Props {
  categorys: Category[];
}

const columns = [
  { _id: 1, value: "name", label: "Name" },
  { _id: 4, value: "createdAt", label: "Date" },
  { _id: 5, value: "", label: "Actions" },
];

function CategoryTable({ categorys }: Props) {
  return (
    <div>
      <Table>
        <TableHead columns={columns} />
        <TableBody>
          {categorys.map((product) => (
            <TableRow key={product._id}>
              <TableCell> {product.name} </TableCell>
              <TableCell> {formatDate(product.createdAt)} </TableCell>
              <TableCell className="space-x-2">
                <Link
                  href={`/dashboard/categorys/edit/${product._id}`}
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "bg-amber-300 cursor-pointer hover:bg-amber-400"
                  )}
                >
                  <Edit />
                </Link>
                <Button
                  size="sm"
                  variant="destructive"
                  className="cursor-pointer"
                >
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CategoryTable;
