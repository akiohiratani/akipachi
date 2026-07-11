type HoldAddPayload = {
  action: 'holdAdd'
  roomId: string
  color: number
}

export const createWebSocketClient = (endpoint: string) => {
  const socket = new WebSocket(endpoint)

  return {
    socket,
    sendHoldAdd: (roomId: string, color: number) => {
      const payload: HoldAddPayload = {
        action: 'holdAdd',
        roomId,
        color,
      }

      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(payload))
      }
    },
  }
}
