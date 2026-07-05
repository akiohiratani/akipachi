import type { Tile } from '../../domain/game'
import { PatternTile } from './PatternTile'

type GameBoardProps = {
  tiles: Tile[]
  onSelectTile: (value: number) => void
}

export const GameBoard = ({ tiles, onSelectTile }: GameBoardProps) => (
  <div className="game-board" aria-label="3かける3のゲーム盤">
    {tiles.map((tile) => (
      <PatternTile key={tile.id} tile={tile} onSelect={onSelectTile} />
    ))}
  </div>
)
