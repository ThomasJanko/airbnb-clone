import Image from 'next/image'
import React from 'react'
import AirbBnbLogo from '../../public/assets/airBnbLogo.png'
import { Search, GlobeAlt, ViewList, UserCircle } from "heroicons-react";

export default function Header() {
  return (
    <header className='sticky top-0 z-50 flex justify-between bg-white shadow-md p-3  md:px-10'>
        <div className='relative flex items-center my-auto cursor-pointer ml-10'>
            <Image src={AirbBnbLogo.src} width={100} height={100} alt='logo' />
        </div>
        <div className='flex hover:shadow-md  transition-all items-center md:border-2 rounded-full py-2 md:shadow-sm w-1/3 ml-20'>
            <input type="text" className='flex-grow pl-5 bg-transparent outline-none' placeholder='Commercer votre recherche' />
            <Search className='bg-red-500 mx-2 w-8 h-8 rounded-full cursor-pointer p-1 text-white' />
        </div>
        <div className='flex items-center'>
            <button className='mx-2 cursor-pointer p-1 rounded-full hover:bg-opacity-20 hover:bg-gray-300'>Mettre mon logement sur Airbnb  {/* ||Mode hôte */}</button> 
           
            <button className='mx-2 p-1 cursor-pointer rounded-full hover:bg-opacity-20 hover:bg-gray-300'> <GlobeAlt /></button>

            <div className='rounded-full flex border border-black p-1 mx-2 cursor-pointer hover:shadow-xl shadow-gray-400'>
                <ViewList className='mx-1 h-8'/>
                <UserCircle className='mx-1 text-gray-500 h-8 w-8' />
            </div>
        </div>
    </header>
  )
}
