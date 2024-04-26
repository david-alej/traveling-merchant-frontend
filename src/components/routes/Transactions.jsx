import DataTable from "../../features/data/Datum"

const columns = [
  {
    accessorKey: "ticketId",
    header: "Ticket Id",
    meta: { dataType: "int" },
  },
  {
    accessorKey: "orderId",
    header: "Order Id",
    meta: { dataType: "int" },
  },
  {
    accessorKey: "payment",
    header: "payment",
    meta: { dataType: "num" },
  },
  {
    accessorKey: "paymentType",
    header: "Payment Type",
    meta: { dataType: "type" },
  },
  {
    accessorKey: "paidAt",
    header: "Paid At",
    meta: { dataType: "date" },
  },
]

const route = "transactions"

export default function Transactions() {
  return <DataTable route={route} columns={columns} />
}
