import TableHead from "@/components/table-head";
import { Button, buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import formatDate from "@/lib/formatDate";
import { cn } from "@/lib/utils";
import ProductSchema from "@/schemas/Product";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  data: ProductSchema[];
}

const columns = [
  { _id: 0, value: "thumbnail", label: "Image" },
  { _id: 1, value: "name", label: "Name" },
  { _id: 2, value: "price", label: "Price" },
  { _id: 3, value: "category.name", label: "Category" },
  { _id: 4, value: "createdAt", label: "Date" },
  { _id: 5, value: "", label: "Actions" },
];

export default function ProductTable({ data }: Props) {
  return (
    <div>
      <Table>
        <TableHead columns={columns} />
        <TableBody>
          {data.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                <Image
                  src={product.thumbnail}
                  alt="img"
                  width={70}
                  height={50}
                />
              </TableCell>
              <TableCell> {product.name} </TableCell>
              <TableCell> ${product.price.toFixed()} </TableCell>
              <TableCell> {product.category.name} </TableCell>
              <TableCell> {formatDate(product.createdAt)} </TableCell>
              <TableCell className="space-x-2">
                <Link
                  href={`/dashboard/products/edit/${product._id}`}
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
