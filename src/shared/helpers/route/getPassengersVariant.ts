export const getPassengersVariant = (
  numberOfPassengers: number
): string => {
  // This function return a variant of the word "passenger" depending on the number of passengers
  let wordVariant
  let num = numberOfPassengers % 100
  // case for numbers from 5 to 20
  if (num >= 5 && num <= 20) {
    wordVariant = 'passengers.2'
  } else {
    num %= 10
    // case for numbers *1 (without *11)
    if (num === 1) {
      wordVariant = 'passengers.0'
    }
    // case for numbers from *2 to *4
    else if (num >= 2 && num <= 4) {
      wordVariant = 'passengers.1'
    } else {
      // all other cases get this variant
      wordVariant = 'passengers.2'
    }
  }
  return wordVariant
}
