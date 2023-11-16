import React from 'react'
import Heading from '../common/heading/Heading'
import PriceCard from '../pricing/PriceCard'

const HPrice = () => {
  return (
    <>
        <section className="hprice padding">
        <Heading subtitle='our pricing' title='pricing & packages' />
            <div className="price container grid">
                <PriceCard/>
            </div>
        </section>
    </>
  )
}

export default HPrice