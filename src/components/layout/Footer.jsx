import React from 'react'
import { GlobeAlt, ChevronUp } from "heroicons-react";


export default function Footer() {
  return (
    <footer className='fixed z-10 bottom-0 w-full bg-white h-10 flex justify-between items-center px-20'>

        <div className=''>
            <span> © 2023 Airbnb,</span>
            <span> · Inc.</span>
            <span> · Confidentialité</span>
            <span> · Conditions générales</span>
            <span> · Plan du siteFonctionnement du site</span>
            <span> · Infos sur l'entreprise</span>
        </div>

    <div className='flex'>
        <span className='mx-2 flex'><GlobeAlt className='h-6 w-6 mr-1'/> Français (FR) </span> 
        <span className='mx-2'>€ EUR </span>
        <span className='mx-2 flex'>Assistance et ressources <ChevronUp/> </span>
    </div>
    
    </footer>
  )
}
