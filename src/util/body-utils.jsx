import { reformColumn, reformColumns } from "./filters-utils"
import routesColumnDefinitions from "./routesColumnDefinitions"

export const camelToFlat = (property) => {
  const camelCase = property.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ")

  let flat = ""

  camelCase.forEach((word) => {
    flat = flat + word.charAt(0).toUpperCase() + word.slice(1) + " "
  })

  return flat.slice(0, -1)
}

// export const flatToCamel = (str) =>
//   str
//     .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
//       return index == 0 ? word.toLowerCase() : word.toUpperCase()
//     })
//     .replace(/\s+/g, "")

export const getNameValue = (value) => {
  if (!value) return ""
  let nameValue = value.length

  if (value.length !== 0 && !Array.isArray(value) && value) {
    const obj = value

    const nameKey =
      Object.keys(obj).find((key) => key.toLowerCase().includes("name")) || "id"

    nameValue = obj[nameKey]
  }

  return nameValue || ""
}

export const getMiniTableColumns = (property, header, excludedId) => {
  const ware =
    header.slice(0, 5) === "Wares"
      ? [
          {
            accessorKey: "ware",
            header: "Ware",
            meta: { dataType: "obj", property: "name" },
          },
        ]
      : []

  const columns = ware.concat(routesColumnDefinitions[property])
  let newColumns = []

  for (let i = 0; i < columns.length; i++) {
    let col = columns[parseInt(i)]

    if (
      excludedId === col.accessorKey ||
      excludedId === col.accessorKey + "Id" ||
      col.meta.dataType === "arr"
    ) {
      continue
    } else if (col.meta.dataType === "obj" && col.accessorKey !== "ware") {
      if (property === "transactions") continue

      col = JSON.parse(JSON.stringify(col))

      col.accessorKey = col.accessorKey + "Id"
      col.header = col.header + " Id"
      col.meta.dataType = "int"
    }

    reformColumn(col, false)

    newColumns.push(col)
  }

  if (
    property !== "waresTickets" &&
    property !== "ordersWares" &&
    newColumns[0].accessorKey !== "id"
  ) {
    newColumns = [
      {
        accessorKey: "id",
        header: "Id",
        meta: { dataType: "int" },
      },
    ].concat(newColumns)
  }

  return newColumns
}

export const getMiniDataColumns = (property) => {
  let columns = routesColumnDefinitions[property + "s"]

  if (columns[0].accessorKey !== "id") {
    columns = [
      {
        accessorKey: "id",
        header: "Id",
        meta: { dataType: "int" },
      },
    ].concat(columns)
  }

  let newColumns = []

  for (let i = 0; i < columns.length; i++) {
    let col = columns[parseInt(i)]

    if (col.meta.dataType === "arr") {
      continue
    } else if (col.meta.dataType === "obj") {
      col = JSON.parse(JSON.stringify(col))

      col.header =
        col.accessorKey[0].toUpperCase() + col.accessorKey.slice(1) + " Id"
      col.accessorKey = col.accessorKey + "Id"
      col.meta.dataType = "int"
    }

    reformColumn(col)

    newColumns.push(col)
  }

  return newColumns
}

export const getMetaClass = (route, property) => {
  const routeColumnDefs = routesColumnDefinitions[route]
  const columnDef = routeColumnDefs.find((def) => def.accessorKey === property)
  if (!columnDef) return false

  // eslint-disable-next-line no-unused-vars
  const { dataType, property: foreignProperty, ...metaClass } = columnDef.meta

  return metaClass
}

export const isEditable = (route, property) => {
  const meta = getMetaClass(route, property)

  for (const [key, value] of Object.entries(meta)) {
    if (value === true && ["isOriginal", "isOptional"].includes(key)) {
      return true
    }
  }

  return false
}

export const getColumns = (route) => {
  let columns = routesColumnDefinitions[route].concat([
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      meta: { dataType: "date" },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      meta: { dataType: "date" },
    },
  ])

  columns = reformColumns(columns, true)

  return columns
}

export const camelToHyphen = (camel) =>
  camel.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())

export const createTagOptions = (tags, onAddTag, allTags) => {
  let tagOptions = []

  for (const [tagType, typeOfTags] of Object.entries(allTags)) {
    const className = camelToHyphen(tagType)
    const typeOfTagOptions = typeOfTags.map((tag) => (
      <div
        className={
          "option " + className + (tags.includes(tag) ? " active" : "")
        }
        value={tag}
        key={tag}
        onClick={onAddTag(tag, tagType)}
      >
        {tag}
      </div>
    ))

    tagOptions = tagOptions.concat(typeOfTagOptions)
  }

  return tagOptions
}

export const checkForErrors = (body, errors) => {
  if (!body) return true

  for (const value of Object.values(errors)) {
    if (value) return true
  }
}

export const checkCreateBody = ({ errors, requirements, ...body }) => {
  const hasErrors = checkForErrors(body, errors)

  if (hasErrors) return hasErrors

  for (const property of requirements) {
    const value = body[property]

    if (Array.isArray(value) && value.length === 0) {
      return true
    } else if (
      typeof value === "object" &&
      value !== null &&
      Object.keys(value).length === 0
    ) {
      return true
    } else if (!value) {
      return true
    }
  }

  return false
}

export const filterBody = (body) => {
  for (const value of Object.values(body)) {
    if (Array.isArray(value) && value.length === 0) {
      return true
    } else if (
      typeof value === "object" &&
      value !== null &&
      Object.keys(value).length === 0
    ) {
      return true
    } else if (!value) {
      return true
    }
  }
}
