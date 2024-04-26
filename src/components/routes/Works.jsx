import DataTable from "../../features/data/Datum"

const columns = [
  {
    accessorKey: "name",
    header: "Name",
    meta: { dataType: "str" },
  },
  {
    accessorKey: "address",
    header: "Address",
    meta: { dataType: "str" },
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    meta: { dataType: "str" },
  },
]

const route = "works"

export default function Works() {
  return <DataTable route={route} columns={columns} />
}
