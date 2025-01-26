"use client";
import React from 'react'
import CountUp from 'react-countup'

function AnimatedCounter({amount}:{amount: number}) {
  return (
    <div className="w-full">
        <CountUp
        decimal=","
        decimals={2}
        duration={2.75}
        prefix={"$"}
        end={amount}>

        </CountUp>
    </div>
  )
}

export default AnimatedCounter