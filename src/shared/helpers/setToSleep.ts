export function setToSleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
