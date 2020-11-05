import React from 'react'

const Names = () => {
  return (
    <>
      <div style={styles.container}>
          <h1>Chandler Ceccato</h1>
          <h1>&</h1>
          <h1>Devon Reichardt</h1>
      </div>
      <div style={{ backgroundColor: 'white', marginTop: 20, textAlign: 'center', fontFamily: 'Amatic SC', paddingTop: 30, paddingBottom: 40, paddingLeft: 10, paddingRight: 10 }}>
        <h1>Reception and Ceremony to take place outside in Lincoln.</h1>
        <h1>The weather will be chilly, so please dress warm.</h1>
      </div>
    </>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f8e7d1',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 35,
    paddingBottom: 35,
    color: '979797',
    fontFamily: 'Allura',
  }
}

export default Names