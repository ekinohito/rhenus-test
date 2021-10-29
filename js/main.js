function sumSpaces(array) {
  return array
    .sort()
    .reduce(({ previousValue, accumulator }, currentValue) => {
      const space = (currentValue + previousValue) * (currentValue - previousValue - 1) / 2
      return { previousValue: currentValue, accumulator: (space > 0)?accumulator + space:accumulator}
    }, { previousValue: array[0], accumulator: 0 })
    .accumulator
}

console.log(`[1, 3, 4, 6] -> ${sumSpaces([1, 3, 4, 6])}`)
console.log(`[45, 48] -> ${sumSpaces([45, 48])}`)
console.log(`[1, 2, 3] -> ${sumSpaces([1, 2, 3])}`)

Array.prototype.weave = function (anotherArray) {
  this.reduce((previousValue, currentValue) => {
    if (currentValue < previousValue)
      throw new Error("this array is not sorted")
    return currentValue
  })
  anotherArray.reduce((previousValue, currentValue) => {
    if (currentValue < previousValue)
      throw new Error("another array is not sorted")
    return currentValue
  })
  const { anotherArray: remaining, result } = this.reduce(({ anotherArray, result } , currentValue) => {
    const partitionIndex = anotherArray.findIndex(value => value > currentValue)
    if (partitionIndex < 0)
      return {
        anotherArray: [],
        result: [...result, ...anotherArray, currentValue]
      }
    return {
      anotherArray: anotherArray.slice(partitionIndex),
      result: [...result, ...anotherArray.slice(0, partitionIndex), currentValue]
    }
  }, { anotherArray, result: [] })
  return [...result, ...remaining]
}

console.log(`[1, 3, 4], [1, 2, 6] -> ${[1, 3, 4].weave([1, 2, 6])}`)
console.log(`[1, 2, 3, 4], [2, 5, 10] -> ${[1, 2, 3, 4].weave([2, 5, 10])}`)
try {
  console.log(`[1, 3, 2], [1, 2, 3] -> ${[1, 3, 2].weave([1, 2, 3])}`)
} catch (e) {
  console.error(e)
}

function computeRating(starsQuantity) {
  const totalQuantity = starsQuantity.reduce((totalQuantity, currentQuantity) => totalQuantity + currentQuantity)
  if (totalQuantity === 0)
    throw new Error("no reviews")
  const starsSum = starsQuantity.map((quantity, value) => quantity * (value + 1)).reduce((sum, value) => sum + value)
  const rating = starsSum / totalQuantity
  return [+(rating).toFixed(2), "*".repeat(Math.round(rating))]
}

console.log(`[0, 2, 0, 1, 23] -> ${computeRating([0, 2, 0, 1, 23])}`)
console.log(`[16, 17, 23, 40, 45] -> ${computeRating([16, 17, 23, 40, 45])}`)
console.log(`[55, 67, 98, 115, 61] -> ${computeRating([55, 67, 98, 115, 61])}`)

function makeLengthRecorder() {
  let quantity = 0
  let length = 0
  return function (newString) {
    const words = newString.split(/[ .,]+/).filter(word => word !== "")
    quantity += words.length
    length += words.reduce((length, value) => length + value.length, 0)
    if (quantity === 0)
      throw new Error("no words")
    return +(length / quantity).toFixed(2)
  }
}
const averageLength = makeLengthRecorder()

console.log(`"Я хорошо знаю javascript" -> ${averageLength("Я хорошо знаю javascript")}`)
console.log(`"Но некоторые вопросы вызывают трудности, например замыкания." -> ${
  averageLength("Но некоторые вопросы вызывают трудности, например замыкания.")}`)

function differentPathsQuantity({ x, y }) {
  function factorial(n) {
    let result = 1
    for (let i = 2; i <= n; ++i)
      result *= i
    return result
  }
  const horizontalSteps = Math.abs(x)
  const verticalSteps = Math.abs(y)
  const totalSteps = horizontalSteps + verticalSteps
  return factorial(totalSteps) / factorial(horizontalSteps) / factorial(verticalSteps)
}

console.log(`{x: 0, y: 1} -> ${differentPathsQuantity({x: 0, y: 1})}`)
console.log(`{x: 1, y: 1} -> ${differentPathsQuantity({x: 1, y: 1})}`)
console.log(`{x: 2, y: 2} -> ${differentPathsQuantity({x: 2, y: 2})}`)


