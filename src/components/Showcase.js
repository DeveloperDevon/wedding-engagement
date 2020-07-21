import { Button } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import img3 from '../assets/img/img3.jpg'
import { AuthContext } from '../contexts/auth'
import { handleRsvp } from '../helpers'
import AuthModal from './Modals/AuthModal'


const Showcase = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const history = useHistory()
  const { auth, admin } = useContext(AuthContext)

  return (
    <div style={styles.container}>
      <div style={styles.textContainer}>
        <h1 style={styles.text}>We're Getting Married!</h1>
        <Button onClick={() => handleRsvp(auth, admin, history, setModalVisible)} variant="contained" style={styles.rsvpButton}>R.S.V.P.</Button>

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