'use strict'

/* global $ */
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import styles from '../styles.scss'

class TemplatePanel extends React.Component {
  constructor (props) {
    super(props)

    this._socket = props.privateSocket
    this._myService = props.services()['asterism-plugin-template']
  }

  render () {
    const { theme, animationLevel } = this.props
    const waves = animationLevel >= 2 ? 'light' : undefined

    return (
      <div id='template_panel' className='thin-scrollable'>
        Hello world
      </div>
    )
  }
}

TemplatePanel.propTypes = {
  serverStorage: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  animationLevel: PropTypes.number.isRequired,
  localStorage: PropTypes.object.isRequired,
  services: PropTypes.func.isRequired,
  privateSocket: PropTypes.object.isRequired
}

TemplatePanel.label = 'Template frame'
TemplatePanel.icon = 'warning'
TemplatePanel.hideHeader = false

TemplatePanel.onReady = () => {

}

export default TemplatePanel
