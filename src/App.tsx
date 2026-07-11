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
      <div className="selected-color-badge" aria-live="polite">
        <span className="selected-color-dot" data-label={selectedColorLabel} />
        <strong>{selectedColorLabel}</strong>
      </div>

      <section className="game-panel" aria-labelledby="game-title">
        <div className="game-header">
          <div className="title-group">
            <p className="eyebrow">Aki Pach</p>
          </div>
        </div>

        <div className="status-row">
          <RuleBar order={game.order} />
          <TimerDisplay timeRemaining={timeRemaining} />
        </div>

        <GameBoard tiles={game.tiles} onSelectTile={selectTile} />
      </section>

      <ClearModal isOpen={isClearModalOpen} onClose={handleModalClose} />
    </main>
  )
}

export default App
