import React from 'react'
import Banner from '../Banner/Banner'
import Services from '../Services/Services'
import ClientLogoSlider from '../ClientLogoMarquee/ClientLogoSlider'
import BenefitsSection from '../BenefitsSection/BenefitsSection'
import BeMarchent from '../BeMarchent/BeMarchent'
import FAQ from '../FAQ/FAQ'

const Home = () => {
  return (
    <div>
        <Banner></Banner>
        <Services></Services>
        <ClientLogoSlider></ClientLogoSlider>
        <BenefitsSection></BenefitsSection>
        <BeMarchent></BeMarchent>
        <FAQ></FAQ>
    </div>
  )
}

export default Home
