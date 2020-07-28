import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { writeStorage } from '@rehooks/local-storage';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import Snackbar from '../Common/Snackbar';
import { useForm } from '../../hooks/useForm'

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
  // const code = localStorage.getItem('secretCode') === (process.env.REACT_APP_SECRET_CODE) ||
  //   localStorage.getItem('secretCode') === (process.env.REACT_APP_ADMIN_TOKEN)
  //   ? localStorage.getItem('secretCode') : ''
  const name = !!localStorage.getItem('guestName') ? localStorage.getItem('guestName') : ''
  const history = useHistory()
  const [form, setForm] = useForm({ guestName: name, secretCode: '' })
  const [snackbarVisible, setSnackbarVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    writeStorage('guestName', form.guestName)
  }, [form.guestName])

  const setAuth = async (e) => {
    console.log(e, process.env.REACT_APP_ADMIN_TOKEN, form.guestName)
    e.preventDefault()
    // if (process.env.REACT_APP_ADMIN_TOKEN === form.guestName) history.push('/admin')
    if (form.guestName.trim().length > 0) {
      localStorage.setItem('guestName', form.guestName)
      form.guestName === process.env.REACT_APP_ADMIN_TOKEN ?
        history.push('/admin') :
        history.push('/rsvp')
    } else {
      let err
      if (process.env.REACT_APP_SECRET_CODE !== form.secretCode) err = 'Incorrect Code'
      if (form.guestName.length < 1) err = 'Please provide your name'
      setErrorMessage(err)
      setSnackbarVisible(true)
    }
  }

  const theme = createMuiTheme({
    palette: {
      primary: purple,
    },
  });

  return (
    <Modal isOpen={modalVisible} onRequestClose={() => setModalVisible(false)} style={customStyles}>
      <Snackbar visible={snackbarVisible} setVisible={setSnackbarVisible} message={errorMessage} />

      <div style={styles.paper}>
        <h3 style={{ textAlign: 'center' }}>Please enter your name.</h3>
        <h4 style={{ textAlign: 'center', marginTop: 10 }}>If you're responding for you and a guest (or your family), you'll be able to RSVP for your entire group.</h4>
        <form onSubmit={e => setAuth(e)} style={styles.form}>
          <ThemeProvider theme={theme}>
            {/* <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="secretCode">Secret Code</InputLabel>
              <Input id="secretCode" name="secretCode" autoComplete="off" autoFocus value={form.secretCode} onChange={setForm} />
            </FormControl> */}
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="guestName">Your name</InputLabel>
              <Input id="guestName" name="guestName" autoComplete="off" autoFocus value={form.guestName} onChange={setForm} />
            </FormControl>
          </ThemeProvider>
          <div style={styles.buttonContainer}>
            <Button style={styles.continueButton} type="submit" color="default">
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