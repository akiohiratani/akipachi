import type { GameOrder } from '../../domain/game'

type RuleBarProps = {
  order: GameOrder
}

const ruleLabels: Record<GameOrder, string> = {
  ascending: '小さい順',
  descending: '大きい順',
}

const ruleDescriptions: Record<GameOrder, string> = {
  ascending: '小さい数字から',
  descending: '大きい数字から',
}

export const RuleBar = ({ order }: RuleBarProps) => (
  <div className="rule-bar" aria-live="polite">
    <span>現在のルール</span>
    <strong>{ruleLabels[order]}</strong>
    <small>{ruleDescriptions[order]}</small>
  </div>
)
