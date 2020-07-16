import React from 'react'
import Layout from '../components/Layout'
import Showcase from '../components/Showcase'
import Names from '../components/Names'

const Home = () => {
  return (
    <div>
      <Layout>
        <Showcase />
        <Names />
      </Layout>
    </div>
  )
}

export default Home