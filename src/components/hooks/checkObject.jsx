export const checkObject = (value) => {
  if (typeof value === "object" && value !== null) {
    return true
  } else {
    throw new Error(`Context cannot be : ${value}`)
  }
}
