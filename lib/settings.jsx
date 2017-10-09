'use strict'

import PropTypes from 'prop-types'
import React from 'react'

class TemplateSettings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='carousel-item' href='#template!'>
        <h2>TemplateSettings</h2>
        Here, put your plugin settings...
      </div>
    )
  }
}

TemplateSettings.propTypes = {
  theme: PropTypes.object.isRequired,
  showRefreshButton: PropTypes.func.isRequired
}

export default TemplateSettings
