import { useGameSession } from './application/useGameSession'
import { useNumberSequenceGame } from './application/useNumberSequenceGame'
import { ClearModal } from './presentation/components/ClearModal'
import { ColorSelectionScreen } from './presentation/components/ColorSelectionScreen'
import { GameBoard } from './presentation/components/GameBoard'
import { RuleBar } from './presentation/components/RuleBar'
import { TimerDisplay } from './presentation/components/TimerDisplay'
import './App.css'

function App() {
  const {
    isColorSelected,
    selectionError,
    selectedColorLabel,
    selectColor,
    sendHoldAdd,
  } = useGameSession()

  const {
    game,
    timeRemaining,
    isClearModalOpen,
    selectTile,
    startNextGame,
  } = useNumberSequenceGame()

  const handleModalClose = () => {
    sendHoldAdd()
    startNextGame()
  }

  if (!isColorSelected) {
    return (
      <main className="app-shell">
        <ColorSelectionScreen initialError={selectionError} onSelectColor={selectColor} />
      </main>
    )
  }

  return (
    <main className="app-shell">
      <section className="game-panel" aria-labelledby="game-title">
        <div className="game-header">
          <div>
            <p className="eyebrow">Pattern order</p>
            <h1 id="game-title">順番クリックゲーム</h1>
          </div>
          <div className="game-header-actions">
            <div className="selected-color-badge" aria-live="polite">
              <span>選択色</span>
              <strong>{selectedColorLabel}</strong>
            </div>
            <TimerDisplay timeRemaining={timeRemaining} />
          </div>
        </div>

        <RuleBar order={game.order} />

        <GameBoard tiles={game.tiles} onSelectTile={selectTile} />
      </section>

      <ClearModal isOpen={isClearModalOpen} onClose={handleModalClose} />
    </main>
  )
}

export default App
