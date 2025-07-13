import TableHead from "@/components/table-head";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import formatDate from "@/lib/formatDate";
import ProductSchema from "@/schemas/Product";
import Image from "next/image";

interface Props {
  data: ProductSchema[];
}

const columns = [
  { _id: 0, value: "thumbnail", label: "Image" },
  { _id: 1, value: "name", label: "Name" },
  { _id: 2, value: "price", label: "Price" },
  { _id: 3, value: "category.name", label: "Category" },
  { _id: 4, value: "createdAt", label: "Date" },
];

export default function ProductTable({ data }: Props) {
  return (
    <div>
      <Table>
        <TableHead columns={columns} />
        <TableBody>
          {data.map((job) => (
            <TableRow key={job._id}>
              <TableCell>
                {" "}
                <Image
                  src={job.thumbnail}
                  alt="img"
                  width={70}
                  height={50}
                />{" "}
              </TableCell>
              <TableCell> {job.name} </TableCell>
              <TableCell> ${job.price.toFixed()} </TableCell>
              <TableCell> {job.category.name} </TableCell>
              <TableCell> {formatDate(job.createdAt)} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
