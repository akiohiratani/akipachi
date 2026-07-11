import type { GameOrder } from '../../domain/game'

type RuleBarProps = {
  order: GameOrder
}

const ruleLabels: Record<GameOrder, string> = {
  ascending: '古い順',
  descending: '新しい順',
}

export const RuleBar = ({ order }: RuleBarProps) => (
  <div className="rule-bar" aria-live="polite">
    <span>現在のルール：</span>
    <strong>{ruleLabels[order]}</strong>
  </div>
)
