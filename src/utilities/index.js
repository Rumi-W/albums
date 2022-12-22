export const deepCopy = (array) => (!array.length ? [] : array.map((obj) => ({ ...obj })))
