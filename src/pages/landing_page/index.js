import React from 'react';
import Navbar from '../../layout/navbar';
import SectionCarousel from './section_carousel';
import SectionTerlaris from './section_terlaris';

const LandingPage = () => {

    return (
        <>
         <Navbar/>
         <SectionCarousel/>
         <SectionTerlaris/>
        </>
    )
}

export default LandingPage