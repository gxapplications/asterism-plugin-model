'use strict'

import cx from 'classnames'
import React from 'react'
import { Button, Icon, Input, Row } from 'react-materialize'

import { ItemSettingPanel } from 'asterism-plugin-library'
import AnimatedFrameItem from './item'

class AnimatedFrameSettingPanel extends ItemSettingPanel {
  constructor (props) {
    super(props)
    this.state.elements = []

    this.receiveNewParams(this.state.params)
  }

  receiveNewParams (params) {
    this.setState({
      params
    })
  }

  componentDidMount () {
    this.props.context.serverStorage.getItem('elementsList')
    .then((elements) => {
      this.setState({ elements })
    })
    .catch((error) => {
      if (error.status === 404) {
        this.setState({
          elements: []
        })
      }
      console.error(error)
    })
  }

  render () {
    const { context } = this.props
    const { animationLevel } = context.mainState()
    const waves = animationLevel >= 2 ? 'light' : undefined

    const { title = '', id = null } = this.state.params
    const { elements } = this.state

    return (
      <div className='clearing padded'>
        <Row className='padded card'>
          <Input s={9} m={10} type='select' label='Image' icon='image'
            defaultValue={id} ref={(c) => { this._id = c }}>
            <option key={-1} value=''>Please choose</option>
            {elements.map((el, idx) => (
              <option key={idx} value={el.id} selected={el.id === id}>{el.title}</option>
            ))}
          </Input>
          <Button waves={waves} className={cx('right btn-floating', context.theme.actions.secondary)}
            onClick={this.gotToSettings.bind(this)}>
            <Icon>add</Icon>
          </Button>
          <Input s={12} label='Animation name' ref={(c) => { this._title = c }}
            defaultValue={title} onChange={this.handleValueChange.bind(this, 'title')} />
        </Row>

        <Button waves={waves} className={cx('right', context.theme.actions.primary)} onClick={this.save.bind(this)}>
          Save &amp; close
        </Button>
      </div>
    )
  }

  save () {
    const params = { ...this.state.params, title: this._title.state.value, id: this._id.state.value }
    this.next(AnimatedFrameItem, params)
  }
}

export default AnimatedFrameSettingPanel
