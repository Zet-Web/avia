export const hasBottomMenu = (path: string) => {
  const excludedPaths = [
    '/partners',
    '/advertising',
    '/about',
    '/faq',
    '/project',
    '/article',
    '/404',
    '/500',
  ]
  if (excludedPaths.includes(path)) {
    return false
  }

  return true
}
