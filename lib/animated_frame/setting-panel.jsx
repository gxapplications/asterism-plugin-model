'use strict'

import React from 'react'
import { Button, Input, Row } from 'react-materialize'

import { ItemSettingPanel } from 'asterism-plugin-library'
import AnimatedFrameItem from './item'

class AnimatedFrameSettingPanel extends ItemSettingPanel {
  render () {
    const { context } = this.props
    const { animationLevel } = context.mainState()
    const waves = animationLevel >= 2 ? 'light' : undefined

    const { title = '' } = this.state.params

    return (
      <div className='clearing padded'>
        <Row className='padded card'>
          <Input placeholder='A train' s={12} label='Animation name' ref={(c) => { this._title = c }}
            value={title} onChange={this.handleValueChange.bind(this, 'title')} />
        </Row>

        <Button waves={waves} className='right' onClick={this.save.bind(this)}>
          Save &amp; close
        </Button>
      </div>
    )
  }

  save () {
    const params = { ...this.state.params, title: this._title.state.value }
    this.next(AnimatedFrameItem, params)
  }
}

export default AnimatedFrameSettingPanel
