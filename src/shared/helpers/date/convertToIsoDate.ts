export const convertToIsoDate = (d: string) => {
  const date = new Date(d)

  date.toISOString().split('T')[0] !==
  new Date().toISOString().split('T')[0]
    ? date.setDate(date.getDate() + 1)
    : date

  return date.toISOString().split('T')[0]
}
