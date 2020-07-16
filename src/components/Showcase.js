import React, { useState, useContext } from 'react'
import { AuthContext } from '../contexts/auth'
import img3 from '../assets/img/img3.jpg'
import { useHistory } from 'react-router-dom'
import AuthModal from './Modals/AuthModal'
import { Button } from '@material-ui/core'


const Showcase = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const history = useHistory()
  const { user } = useContext(AuthContext)

  const handleClick = () => {
    user ? history.push('rsvp') : setModalVisible(true)
  }
  return (
    <div style={styles.container}>
      <div style={styles.textContainer}>
        <h1 style={styles.text}>We're Getting Married!</h1>
        <Button
          onClick={handleClick}
          variant="contained"
          style={styles.rsvpButton}
        >
          R.S.V.P.
        </Button>

        <AuthModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    backgroundColor: 'white',
    backgroundImage: `url(${img3})`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    objectFit: 'contain',
    height: 600,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 200
  },
  text: {
    color: 'white',
    fontFamily: 'Allura',
    fontSize: '2.2rem'
  },
  rsvpButton: {
    width: 100,
    backgroundColor: 'rgb(248, 231, 209)',
    fontFamily: 'Allura',
    fontWeight: 800
  }
}

export default Showcase