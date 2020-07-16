import React from 'react'
import { withRouter } from 'react-router'

const Navbar = ({ history }) => {
  return (
    <div style={styles.navbarContainer}>
      <h1 style={styles.headerText}>Chandler & Devon</h1>
    </div>
  )
}

const styles = {
  navbarContainer: {
    flex: 1,
    height: 60,
    backgroundColor: '#efefef',
  },
  headerText: {
    textAlign: 'center',
    padding: 10,
    fontFamily: 'Allura'
  }
}

export default Navbar