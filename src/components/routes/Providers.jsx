import DataTable from "../../features/data/Datum"

const columns = [
  { accessorKey: "name", header: "Name", meta: { dataType: "str" } },
  { accessorKey: "address", header: "Address", meta: { dataType: "str" } },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    meta: { dataType: "str" },
  },
  { accessorKey: "email", header: "Email", meta: { dataType: "str" } },
]

const route = "providers"

export default function Providers() {
  return <DataTable route={route} columns={columns} />
}
