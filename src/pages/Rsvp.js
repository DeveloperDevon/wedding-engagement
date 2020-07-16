import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import ResponseModal from '../components/Modals/ResponseModal'
import { Paper, Button, ButtonGroup, FormControl, Input } from '@material-ui/core'
import { db } from '../services/firebase'

const Rsvp = () => {
  const [guestName, setGuestName] = useState('')
  const [attending, setAttending] = useState(null)
  const [numOfGuests, setNumOfGuests] = useState(1)
  const [guestNames, setGuestNames] = useState([])
  const [modalVisible, setModalVisible] = useState(false)


  useEffect(() => {
    setGuestName(localStorage.getItem('guestName'))
  }, [])

  const handleAmountChange = (e) => {
    let num = e.target.value
    num = num < 1 ? num = 1 : num > 5 ? num = 5 : num
    setNumOfGuests(num)
  }

  const guestNamesChange = ({ name, index }) => {
    let arrCopy = guestNames
    arrCopy[index] = name
    setGuestNames(arrCopy)
  }

  const genPayload = (isAttending) => {
    return isAttending === 'no'
      ? { attending: 'no', numOfGuests: 0, guestNames: [], submittedBy: guestName, date: new Date() }
      : { attending, numOfGuests, guestNames: guestNames.slice(0, numOfGuests), submittedBy: guestName, date: new Date() }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = genPayload(attending)
    await db().collection('responses').add(payload)
      .then(() => setModalVisible(true))
      .catch(err => console.error(err))
  }

  return (
    <Layout>
      <div style={styles.pageContainer}>
        <ResponseModal modalVisible={modalVisible} setModalVisible={setModalVisible} attending={attending} />
        <Paper style={styles.paper}>
          <form style={styles.form} onSubmit={handleSubmit}>
            <h2 style={styles.greetingText}>Hello {guestName},</h2>
            <h3 style={{ marginBottom: 10 }}>Will you be able to attend our wedding? {attending}</h3>
            <ButtonGroup color="default" aria-label="outlined primary button group">
              <Button onClick={() => setAttending('yes')} style={{ backgroundColor: attending === 'yes' ? '#f8e7d1' : '' }}>Yes</Button>
              <Button onClick={() => setAttending('no')} style={{ backgroundColor: attending === 'no' ? '#f8e7d1' : '' }}>No</Button>
            </ButtonGroup>

            {attending === 'no' && <h3 style={{ marginTop: 10 }}>We're sorry you wont be able to join us!</h3>}

            {attending === 'yes' &&
              <div>
                <FormControl style={{ marginTop: 10 }}>
                  <h3>How many guests will be attending? {numOfGuests}</h3>
                  <Input type="number" value={numOfGuests} style={{ width: '25%', fontFamily: 'Allura' }} onChange={(e) => handleAmountChange(e)} />
                </FormControl>
              </div>
            }

            {attending === 'yes' && Array.from(Array(parseInt(numOfGuests)), (_, i) => {
              return (
                <div key={i}>
                  <FormControl>
                    <Input placeholder={`Guest ${i + 1}`} style={{ fontFamily: 'Allura' }} onChange={(e) => guestNamesChange({ name: e.target.value, index: i })} />
                  </FormControl>
                </div>
              )
            })}

            {attending !== null &&
              <div style={styles.buttonContainer}>
                <Button style={styles.submitButton} type="submit">Send RSVP</Button>
              </div>
            }

          </form>
        </Paper>
      </div>
    </Layout>
  )
}

const styles = {
  pageContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: 30,
    fontFamily: 'Allura',
    backgroundColor: '#f8e7d1',
  },
  greetingText: {
    marginBottom: 20
  },
  paper: {
    padding: 20,
    width: '100%',
    maxWidth: 700
  },
  buttonContainer: {
    paddingTop: 20,
    display: 'flex',
    justifyContent: 'center'
  },
  submitButton: {
    backgroundColor: '#f8e7d1'
  }
}

export default Rsvp