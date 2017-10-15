'use strict'

import { Item } from 'asterism-plugin-library'
import cx from 'classnames'
import React from 'react'
import { Button, Icon, Modal } from 'react-materialize'

import styles from '../styles.scss'

class AnimatedFrameItem extends Item {
  constructor (props) {
    super(props)
    this.state.url = null
    this.state.elementInvalid = false
  }

  componentDidMount () {
    this.fetchUrl()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.params.id !== this.state.params.id) {
      this.fetchUrl()
    }
  }

  render () {
    const { mainState, theme } = this.props.context
    const { animationLevel } = mainState()
    const { title = null } = this.state.params
    const { url, elementInvalid } = this.state

    if (elementInvalid) {
      return (
        <div className='grey lighten-2 truncate fluid'>
          <br />
          <Icon medium>broken_image</Icon>
        </div>
      )
    }

    const clickableItem = (
      <Button id='myCamera' waves={animationLevel >= 2 ? 'light' : null}
        className={cx(styles.ipCam, 'truncate fluid', theme.backgrounds.card)}>
        {url ? (
          <object type='image/gif' data={url}>
            <div className='error red-text truncate'>
              Failure
            </div>
          </object>
        ) : null}
        {title ? (
          <div className='overlay truncate'>
            {title}
          </div>
        ) : null}
      </Button>
    )

    return (
      <Modal id='myCameraModal' header={title}
        modalOptions={{
          inDuration: animationLevel >= 2 ? 300 : 0,
          outDuration: animationLevel >= 2 ? 300 : 0
        }}
        trigger={clickableItem}>
        {url ? (
            <object type='image/gif' data={url}>
              <div className='error red-text truncate'>
                Failure
              </div>
            </object>
        ) : null}
      </Modal>
    )
  }

  fetchUrl () {
    const id = this.state.params.id
    this.props.context.serverStorage.getItem('elementsList')
    .then((elements) => {
      const element = elements.find((el) => el.id === id)
      this.setState({ url: element.url, elementInvalid: false })
    })
    .catch((error) => {
      this.setState({ elementInvalid: true })
    })
  }
}

export default AnimatedFrameItem
