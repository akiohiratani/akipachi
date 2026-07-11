import { useCallback, useEffect, useState } from 'react'
import {
  TIME_LIMIT_SECONDS,
  clearTile,
  createGame,
  isExpectedTile,
  isGameCompleted,
  type GameState,
} from '../domain/game'

type GameStatus = 'playing' | 'missed' | 'cleared'

const MISS_MODAL_DURATION_MS = 5000

type UseNumberSequenceGameOptions = {
  onGameCleared?: () => void
}

export const useNumberSequenceGame = ({ onGameCleared }: UseNumberSequenceGameOptions = {}) => {
  const [game, setGame] = useState<GameState>(() => createGame())
  const [timeRemaining, setTimeRemaining] = useState(TIME_LIMIT_SECONDS)
  const [status, setStatus] = useState<GameStatus>('playing')
  const [missedProgress, setMissedProgress] = useState(0)

  const startNextGame = useCallback(() => {
    setGame(createGame())
    setTimeRemaining(TIME_LIMIT_SECONDS)
    setStatus('playing')
  }, [])

  const selectTile = useCallback(
    (value: number) => {
      if (status !== 'playing') {
        return
      }

      setGame((currentGame) => {
        if (!isExpectedTile(currentGame, value)) {
          setMissedProgress(currentGame.nextIndex)
          setTimeRemaining(TIME_LIMIT_SECONDS)
          setStatus('missed')
          return createGame()
        }

        const nextGame = clearTile(currentGame, value)

        if (isGameCompleted(nextGame)) {
          setStatus('cleared')
          onGameCleared?.()
        }

        return nextGame
      })
    },
    [onGameCleared, status],
  )

  useEffect(() => {
    if (status !== 'missed') {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setStatus('playing')
    }, MISS_MODAL_DURATION_MS)

    return () => window.clearTimeout(timeoutId)
  }, [status])

  useEffect(() => {
    if (status !== 'playing') {
      return
    }

    const timerId = window.setInterval(() => {
      setTimeRemaining((currentTime) => {
        if (currentTime <= 1) {
          setGame(createGame())
          return TIME_LIMIT_SECONDS
        }

        return currentTime - 1
      })
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [status])

  return {
    game,
    timeRemaining,
    isClearModalOpen: status === 'cleared',
    isMissModalOpen: status === 'missed',
    missedProgress,
    selectTile,
    startNextGame,
  }
}
