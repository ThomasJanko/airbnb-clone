import React, { useState } from 'react'
import { GlobeAlt, Adjustments, AcademicCap, Archive, CubeTransparent,Hashtag } from "heroicons-react";

const categories = [
    {title: 'Piscine', icon: <GlobeAlt/>},
    {title: 'Bord de mer', icon: <Archive/>},
    {title: 'Avec vue', icon: <AcademicCap/>},
    {title: 'Vignoble', icon: <CubeTransparent/>},
    {title: "Sur l'eau", icon: <Hashtag/>},
    {title: 'Au pied des pistes', icon: <GlobeAlt/>},
    {title: 'Luxe', icon: <GlobeAlt/>},
    {title: 'grandes demeures', icon: <CubeTransparent/>},
    {title: 'Dômes', icon: <Archive/>},
    {title: 'Wow !', icon: <Hashtag/>},
    {title: 'Campagne', icon: <GlobeAlt/>},
    {title: 'Chambres privées', icon: <AcademicCap/>},
    {title: 'Chambres privées', icon: <GlobeAlt/>},
    {title: 'Chambres privées', icon: <Archive/>},
    {title: 'Chambres privées', icon: <AcademicCap/>},
    {title: 'Chambres privées', icon: <CubeTransparent/>},
    {title: 'Chambres privées', icon: <GlobeAlt/>},
]

export default function BannerIcons() {

    const [category, setCategory] = useState('')

  return (
    <div className='flex mx-auto' style={{width: '88%'}}>
        
    <div className='mt-10 flex flex-row items-center opacity-70 overflow-x-scroll mx-auto hideScroll '>
        {/* Créer Model Category [] et faire un map */}
        {categories && categories.map((categorie)=> 
        <div>
            <button 
            className={`items-center w-full text-center justify-center whitespace-nowrap mx-4 flex flex-col h-auto opacity-90 hover:opacity-100 hover:text-black font-semibold text-xs hover:shadow-md hover:border-b-2 pb-1  ${category == categorie.title? 'border-b-2 border-black font-bold': 'hover:border-gray-400'}`}
            onClick={() => setCategory(categorie.title)}>
                {/* <GlobeAlt/>  */}
                {categorie.icon}
                {categorie.title}
            </button>
        </div>
        )}
        
    </div>
    <button className='flex rounded-xl border border-black border-opacity-60 p-2 h-12 items-center mt-10 ml-4'>
        <Adjustments/>
        Filtres
    </button>
    </div>

  )
}
