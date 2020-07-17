import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import Layout from '../components/Layout';
import { db } from '../services/firebase';

const Admin = () => {
  const [value, isLoading, hasError] = useCollection(db().collection('responses'), { snapshotListenOptions: { includeMetadataChanges: true } })
  const [responses, setResponses] = useState([])
  const [loading, setLoading] = useState(isLoading)
  const [error, setError] = useState(hasError)

  const IncludeComma = ({arr, i }) => {
    if (arr[arr.length - 1] === arr[i]) return ''
    return <span>,&nbsp;&nbsp;</span>
  }

  useEffect(() => {
    setLoading(isLoading)
    setError(hasError)
    setResponses(value?.docs.map(doc => doc.data()))
  }, [loading, value, error])

  const scrubData = () => {
    // const guestNames = responses?.map(response => [...response.guestNames])
    const guestNames = responses?.map(response => [].concat.apply([], response.guestNames))
    const attending = [].concat.apply([], guestNames)
    const notAttending = responses?.filter(a => a.attending !== 'yes').map(b => b.submittedBy)
    const responded = responses?.length
    const invited = [].concat.apply([], [...attending, notAttending])



    const scrubbed = { attending, notAttending, responded, invited }
    console.log(scrubbed)
    return scrubbed
  }

  const scrubbed = scrubData()

  return (
  loading ? <div>Loading</div>
  : error ? <div>Error</div>
  :
  <Layout>
    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 10, fontFamily: "Allura"}}>
      <h3>Attending: {scrubbed?.attending.length}</h3>
      <h3>Not Attending: {scrubbed?.notAttending.length}</h3>
      <h3>Responses: {scrubbed.responded}</h3>
    </div>
    <TableContainer style={{ marginTop: 25 }} component={Paper}>
      <h2 style={{ width: '100%', textAlign: 'center', fontFamily: "Allura", textDecoration: 'underline' }}>Guestlist</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {responses.map((response) => (
            <TableRow key={response.date}>
              {}
              <TableCell style={{display: 'flex'}}>
                {
                  response.attending === 'yes' ?
                  response.guestNames.map((guest, i) =>
                  <div style={{ color: 'green' }} key={i}>{`${guest}`}<IncludeComma arr={response.guestNames} i={i} /></div>) :
                  <div style={{ color: 'red' }}>{response.submittedBy}</div>
                }
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Layout>
  )
}

export default Admin