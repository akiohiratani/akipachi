export type GameOrder = 'ascending' | 'descending'

export type Tile = {
  id: string
  value: number
  imageSrc: string
  isCleared: boolean
}

export type GameState = {
  tiles: Tile[]
  order: GameOrder
  nextIndex: number
  orderedValues: number[]
}

export const BOARD_SIZE = 9
export const MAX_PATTERN_NUMBER = 12
export const TIME_LIMIT_SECONDS = 60

export const createGame = (): GameState => {
  const values = shuffle(range(1, MAX_PATTERN_NUMBER)).slice(0, BOARD_SIZE)
  const order: GameOrder = Math.random() < 0.5 ? 'ascending' : 'descending'
  const orderedValues = [...values].sort((a, b) =>
    order === 'ascending' ? a - b : b - a,
  )

  return {
    tiles: values.map((value, index) => ({
      id: `${value}-${index}-${crypto.randomUUID()}`,
      value,
      imageSrc: `/Pattern/${value}.png`,
      isCleared: false,
    })),
    order,
    nextIndex: 0,
    orderedValues,
  }
}

export const isExpectedTile = (game: GameState, value: number) =>
  game.orderedValues[game.nextIndex] === value

export const clearTile = (game: GameState, value: number): GameState => ({
  ...game,
  nextIndex: game.nextIndex + 1,
  tiles: game.tiles.map((tile) =>
    tile.value === value ? { ...tile, isCleared: true } : tile,
  ),
})

export const isGameCompleted = (game: GameState) =>
  game.nextIndex >= game.orderedValues.length

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, index) => start + index)

const shuffle = <T,>(items: T[]) => {
  const shuffled = [...items]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ]
  }

  return shuffled
}
