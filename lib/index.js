'use strict'

import { version, name as packageName } from '../package.json'

const envDir = (process.env.NODE_ENV === 'production') ? 'dist' : 'lib'
const cssExtension = (process.env.NODE_ENV === 'production') ? 'css' : 'scss'

const manifest = {
  name: packageName, // This is the human readable name of your plugin.
  libName: packageName, // This name must be worldwide unique.
  version, // The declared version of your plugin, as in your package.sjon file.
  privateSocket: true, // true to auto link a private Socket.io channel between your services (server <-> browser)
  dependencies: [
    // 'asterism-scenarii'
  ], // Other plugins libNames required at boot (it up to you to register them at boot sequence)

  // Server side parameters
  server: {
    middlewares: (context) => [
      `${packageName}/${envDir}/server-middleware`
    ], // Returns an array of services to include as middlewares on the server side.
    publicSockets: [
      `${packageName}/test`
    ] // Creates public Socket.io channels, that every plugin can reach.
  },

  // Browser side parameters
  browser: {
    editPanels: [
      `${packageName}/${envDir}/panel`
    ], // Returns a list of panels to include as modal in the asterism main component.
    services: (context) => [
      `${packageName}/${envDir}/browser-service`
    ], // Returns an array of services to include on the browser side.
    publicSockets: [
      `${packageName}/test`
    ], // Request to plug to public Socket.io channels created by server side services.
    itemFactory: `${packageName}/${envDir}/item-factory`, // Allow to generate item types that the user can add on its dashboard.
    settingsPanel: `${packageName}/${envDir}/settings`, // Adds a panel the user can access in edit mode only, through the main settings panel, with a new tab.
    styles: `${packageName}/${envDir}/styles.${cssExtension}` // inject CSS elements during compilation. Keep your class names very specific to avoid conflicts.
  }
}

export default manifest
