import routesColumnDefinitions from "./routesColumnDefinitions"

export const isArray = (value) => Array.isArray(value)

export const isObject = (value) =>
  !Array.isArray(value) && typeof value === "object" && value !== null

export const camelToFlat = (property) => {
  const camelCase = property.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ")

  let flat = ""

  camelCase.forEach((word) => {
    flat = flat + word.charAt(0).toUpperCase() + word.slice(1) + " "
  })

  return flat.slice(0, -1)
}

export const findIndentyInformation = (value) => {
  let obj = value[0]
  let nameValue = value.length
  if (value.length === 0) return { nameValue, id: 0 }

  if (!isArray(value)) {
    obj = value

    const nameKey =
      Object.keys(obj).find((key) => key.toLowerCase().includes("name")) || "id"

    nameValue = obj[nameKey]
  }

  return {
    nameValue,
    id: obj.id,
  }
}

export const orderProperties = (data, excludedId = false) => {
  if (!data) return []
  const properties = Object.keys(data)
  const foreignId = properties.filter(
    (property) => property.length > 2 && property.includes("Id")
  )

  const id = []
  const miniData = []
  const regulars = []
  const dates = []
  const description = properties.includes("description") ? ["description"] : []
  const miniTable = []
  const lastProperties = ["updatedAt", "createdAt"]

  for (const property of properties) {
    const value = data[property]
    const isUndefinedForeignId = foreignId.some(
      (id) => id === property && !data[id]
    )
    const isUndefinedForeignName = foreignId.some((id) => {
      const foreignName = id.slice(0, -2)

      return foreignName === property && !data[foreignName]
    })
    const foreignNameExists = (foreignId) => {
      const foreignName = foreignId.slice(0, -2)

      return data[foreignName] && true
    }
    const isDefinedForeignId = foreignId.some((id) => id === property)

    if (
      property === "updatedAt" ||
      property === "createdAt" ||
      property === "description" ||
      isUndefinedForeignId ||
      isUndefinedForeignName ||
      (isDefinedForeignId && foreignNameExists(property)) ||
      property === excludedId
    ) {
      continue
    } else if (property === "id") {
      id.push("id")
    } else if (property.slice(-2) === "At") {
      dates.push(property)
    } else if (isArray(value)) {
      miniTable.push(property)
    } else if (isObject(value)) {
      miniData.push(property)
    } else {
      regulars.push(property)
    }
  }

  return id.concat(
    miniData,
    regulars,
    dates,
    description,
    miniTable,
    lastProperties
  )
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

export const isCreateable = (route, property) => {
  const meta = getMetaClass(route, property)

  for (const value of Object.values(meta)) {
    if (value === true) return true
  }

  return false
}

export const camelToHyphen = (camel) =>
  camel.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())

export const createTagOption = (tags, onAddTag, tag, className, tagType) => (
  <div
    className={"option " + className + (tags.includes(tag) ? " active" : "")}
    value={tag}
    key={tag}
    onClick={onAddTag(tag, tagType)}
  >
    {tag}
  </div>
)

export const createTagOptions = (arr, allTags) => {
  let tagOptions = []

  for (const [tagType, typeOfTags] of Object.entries(allTags)) {
    const className = camelToHyphen(tagType)
    const typeOfTagOptions = typeOfTags.map((tag) =>
      createTagOption(...arr, tag, className, tagType)
    )

    tagOptions = tagOptions.concat(typeOfTagOptions)
  }

  return tagOptions
}
