'use strict'

import express from 'express'

const exampleServerMiddleware = (context) => {
  const { dataHandler, logger, notificationHandler } = context
  const router = express.Router() // returns express router singleton, used by asterism.

  const _plugSocketListeners = (socket) => {
    socket.on('get-hello', (ack) => {
      ack({ test: 'Hello there' })
    })
  }

  router.connectPlugin = (getServices) => {
    // On connect (when asterism is booting plugins)
    context.privateSocketIo.on('connect', (socket) => {
      // This connects only when private socket is connected from a browser instance that visits asterism page.
      _plugSocketListeners(socket)
    })
  }

  router.disconnectPlugin = () => {
    // On disconnect (when asterism is shutting down)
  }

  return router
}

export default exampleServerMiddleware
