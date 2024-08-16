import React from 'react'
import MainCarousel from '../../components/HomeCarousel/MainCarousel'
import HomeSectionCarousel from '../../components/HomeSectionCarousel/HomeSectionCarousel'
import { volkswagen_parts } from '../../../Data/volkswagen_parts'

const HomePage = () => {
  return (
    <div>
      <MainCarousel/>

      <div className='space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10'>
        <HomeSectionCarousel data = {volkswagen_parts} sectionName= {"Volkswagen Parts"}/>
        <HomeSectionCarousel data = {volkswagen_parts} sectionName= {"Maruti Suzuki Parts"}/>
        <HomeSectionCarousel data = {volkswagen_parts} sectionName= {"Toyota Parts"}/>
      </div>
    </div>
  )
}

export default HomePage
