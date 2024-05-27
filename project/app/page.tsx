import React from 'react'
import Feature from './Feature/page'
import Home from "./Home/page"
import Contactus from "./Contactus/page"
import Aboutus from './Aboutus/page'
import Footer from './Footer/page'

const page = () => {
  return (
    <>
    <Home/>
    <Feature/>
    <Contactus/>
    <Aboutus/>
    <Footer/>
    </>
  )
}

export default page
