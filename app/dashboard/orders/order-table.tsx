import TableHead from "@/components/table-head";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import formatDate from "@/lib/formatDate";
import {
  orderPaymentVariantMap,
  orderStatusIconMap,
  orderStatusVariantMap,
} from "@/lib/orderStatuses";
import Order from "@/schemas/Order";
import { Eye, Trash2 } from "lucide-react";
import Link from "next/link";

interface Props {
  data: Order[];
}

const columns = [
  { _id: 1, value: "customer", label: "Customer" },
  { _id: 2, value: "items", label: "Items" },
  { _id: 3, value: "amount", label: "Amount" },
  { _id: 4, value: "status", label: "Status" },
  { _id: 5, value: "payment", label: "Payment" },
  { _id: 6, value: "date", label: "Date" },
  { _id: 7, value: "actions", label: "Actions" },
];

export default function OrderTable({ data }: Props) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHead columns={columns} />
        <TableBody>
          {data.map((order) => (
            <TableRow
              key={order._id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <TableCell>
                <div className="font-medium">{order.user.firstName}</div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{order.items.length} items</div>
              </TableCell>
              <TableCell>
                <div className="font-medium">${order.subtotal.toFixed(2)}</div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={orderStatusVariantMap[order.status]}
                  className="flex items-center"
                >
                  {orderStatusIconMap[order.status]}
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={orderPaymentVariantMap[order.paymentStatus]}>
                  {order.paymentStatus.charAt(0).toUpperCase() +
                    order.paymentStatus.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(order.createdAt)}</TableCell>
              <TableCell className="space-x-2">
                <Link
                  href={`/dashboard/orders/${order._id}`}
                  className={buttonVariants({ size: "sm" })}
                >
                  <Eye className="w-4 h-4" />
                </Link>

                <Button variant="destructive" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
