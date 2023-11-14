export function scrollLock(isLocked: boolean) {
  if (isLocked) {
    document.body.style.height = '100vh'
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
}
