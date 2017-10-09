'use strict'

import { Item } from 'asterism-plugin-library'
import cx from 'classnames'
import React from 'react'
import { Button, Icon, Modal } from 'react-materialize'

import styles from '../styles.scss'

class AnimatedFrameItem extends Item {
  render () {
    const { mainState, theme } = this.props.context
    const { animationLevel } = mainState()
    const { title = null } = this.state.params

    const clickableItem = (
      <Button id='myCamera' waves={animationLevel >= 2 ? 'light' : null}
        className={cx(styles.ipCam, 'truncate fluid', theme.backgrounds.card)}>
        <object type='image/gif' data='https://data.photofunky.net/output/image/d/b/c/4/dbc4fe/photofunky.gif'>
          <div className='error red-text truncate'>
            Failure
          </div>
        </object>
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
        <object type='image/gif' data='https://data.photofunky.net/output/image/d/b/c/4/dbc4fe/photofunky.gif'>
          <div className='error red-text truncate'>
            Failure
          </div>
        </object>
      </Modal>
    )
  }
}

export default AnimatedFrameItem
