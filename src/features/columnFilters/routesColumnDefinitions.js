export default {
  tickets: [
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
  ],
  transactions: [
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
  ],
  clients: [
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
  ],
  works: [
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
  ],
  wares: [
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
  ],
  orders: [
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
  ],
  providers: [
    { accessorKey: "name", header: "Name", meta: { dataType: "str" } },
    { accessorKey: "address", header: "Address", meta: { dataType: "str" } },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      meta: { dataType: "str" },
    },
    { accessorKey: "email", header: "Email", meta: { dataType: "str" } },
  ],
}
