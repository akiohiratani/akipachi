type TimerDisplayProps = {
  timeRemaining: number
}

export const TimerDisplay = ({ timeRemaining }: TimerDisplayProps) => (
  <div className="timer-display" aria-live="polite">
    <span>残り</span>
    <strong>{timeRemaining}</strong>
    <span>秒</span>
  </div>
)
