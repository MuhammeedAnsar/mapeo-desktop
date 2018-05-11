import React from 'react'

import MapEditor from './MapEditor'
import Sidebar from './Sidebar'
import Welcome from './Welcome'

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    var self = this
    var showedWelcome = localStorage.getItem('showedWelcome')
    self.state = {
      View: showedWelcome ? MapEditor : 'Welcome'
    }
    if (!showedWelcome) localStorage.setItem('showedWelcome', true)

    var prevhash = localStorage.getItem('location')
    if (location.hash) localStorage.setItem('location', location.hash)
    else if (prevhash) location.hash = prevhash

    window.addEventListener('hashchange', function (ev) {
      localStorage.setItem('location', location.hash)
    })
  }

  changeView (View) {
    this.setState({View})
  }

  render () {
    const {View} = this.state
    if (View === 'Welcome') return <Welcome openMap={this.changeView.bind(this, 'MapEditor')} />

    return (
      <div className='full'>
        <Sidebar changeView={this.changeView.bind(this)} />
        <View />
      </div>
    )
  }
}
