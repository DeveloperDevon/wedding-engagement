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

  const IncludeComma = ({ arr, i }) => {
    if (arr[arr.length - 1] === arr[i]) return ''
    return <span>,&nbsp;&nbsp;</span>
  }

  useEffect(() => {
    setLoading(isLoading)
    setError(hasError)
    setResponses(value?.docs.map(doc => doc.data()))
  }, [isLoading, value, hasError])

  // const getNumOfGuests = (arr, condition) => {
  //   if (responses) {
  //     return parseInt(arr.filter(response => response.attending === condition).reduce((a, b) => a.numOfGuests + b.numOfGuests))
  //   } else {
  //     return null
  //   }
  // }

  const getNumOfGuests = (arr, condition) => {
    return arr.filter(response => response.attending === condition).reduce((acc, item) => acc + item.numOfGuests, 0)
  }

  return (
    loading ? <div>Loading</div>
      : error ? <div>Error</div>
        :
        <Layout>
          {responses && <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 10, fontFamily: "Allura" }}>
            <h3>Attending: {getNumOfGuests(responses, 'yes')}</h3>
            <h3>Not Attending: {getNumOfGuests(responses, 'no')}</h3>
            <h3>Responses: {getNumOfGuests(responses, 'yes') + getNumOfGuests(responses, 'no')}</h3>
          </div>}
          {/* <pre>{JSON.stringify(responses, null, 2)}</pre> */}
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
                    <TableCell style={{ display: 'flex' }}>
                      {
                        response.attending === 'yes' ?
                          response.guestNames.map((guest, i) =>
                            <div style={{ color: 'green' }} key={i}>{`${guest}`}<IncludeComma arr={response.guestNames} i={i} /></div>) :
                          response.guestNames.map((guest, i) =>
                            <div style={{ color: 'red' }} key={i}>{`${guest}`}<IncludeComma arr={response.guestNames} i={i} /></div>)
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