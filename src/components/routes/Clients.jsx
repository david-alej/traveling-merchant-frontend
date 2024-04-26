import DataTable from "../../features/data/Datum"

const columns = [
  {
    accessorKey: "work",
    header: "Work",
    meta: { dataType: "obj", property: "name" },
  },
  {
    accessorKey: "fullname",
    header: "Fullname",
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
  {
    accessorKey: "description",
    header: "Description",
    meta: { dataType: "str" },
  },
]

const route = "clients"

export default function Clients() {
  return <DataTable route={route} columns={columns} />
}
