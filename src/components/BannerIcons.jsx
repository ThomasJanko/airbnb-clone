import React, { useContext, useState } from 'react'
import { GlobeAlt, Adjustments, AcademicCap, Archive, CubeTransparent,Hashtag, ChevronLeftOutline, ChevronRightOutline } from "heroicons-react";
import GlobalContext from '../context/GlobalContext';

const categoriesList = [
    {title: 'Tous', icon: <AcademicCap/>},
    {title: 'Maison', icon: <GlobeAlt/>},
    {title: 'Picscine', icon: <Archive/>},
    {title: 'Appartement', icon: <AcademicCap/>},
    {title: 'Location', icon: <CubeTransparent/>},
    {title: "Sur l'eau", icon: <Hashtag/>},
    {title: 'Au pied des pistes', icon: <GlobeAlt/>},
    {title: 'Luxe', icon: <GlobeAlt/>},
    {title: 'grandes demeures', icon: <CubeTransparent/>},
    {title: 'Dômes', icon: <Archive/>},
    {title: 'Wow !', icon: <Hashtag/>},
    {title: 'Campagne', icon: <GlobeAlt/>},
    {title: 'Chambres privées', icon: <AcademicCap/>},
    {title: 'Cabane', icon: <GlobeAlt/>},
    {title: 'Tendance', icon: <Archive/>},
    {title: 'Bateaux', icon: <AcademicCap/>},
    {title: 'Design', icon: <CubeTransparent/>},
    {title: 'Châteaux', icon: <GlobeAlt/>},
]

export default function BannerIcons() {

    const {category, setCategories} = useContext(GlobalContext)

  return (
    <div className='flex mx-auto shadow-white shadow-sm fixed mt-auto z-10 bg-white w-full px-20' style={{height: '98px', contain: 'size', top:'76px'}}>
       <button className='mt-6 cursor-pointer'><ChevronLeftOutline className='border rounded-full p-1 h-7 w-7'/></button> 
    <div className='mt-10 ml-1 flex flex-row items-center opacity-70 overflow-x-scroll mx-auto hideScroll '>
        {/* Créer Model Category [] et faire un map */}
        {categoriesList && categoriesList.map((categorie)=> 
        <div>
            <button 
            className={`items-center w-full text-center justify-center whitespace-nowrap mx-4 flex flex-col h-auto opacity-90 hover:opacity-100  transition-all hover:text-black font-semibold text-xs hover:shadow-md hover:border-b-2 pb-1  ${category == categorie.title? 'border-b-2 border-black font-bold text-black': 'hover:border-gray-400'}`}
            onClick={() => setCategories(categorie.title)}>
                {categorie.icon}
                {categorie.title}
            </button>
        </div>
        )}
    </div>
    <button className='mt-9 ml-1 cursor-pointer'><ChevronRightOutline className='border rounded-full p-1 h-7 w-7'/></button> 
    <button className='flex rounded-xl border border-black border-opacity-60 p-2 h-12 items-center mt-10 ml-4'>
        <Adjustments/>
        Filtres
    </button>
    </div>

  )
}
