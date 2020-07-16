import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import { Button } from '@material-ui/core'
import ExitToApp from '@material-ui/icons/ExitToApp'
import { auth } from '../../services/firebase'


const Navbar = () => {
  const history = useHistory()
  const [pathname, setPathname] = useState(history.location.pathname)
  const { user } = useContext(AuthContext)


  useEffect(() => {
    setPathname(history.location.pathname)
  }, [history])

  const handleSignOut = () => {
    auth().signOut()
      .then(() => {
        history.push('/')
        localStorage.clear()
      })
      .catch((err) => console.error(err))
  }

  return (
    <div style={styles.navbarContainer}>
      <div></div>
      <h1 style={styles.headerText} onClick={() => history.push('/')}>Chandler & Devon</h1>
      <div>
        {(pathname !== '/' && !!user) &&
          <Button style={styles.rightIcon}>
            <ExitToApp onClick={handleSignOut} />
          </Button>}
      </div>
    </div >
  )
}

const styles = {
  navbarContainer: {
    display: 'flex',
    // position: 'absolute',
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