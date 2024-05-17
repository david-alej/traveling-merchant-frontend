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
      meta: { dataType: "num", isEditable: true },
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
      meta: { dataType: "type", isEditable: true },
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
      meta: { dataType: "str", isEditable: true },
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
      meta: { dataType: "num", isEditable: true },
    },
    {
      accessorKey: "paymentType",
      header: "Payment Type",
      meta: { dataType: "type", isEditable: true },
    },
    {
      accessorKey: "paidAt",
      header: "Paid At",
      meta: { dataType: "date", isEditable: true },
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
      meta: { dataType: "str", isEditable: true },
    },
    {
      accessorKey: "address",
      header: "Address",
      meta: { dataType: "str", isEditable: true },
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      meta: { dataType: "str", isEditable: true },
    },
    {
      accessorKey: "description",
      header: "Description",
      meta: { dataType: "str", isEditable: true },
    },
  ],
  works: [
    {
      accessorKey: "name",
      header: "Name",
      meta: { dataType: "str", isEditable: true },
    },
    {
      accessorKey: "address",
      header: "Address",
      meta: { dataType: "str", isEditable: true },
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      meta: { dataType: "str", isEditable: true },
    },
  ],
  wares: [
    {
      accessorKey: "name",
      header: "Name",
      meta: { dataType: "str", isEditable: true },
    },
    {
      accessorKey: "type",
      header: "Type",
      meta: { dataType: "type", isEditable: true },
      filterFn: "typeFilter",
    },
    {
      accessorKey: "tags",
      header: "Tags",
      meta: { dataType: "itr", isEditable: true },
    },
    {
      accessorKey: "unitPrice",
      header: "Unit Price",
      meta: { dataType: "num", isEditable: true },
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
      meta: { dataType: "num", isEditable: true },
    },
    {
      accessorKey: "tax",
      header: "Tax",
      meta: { dataType: "num", isEditable: true },
    },
    {
      accessorKey: "shipment",
      header: "Shipment",
      meta: { dataType: "num", isEditable: true },
    },
    {
      accessorKey: "expectedAt",
      header: "Expected At",
      meta: { dataType: "date", isEditable: true },
    },
    {
      accessorKey: "actualAt",
      header: "Actual At",
      meta: { dataType: "date", isEditable: true },
    },
  ],
  providers: [
    {
      accessorKey: "name",
      header: "Name",
      meta: { dataType: "str", isEditable: true },
    },
    {
      accessorKey: "address",
      header: "Address",
      meta: { dataType: "str", isEditable: true },
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      meta: { dataType: "str", isEditable: true },
    },
    {
      accessorKey: "email",
      header: "Email",
      meta: { dataType: "str", isEditable: true },
    },
  ],
}
