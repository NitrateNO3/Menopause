// Shelf sizes for article "books" (Learn page shelf and the mini shelf on articles).
// Sizes repeat after seven, so new articles still look like a natural shelf.
export const bookSizes = [
  { w: 74, h: 340 },
  { w: 64, h: 300 },
  { w: 82, h: 372 },
  { w: 68, h: 318 },
  { w: 78, h: 352 },
  { w: 62, h: 292 },
  { w: 72, h: 332 },
]

export const bookSize = (index) => bookSizes[index % bookSizes.length]
export const bookTone = (index) => `book--${index % 7}`
