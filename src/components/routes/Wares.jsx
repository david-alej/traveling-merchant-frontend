import DataTable from "../../features/data/Datum"

const columns = [
  {
    accessorKey: "name",
    header: "Name",
    meta: { dataType: "str" },
  },
  {
    accessorKey: "type",
    header: "Type",
    meta: { dataType: "type" },
    filterFn: "typeFilter",
  },
  {
    accessorKey: "tags",
    header: "Tags",
    meta: { dataType: "itr" },
  },
  {
    accessorKey: "unitPrice",
    header: "Unit Price",
    meta: { dataType: "num" },
  },
  {
    accessorKey: "stock",
    header: "Stock",
    meta: { dataType: "int" },
  },
]

const route = "wares"

export default function Wares() {
  return <DataTable route={route} columns={columns} />
}
