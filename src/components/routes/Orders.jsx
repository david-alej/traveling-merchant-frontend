import DataTable from "../../features/data/Datum"

const columns = [
  {
    accessorKey: "provider",
    header: "Provider",
    meta: { dataType: "obj", property: "name" },
  },
  {
    accessorKey: "cost",
    header: "Cost",
    meta: { dataType: "num" },
  },
  {
    accessorKey: "tax",
    header: "Tax",
    meta: { dataType: "num" },
  },
  {
    accessorKey: "shipment",
    header: "Shipment",
    meta: { dataType: "num" },
  },
  {
    accessorKey: "expectedAt",
    header: "Expected At",
    meta: { dataType: "date" },
  },
  {
    accessorKey: "actualAt",
    header: "Actual At",
    meta: { dataType: "date" },
  },
]

const route = "orders"

export default function Orders() {
  return <DataTable route={route} columns={columns} />
}
