export const orderColDefs = (colDefs) => {
  const foreign = []
  const originals = []
  const optionals = []
  const dates = []
  const foreigns = []
  const description = []

  for (const colDef of colDefs) {
    const {
      accessorKey: property,
      meta: { isOriginal, isOptional, isForeign, isForeigns },
    } = colDef

    if (property.slice(-2) === "At") {
      dates.push(colDef)
    } else if (property === "description") {
      description.push(colDef)
    } else if (isOriginal) {
      originals.push(colDef)
    } else if (isOptional) {
      optionals.push(colDef)
    } else if (isForeign) {
      foreign.push(colDef)
    } else if (isForeigns) {
      foreigns.push(colDef)
    }
  }

  return foreign.concat(originals, optionals, dates, foreigns, description)
}
