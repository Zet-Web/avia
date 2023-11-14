export const checkPaginationButton = (
  limit: number,
  count: number,
  tickets: number | undefined
) => {
  return !!(tickets && count > limit && count - tickets > 0)
}
