import React from 'react'
import Header from './Header'
import Pagemain from './Pagemain'
import Footer from './Footer'

export default function Home() {
  return (
    <React.StrictMode>
        <Header/>
        <Pagemain/>
        <Footer/>
    </React.StrictMode>
  )
}
