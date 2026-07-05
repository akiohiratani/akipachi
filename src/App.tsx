import { useNumberSequenceGame } from './application/useNumberSequenceGame'
import { ClearModal } from './presentation/components/ClearModal'
import { GameBoard } from './presentation/components/GameBoard'
import { RuleBar } from './presentation/components/RuleBar'
import { TimerDisplay } from './presentation/components/TimerDisplay'
import './App.css'

function App() {
  const {
    game,
    timeRemaining,
    isClearModalOpen,
    selectTile,
    startNextGame,
  } = useNumberSequenceGame()

  return (
    <main className="app-shell">
      <section className="game-panel" aria-labelledby="game-title">
        <div className="game-header">
          <div>
            <p className="eyebrow">Pattern order</p>
            <h1 id="game-title">順番クリックゲーム</h1>
          </div>
          <TimerDisplay timeRemaining={timeRemaining} />
        </div>

        <RuleBar order={game.order} />

        <GameBoard tiles={game.tiles} onSelectTile={selectTile} />
      </section>

      <ClearModal isOpen={isClearModalOpen} onClose={startNextGame} />
    </main>
  )
}

export default App
