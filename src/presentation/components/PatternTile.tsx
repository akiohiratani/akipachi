import type { Tile } from '../../domain/game'

type PatternTileProps = {
  tile: Tile
  onSelect: (value: number) => void
}

export const PatternTile = ({ tile, onSelect }: PatternTileProps) => (
  <button
    type="button"
    className="pattern-tile"
    disabled={tile.isCleared}
    aria-label={`${tile.value}の画像`}
    aria-pressed={tile.isCleared}
    onClick={() => onSelect(tile.value)}
  >
    <img src={tile.imageSrc} alt="" draggable="false" />
  </button>
)
