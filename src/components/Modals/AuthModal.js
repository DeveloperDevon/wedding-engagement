import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import Modal from 'react-modal'
import { auth } from '../../services/firebase'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

Modal.setAppElement('#root')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgb(248, 231, 209)',
    fontFamily: 'Allura',
  }
};

const AuthModal = ({ modalVisible, setModalVisible }) => {
  const history = useHistory()
  const [guestName, setGuestName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password)
      history.push('/rsvp', { guestName })
      localStorage.setItem('guestName', guestName ? guestName : '')

    } catch (error) {
      alert(error.message)
    }
  }

  const theme = createMuiTheme({
    palette: {
      primary: purple,
    },
  });

  return (
    <Modal isOpen={modalVisible} onRequestClose={() => setModalVisible(false)} style={customStyles}>

      <div style={styles.paper}>
        <h3 style={{ textAlign: 'center' }}>Please enter your name along with the email and password provided in the invitation.</h3>
        <h4 style={{ textAlign: 'center', marginTop: 10 }}>If you're responding for you and a guest (or your family), you'll be able to RSVP for your entire group.</h4>
        <form onSubmit={e => e.preventDefault() && false} style={styles.form}>
          <ThemeProvider theme={theme}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="guestName">Your name</InputLabel>
              <Input id="guestName" name="guestName" autoComplete="off" autoFocus value={guestName} onChange={e => setGuestName(e.target.value)} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)} />
            </FormControl>
          </ThemeProvider>
          <div style={styles.buttonContainer}>
            <Button style={styles.continueButton} type="submit" color="default" onClick={login}>
              Continue
          </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 50,
    width: '100%',
    maxWidth: 500,
  },
  form: {
    padding: 20
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  continueButton: {
    width: 200,
    marginTop: 20,
    backgroundColor: 'white'
  }
}

export default AuthModal