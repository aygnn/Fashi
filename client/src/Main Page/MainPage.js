import React, { useEffect } from 'react'
import Section1 from './Section1/Section1'
import Section2 from './Section2/Section2'
import Section3 from './Section3/Section3'
import Section4 from './Section4/Section4'
import Section5 from './Section5/Section5'
import Section6 from './Section6/Section6'
import {Helmet} from 'react-helmet'
export default function MainPage() {
  const active=JSON.parse(sessionStorage.getItem('userlogin'))
  useEffect(()=>{
    if(active!==true){
      sessionStorage.setItem('userlogin',JSON.stringify(false))
    }
  },[])
  return (
    <div>
      <Helmet>
    <title>Home Page</title>
      </Helmet>
        <Section1/>
        <Section2/>
        <Section3/>
        <Section4/> 
        <Section5/>
        <Section6/>
        
    </div>
  )
}
