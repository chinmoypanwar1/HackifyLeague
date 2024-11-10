import React from 'react'
import Navbar from './Navbar'
import LandingPage from './LandingPage'

export default function Home({authenticated , setAuthenticated}) {
  return (
    <>
        <Navbar authenticated = {authenticated}  setAuthenticated = {setAuthenticated}/>
        <LandingPage/>
    </>
  )
}
