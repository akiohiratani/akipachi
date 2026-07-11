import { useCallback, useEffect, useRef, useState } from 'react'
import { createWebSocketClient } from '../infrastructure/websocketClient'
import { gameSessionStore } from './gameSessionStore'

const getRoomIdFromUrl = () => {
  if (typeof window === 'undefined') {
    return null
  }

  return new URLSearchParams(window.location.search).get('roomId')
}

const getWebSocketEndpoint = (roomId: string) => {
  const endpoint = import.meta.env.VITE_WS_ENDPOINT

  if (!endpoint) {
    return null
  }

  const normalizedEndpoint = endpoint.endsWith('/') ? endpoint.slice(0, -1) : endpoint

  return `${normalizedEndpoint}?role=participant&roomId=${encodeURIComponent(roomId)}`
}

export const useGameSession = () => {
  const [isColorSelected, setIsColorSelected] = useState(Boolean(gameSessionStore.getColor()))
  const [selectionError, setSelectionError] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<number | null>(gameSessionStore.getColor())
  const socketClientRef = useRef<ReturnType<typeof createWebSocketClient> | null>(null)

  const closeSocket = useCallback(() => {
    socketClientRef.current?.socket.close()
    socketClientRef.current = null
  }, [])

  const selectColor = useCallback(
    (color: number) => {
      const roomId = getRoomIdFromUrl()

      if (!roomId) {
        setSelectionError('roomIdが取得できませんでした。URLを確認してください。')
        setIsColorSelected(false)
        setSelectedColor(null)
        gameSessionStore.clear()
        return
      }

      const endpoint = getWebSocketEndpoint(roomId)

      if (!endpoint) {
        setSelectionError('WebSocket接続先が設定されていません。')
        setIsColorSelected(false)
        setSelectedColor(null)
        return
      }

      gameSessionStore.setColor(color)
      gameSessionStore.setRoomId(roomId)

      setSelectedColor(color)
      setSelectionError(null)
      setIsColorSelected(true)

      closeSocket()
      socketClientRef.current = createWebSocketClient(endpoint)
    },
    [closeSocket],
  )

  const retrySelection = useCallback(() => {
    const roomId = getRoomIdFromUrl()

    if (!roomId) {
      setSelectionError('roomIdが取得できませんでした。URLを確認してください。')
      setIsColorSelected(false)
      setSelectedColor(null)
      gameSessionStore.clear()
      return
    }

    setSelectionError(null)
    setIsColorSelected(false)
    setSelectedColor(null)
    gameSessionStore.clear()
  }, [])

  const sendHoldAdd = useCallback(() => {
    const roomId = gameSessionStore.getRoomId()
    const color = gameSessionStore.getColor()

    if (!roomId || color === null) {
      return
    }

    socketClientRef.current?.sendHoldAdd(roomId, color)
  }, [])

  useEffect(() => {
    const roomId = getRoomIdFromUrl()

    if (!roomId) {
      setSelectionError('roomIdが取得できませんでした。URLを確認してください。')
      setIsColorSelected(false)
      setSelectedColor(null)
      gameSessionStore.clear()
      return
    }

    gameSessionStore.setRoomId(roomId)
  }, [])

  useEffect(() => () => closeSocket(), [closeSocket])

  return {
    isColorSelected,
    selectionError,
    selectedColor,
    selectedColorLabel: gameSessionStore.getColorLabel(),
    selectColor,
    retrySelection,
    sendHoldAdd,
  }
}
