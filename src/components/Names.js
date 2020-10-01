import React from 'react'

const Names = () => {
  return (
    <>
      <div style={styles.container}>
          <h1>Chandler Ceccato</h1>
          <h1>&</h1>
          <h1>Devon Reichardt</h1>
      </div>
      <div style={{ backgroundColor: 'white', marginTop: 20, textAlign: 'center', fontFamily: 'Amatic SC', paddingTop: 30, paddingBottom: 40 }}>
        <h1>Details for Reception</h1>
        <h2>Community Center Springview Hall</h2>
        <h2>5480 5th Street as Johnson Springview Park</h2>
        <h2>Rocklin CA 957677</h2>
        <h2>4:00pm - 8:00pm</h2>
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