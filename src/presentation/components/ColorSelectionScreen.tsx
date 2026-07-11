import { COLOR_OPTIONS } from '../../application/gameSessionStore'

type ColorSelectionScreenProps = {
  initialError?: string | null
  onSelectColor: (color: number) => void
}

export const ColorSelectionScreen = ({ initialError, onSelectColor }: ColorSelectionScreenProps) => (
  <section className="color-selection-screen" aria-labelledby="color-selection-title">
    <div className="color-selection-card">
      <p className="eyebrow">Color selection</p>
      <h1 id="color-selection-title">色を選択してください</h1>
      {initialError ? <p className="selection-error">{initialError}</p> : null}
      <p className="selection-description">
        参加する色を1つ選ぶと、ゲームが始まります。
      </p>
      <div className="color-options" role="list">
        {COLOR_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            className="color-option"
            onClick={() => onSelectColor(option.value)}
          >
            <span className="color-swatch" data-color={option.label} />
            <span>{option.label}</span>
          </button>
        ))}
      </div>
      <p className="selection-hint">選択した色は画面上部に常時表示されます。</p>
    </div>
  </section>
)
