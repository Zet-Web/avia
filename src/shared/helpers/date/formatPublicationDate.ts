export const formatPublicationDate = (
  createdAt: string,
  locale: string | undefined
): string => {
  return new Date(createdAt).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
