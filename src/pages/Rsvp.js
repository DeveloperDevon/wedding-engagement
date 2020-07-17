import { Button, ButtonGroup, FormControl, IconButton, Input, Paper } from '@material-ui/core'
import { Add, Remove } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import ResponseModal from '../components/Modals/ResponseModal'
import { db } from '../services/firebase'

const Rsvp = () => {
  const [guestName, setGuestName] = useState('')
  const [attending, setAttending] = useState(null)
  const [additionalGuestsNum, setAdditionalGuestsNum] = useState(0)
  const [guestNames, setGuestNames] = useState([])
  const [modalVisible, setModalVisible] = useState(false)


  useEffect(() => {
    setGuestName(localStorage.getItem('guestName'))
  }, [])

  const guestNamesChange = ({ name, index }) => {
    let arrCopy = guestNames
    arrCopy[index] = name
    setGuestNames(arrCopy)
  }

  const genPayload = () => {
    return { attending, numOfGuests: additionalGuestsNum+1, guestNames: [guestName, ...guestNames.slice(0, additionalGuestsNum)], submittedBy: guestName, date: new Date() }
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
            <h3 style={{ marginBottom: 10 }}>Will you be able to attend our wedding? <span style={{fontSize: 28}}>{attending}</span></h3>
            <ButtonGroup color="default" aria-label="outlined primary button group">
              <Button onClick={() => setAttending('yes')} style={{ backgroundColor: attending === 'yes' ? '#f8e7d1' : '' }}>Yes</Button>
              <Button onClick={() => setAttending('no')} style={{ backgroundColor: attending === 'no' ? '#f8e7d1' : '' }}>No</Button>
            </ButtonGroup>

            {attending !== null &&
              <div>
                <FormControl style={{ marginTop: 10 }}>
                  <h3>Invited guests that {attending === 'yes' ? 'will be attending?' : 'wont be able to make it?'} <span style={{fontSize: 28}}>{additionalGuestsNum+1}</span></h3>
                  <div style={{ display: 'flex'}}>
                    {/* <Input disabled type="number" value={additionalGuestsNum} style={{ width: '25%', fontFamily: 'Allura' }} /> */}
                    <IconButton disabled={additionalGuestsNum <= 0} onClick={() => setAdditionalGuestsNum(prev => --prev) }><Remove /></IconButton>
                    <IconButton disabled={additionalGuestsNum >= 5} onClick={() => setAdditionalGuestsNum(prev => ++prev) }><Add /></IconButton>
                  </div>
                </FormControl>
              </div>
            }

            {attending !== null && <div>
            <FormControl>
              <Input placeholder="Guest 1" disabled style={{ fontFamily: 'Allura' }} value={guestName} />
            </FormControl>
            </div>}

            {additionalGuestsNum >= 0 && Array.from(Array(parseInt(additionalGuestsNum)), (_, i) => {
              return (
                <div key={i}>
                  <FormControl>
                    <Input placeholder={`Additional Guest ${i + 1}`} style={{ fontFamily: 'Allura' }} required onChange={(e) => guestNamesChange({ name: e.target.value, index: i })} />
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