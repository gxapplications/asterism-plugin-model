'use strict'

/* global $ */
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { Col, Button, Icon, Input, Preloader, Row } from 'react-materialize'
import uuid from 'uuid'

import { CollectionSetting } from 'asterism-plugin-library'

import styles from '../styles.scss'

class TemplateSettings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      elements: [],
      currentElement: null,
      deleteConfirmation: false
    }
    this._mounted = false;
  }

  componentDidMount () {
    this._mounted = true;
    $('#template_settings .card-reveal .card-title').on('click', () => {
      this.setState({ currentElement: null })
    })

    this.props.serverStorage.getItem('elementsList')
    .then((elements) => {
      if (this._mounted) {
        console.log(`Restoring ${elements.length} items in the template settings collection...`)
        this.setState({ elements })
      }
    })
    .catch((error) => {
      if (error.status === 404 && this._mounted) {
        this.setState({ elements: [] })
      }
    })
  }

  componentWillUnmount () {
    this._mounted = false;
  }

  render () {
    const { theme, animationLevel } = this.props
    const { elements, currentElement, deleteConfirmation } = this.state
    const waves = animationLevel >= 2 ? 'light' : undefined

    const list = elements.map((el) => ({
      title: el.title || 'Unnamed',
      icon: 'image',
      onClick: this.configureElement.bind(this, el),
      details: el.url || ''
      /* secondary: {
        icon: 'more_vert',
        onClick: () => {},
      } */
    }))

    return (
      <div id='template_settings' className='card'>
        <div className='section left-align scrollable'>
          <h5>Setting example</h5>
          <p>
            Manage your elements here. In this case they can be used by all devices.
          </p>

          <CollectionSetting theme={theme} animationLevel={animationLevel}
            list={list} header='Configured images'
            addElement={{
              empty: { title: 'Add your first image', icon: 'collections' },
              trailing: { title: 'Add an image' },
              onClick: this.addElement.bind(this)
            }}
          />

        </div>

        <div className={cx('card-reveal', theme.backgrounds.body)}>
          <span className='card-title'>Configure image<Icon right>close</Icon></span>
          {currentElement ? (
            <div>
              <Row className='padded card'>
                <Input s={12} label='Title' ref={(c) => { this._title = c }}
                  defaultValue={currentElement.title} />
                <Input s={12} label='URL' ref={(c) => { this._url = c }}
                  defaultValue={currentElement.url} />
              </Row>
              <Button waves={waves} className={cx('right', theme.actions.primary)} onClick={this.save.bind(this)}>
                Save
              </Button>
              <Button waves={waves} flat={!deleteConfirmation} onClick={this.remove.bind(this)}
                className={cx('left', { [theme.actions.negative]: deleteConfirmation })}>
                Delete
              </Button>
            </div>
          ) : (
            <Row><Col s={12} className='center-align'><Preloader size='big'/></Col></Row>
          )}
        </div>
      </div>
    )
  }

  addElement () {
    this.setState({ currentElement: {
      id: uuid.v4(),
      title: '',
      url: ''
    } })
  }

  configureElement (element) {
    this.setState({ currentElement: element })
  }

  save () {
    const currentElement = {
      ...this.state.currentElement,
      title: this._title.state.value,
      url: this._url.state.value
    }
    const elements = this.state.elements.filter((el) => (el.id !== currentElement.id))
    elements.push(currentElement)
    elements.sort((a, b) => {
      const nA = a.title.toLowerCase()
      const nB = b.title.toLowerCase()
      if (nA < nB) {
          return -1
      }
      if (nA > nB) {
          return 1
      }
      return 0
    })

    this.props.serverStorage.setItem('elementsList', elements)
    .then(() => {
      if (this._mounted) {
        this.setState({ elements, currentElement: null, deleteConfirmation: false })
        $('#template_settings .card-reveal .card-title').click()
      }
    })
    .catch((error) => {
      if (this._mounted) {
        this.setState({ deleteConfirmation: false })
      }
      console.error(error)
    })
  }

  remove () {
    if (!this.state.deleteConfirmation) {
      this._deleteTimer = setTimeout(() => {
        if (this._mounted) {
          this.setState({ deleteConfirmation: false })
        }
      }, 2000)
      return this.setState({ deleteConfirmation: true })
    }

    const id = this.state.currentElement.id
    const elements = this.state.elements.filter((el) => (el.id !== id))

    this.props.serverStorage.setItem('elementsList', elements)
    .then(() => {
      if (this._mounted) {
        this.setState({ elements, currentElement: null, deleteConfirmation: false })
        $('#template_settings .card-reveal .card-title').click()
      }
    })
    .catch((error) => {
      if (this._mounted) {
        this.setState({ deleteConfirmation: false })
      }
      console.error(error)
    })
  }
}

TemplateSettings.propTypes = {
  theme: PropTypes.object.isRequired,
  serverStorage: PropTypes.object.isRequired,
  showRefreshButton: PropTypes.func.isRequired,
  animationLevel: PropTypes.number.isRequired
}

TemplateSettings.tabName = 'Template example'

export default TemplateSettings
