import Image from 'next/image'
import React, { useRef, useState, useEffect } from 'react'
import AirbBnbLogo from '../../public/assets/airBnbLogo.png'
import { Search, GlobeAlt, ViewList, UserCircle } from "heroicons-react";
import DatesPicker from '../utilities/DatesPicker'
import Link from 'next/link';

export default function Header() {

    const [searchInput, setSearchInput] = useState('')
    const [select, setSelect] = useState(false)

    const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setSelect(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

    
  return (
    <header className='fixed w-full top-0 z-50 bg-white shadow-md p-3  md:px-10'>
        <div className='flex justify-between'>
        <div className='relative flex items-center my-auto cursor-pointer ml-10'>
          <Link href={'/'}>
            <Image src={AirbBnbLogo.src} width={100} height={100} alt='logo' />
          </Link>
        </div>
        <div className='flex hover:shadow-md  transition-all items-center md:border-2 rounded-full py-2 md:shadow-sm w-1/3 ml-20'>
            <input type="text" onClick={()=>setSelect(true)} className='flex-grow pl-5 bg-transparent outline-none' placeholder='Commercer votre recherche' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            <Search className='bg-red-500 mx-2 xl:w-8 xl:h-8 sm:w-4 sm:h-4 rounded-full cursor-pointer p-1 text-white' />
        </div>

        <div className='flex items-center'>
            <button className='mx-2 cursor-pointer p-1 rounded-full hover:bg-opacity-20 hover:bg-gray-300'>Mettre mon logement sur Airbnb  {/* ||Mode hôte */}</button> 
           
            <button className='mx-2 p-1 cursor-pointer rounded-full hover:bg-opacity-20 hover:bg-gray-300'> <GlobeAlt /></button>

            <div className='rounded-full flex border border-black p-1 mx-2 cursor-pointer hover:shadow-xl shadow-gray-400'>
                <ViewList className='mx-1 h-8'/>
                <UserCircle className='mx-1 text-gray-500 h-8 w-8' />
            </div>
        </div>
        
        </div>
        <div className='flex justify-center -ml-20 mt-2' >
            {select &&
                <div ref={ref}>
                    <DatesPicker />
                </div> 
             }
        </div> 
    </header>
  )
}
