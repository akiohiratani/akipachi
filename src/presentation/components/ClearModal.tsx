type ClearModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const ClearModal = ({ isOpen, onClose }: ClearModalProps) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <div
        className="clear-modal"
        role="dialog"
        aria-labelledby="clear-title"
        aria-modal="true"
      >
        <h2 id="clear-title">ゲームクリア</h2>
        <p>制限時間内にすべて正しい順番でクリックできました。</p>
        <button type="button" onClick={onClose} autoFocus>
          次のゲームへ
        </button>
      </div>
    </div>
  )
}
