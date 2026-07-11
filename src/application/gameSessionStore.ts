type ColorOption = {
  value: number
  label: string
}

export const COLOR_OPTIONS: ColorOption[] = [
  { value: 1, label: '赤' },
  { value: 2, label: '青' },
  { value: 3, label: 'オレンジ' },
  { value: 4, label: '緑' },
  { value: 5, label: 'ピンク' },
  { value: 6, label: '紫' },
  { value: 7, label: 'ゴールド' },
  { value: 8, label: '白' },
]

class GameSessionStore {
  private static instance: GameSessionStore

  private selectedColor: number | null = null
  private roomId: string | null = null

  static getInstance(): GameSessionStore {
    if (!GameSessionStore.instance) {
      GameSessionStore.instance = new GameSessionStore()
    }

    return GameSessionStore.instance
  }

  setColor(color: number) {
    this.selectedColor = color
  }

  getColor() {
    return this.selectedColor
  }

  getColorLabel() {
    return COLOR_OPTIONS.find((option) => option.value === this.selectedColor)?.label ?? '未選択'
  }

  setRoomId(roomId: string) {
    this.roomId = roomId
  }

  getRoomId() {
    return this.roomId
  }

  clear() {
    this.selectedColor = null
    this.roomId = null
  }
}

export const gameSessionStore = GameSessionStore.getInstance()
