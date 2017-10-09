'use strict'

import { version, name as packageName } from '../package.json'

const envDir = (process.env.NODE_ENV === 'production') ? 'dist' : 'lib'
const cssExtension = (process.env.NODE_ENV === 'production') ? 'css' : 'scss'

const manifest = {
  name: packageName,
  developmentLibName: packageName,
  version,
  privateSocket: false,
  server: {
    publicSockets: [
      `${packageName}/test`
    ]
  },
  browser: {
    publicSockets: [
      `${packageName}/test`
    ],
    itemFactory: `${packageName}/${envDir}/item-factory`,
    settingsPanel: `${packageName}/${envDir}/settings`,
    styles: `${packageName}/${envDir}/styles.${cssExtension}`
  }
}

export default manifest
