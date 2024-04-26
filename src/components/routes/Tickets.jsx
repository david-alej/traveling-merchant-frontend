import DataTable from "../../features/data/Datum"

const columns = [
  {
    accessorKey: "client",
    header: "Client Name",
    meta: { dataType: "obj", property: "fullname" },
  },
  {
    accessorKey: "cost",
    header: "Cost",
    meta: { dataType: "num" },
  },
  {
    accessorKey: "paid",
    header: "Paid",
    meta: { dataType: "num" },
  },
  {
    accessorKey: "returned",
    header: "Returned",
    meta: { dataType: "num" },
  },
  {
    accessorKey: "owed",
    header: "Owed",
    meta: { dataType: "num" },
  },
  {
    accessorKey: "paymentPlan",
    header: "Payment Plan",
    meta: { dataType: "type" },
  },
  {
    accessorKey: "payments",
    header: "Payments",
    meta: { dataType: "len" },
  },
  {
    accessorKey: "waresSold",
    header: "Wares Sold",
    meta: { dataType: "len" },
  },
  {
    accessorKey: "description",
    header: "Description",
    meta: { dataType: "str" },
  },
]

const route = "tickets"

export default function Tickets() {
  return <DataTable route={route} columns={columns} />
}
