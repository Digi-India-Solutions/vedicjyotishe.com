import React from 'react'
import AllDay from '../Day/AllDay'
import AllMonths from '../Months/AllMonths'
import AllSamvat from '../Samvat/AllSamvat'

const Panchang = () => {
  return (
   <>
   <AllDay />
   {/* <br /> */}
   <AllMonths />
   {/* <br /> */}
   <AllSamvat />
   </>
  )
}

export default Panchang