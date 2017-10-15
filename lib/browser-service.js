'use strict'

export default class TemplateBrowserService {
  constructor({ getServices, notificationManager, mainState, privateSocket, publicSockets }) {
    this.privateSocket = privateSocket
    this.mainState = mainState
  }

  openSettings () {
    this.mainState.openSettings('template_settings') // uses the main DIV id as identifier
  }

  openPanel () {
    this.mainState.openEditPanel('asterism-plugin-template', 0) // 0 is the panel idx in the declarative array (index.js)
  }
}
