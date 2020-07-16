import React from 'react'
import { useHistory } from 'react-router-dom'

const Navbar = () => {
  const history = useHistory()

  return (
    <div style={styles.navbarContainer}>
      <div></div>
      <h1 style={styles.headerText} onClick={() => history.push('/')}>Chandler & Devon</h1>
      <div></div>
    </div >
  )
}

const styles = {
  navbarContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: '#efefef',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',

  },
  headerText: {
    textAlign: 'center',
    paddingTop: 10,
    fontFamily: 'Allura'
  },
  rightIcon: {
    padding: 15
  }
}

export default Navbar