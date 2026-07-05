import { useCallback, useEffect, useState } from 'react'
import {
  TIME_LIMIT_SECONDS,
  clearTile,
  createGame,
  isExpectedTile,
  isGameCompleted,
  type GameState,
} from '../domain/game'

type GameStatus = 'playing' | 'cleared'

export const useNumberSequenceGame = () => {
  const [game, setGame] = useState<GameState>(() => createGame())
  const [timeRemaining, setTimeRemaining] = useState(TIME_LIMIT_SECONDS)
  const [status, setStatus] = useState<GameStatus>('playing')

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
          setTimeRemaining(TIME_LIMIT_SECONDS)
          return createGame()
        }

        const nextGame = clearTile(currentGame, value)

        if (isGameCompleted(nextGame)) {
          setStatus('cleared')
        }

        return nextGame
      })
    },
    [status],
  )

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
    selectTile,
    startNextGame,
  }
}
