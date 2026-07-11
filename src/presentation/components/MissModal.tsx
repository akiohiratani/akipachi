import { BOARD_SIZE } from '../../domain/game'

type MissModalProps = {
  isOpen: boolean
  completedCount: number
}

export const MissModal = ({ isOpen, completedCount }: MissModalProps) => {
  if (!isOpen) {
    return null
  }

  const remainingCount = BOARD_SIZE - completedCount

  return (
    <div className="modal-backdrop miss-modal-backdrop" role="presentation">
      <div
        className="miss-modal"
        role="dialog"
        aria-labelledby="miss-title"
        aria-describedby="miss-progress miss-encouragement"
        aria-modal="true"
      >
        <p className="miss-modal__label" id="miss-title">MISS</p>
        <p className="miss-modal__progress" id="miss-progress">
          <strong>{completedCount}</strong>/{BOARD_SIZE} <span>COMPLETE</span>
        </p>
        <p className="miss-modal__encouragement" id="miss-encouragement">
          あと<strong>{remainingCount}枚</strong>だった！
        </p>
        <div className="miss-modal__timer" aria-hidden="true" />
      </div>
    </div>
  )
}
