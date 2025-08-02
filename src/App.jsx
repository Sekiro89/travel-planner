import { useState } from 'react'
import { Box, Heading, Spacer } from '@chakra-ui/react'
import Navbar from './Components/Navbar'
import HeroSection from './Components/Bannersection'
import Content from './Components/Content'
import Itinerarycards from './Components/Itenarycards'
/*import Planner from './Components/Planner'*/
import './App.css'


function App() {
  return (
    <>
    <Navbar />
    <HeroSection />
    <Content />
    <Itinerarycards />
    
    </>
  );
}

export default App
