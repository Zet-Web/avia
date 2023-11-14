type Time = { h: string; m: string }

export const convertMinsToHrsMins = (mins: number, t: Time) => {
  const hours = Math.trunc(mins / 60)
  const minutes = Math.trunc(mins % 60)
  return `${hours}${t.h} ${minutes}${t.m}`
}
