import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'

const ResponseForm = () => {
  const [ guestOne, setGuestOne ] = useState('')
  const [ hasPlusOne, setHasPlusOne ] = useState(false)
  const [ guesttwo, setGuestTwo ] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault();
    const formValues = { guestOne, hasPlusOne }
    console.log(formValues)
  }

  return (
    <div style={styles.formContainer}>
      <form onSubmit={handleSubmit} autoComplete="off">
          <TextField style={styles.formField} label="Guest 1" value={guestOne} onChange={e => setGuestOne(e.target.value)} />
          {/* <TextField style={styles.formField} label="Guest 2" value={guestTwo} variant="outlined" /> */}
        <div>
          <label>Do you have a plus one?</label>
          <input type="radio" name='hasPlusOne' value={hasPlusOne} onChange={(e) => setHasPlusOne(e.target.value)} />
          <input type="radio" name='hasPlusOne' value={hasPlusOne} onChange={(e) => setHasPlusOne(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

const styles = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10
  },
  formField: {
    width: '100%'
  }
}

export default ResponseForm