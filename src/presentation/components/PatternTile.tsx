import { useEffect, useState } from 'react'
import type { Tile } from '../../domain/game'

type PatternTileProps = {
  tile: Tile
  onSelect: (value: number) => void
}

export const PatternTile = ({ tile, onSelect }: PatternTileProps) => {
  const [isCelebrating, setIsCelebrating] = useState(false)

  useEffect(() => {
    if (!tile.isCleared) {
      return
    }

    setIsCelebrating(true)

    const timeoutId = window.setTimeout(() => {
      setIsCelebrating(false)
    }, 150)

    return () => window.clearTimeout(timeoutId)
  }, [tile.isCleared])

  return (
    <button
      type="button"
      className={`pattern-tile${isCelebrating ? ' pattern-tile--correct' : ''}`}
      disabled={tile.isCleared}
      aria-label={`${tile.value}の画像`}
      aria-pressed={tile.isCleared}
      onClick={() => onSelect(tile.value)}
    >
      <img src={tile.imageSrc} alt="" draggable="false" />
    </button>
  )
}
