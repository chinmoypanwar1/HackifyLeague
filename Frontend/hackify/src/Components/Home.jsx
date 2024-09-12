import React from 'react'
import Navbar from './Navbar'
import Demo from './Demo'
// import Hackathon from './Hackathon'
// import {Grid} from '@mui/material'

export default function Home({authenticated , setAuthenticated}) {
  return (
    <>
        <Navbar authenticated = {authenticated}  setAuthenticated = {setAuthenticated}/>
        <Demo/>
    </>
  )
}
