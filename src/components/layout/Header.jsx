import Image from 'next/image'
import React, { useRef, useState, useEffect, useContext } from 'react'
import AirbBnbLogo from '../../public/assets/airBnbLogo.png'
import { Search, GlobeAlt, ViewList, UserCircle } from "heroicons-react";
import DatesPicker from '../utilities/DatesPicker'
import Link from 'next/link'; 
import GlobalContext from '../../context/GlobalContext';
import AuthContext from '../../context/AuthContext';

export default function Header() {

    const { search, handleSearch, setSearch } = useContext(GlobalContext);
    const { currentUser, login } = useContext(AuthContext);

    const [select, setSelect] = useState(false)
    const [accountMenu, setAccountMenu] = useState(false)

    const ref = useRef(null);
    const refMenu = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setSelect(false)
      }
      if (refMenu.current && !refMenu.current.contains(event.target)) {
        setAccountMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

 

  const handleSarchInput = (e) => {
        setSearch(e.target.value)  
    }
    
  return (
    <header className='fixed w-full top-0 z-50 bg-white shadow-md p-3 md:px-10'>
        <div className='flex justify-between'>
        <div className='relative flex items-center my-auto cursor-pointer ml-10'>
          <Link href={'/'}>
            <Image src={AirbBnbLogo.src} width={100} height={100} alt='logo' />
          </Link>
        </div>
        <div className='flex hover:shadow-md  transition-all items-center md:border-2 rounded-full py-2 md:shadow-sm w-1/3 ml-32'>
            <input type="text"  className='flex-grow pl-5 bg-transparent outline-none' placeholder='Commercer votre recherche' value={search} onChange={handleSarchInput} />
            <Search onClick={()=>setSelect(!select)} className='bg-red-500 mx-2 xl:w-8 xl:h-8 sm:w-4 sm:h-4 rounded-full cursor-pointer p-1 text-white' />
        </div>

        <div className='flex items-center'>
           <Link href={'/places/addplace'}>
            <button className='mx-2 cursor-pointer p-1 rounded-full hover:bg-opacity-20 hover:bg-gray-300 h-8 text-ellipsis overflow-hidden'>Mettre mon logement sur Airbnb  {/* ||Mode hôte */}</button> 
           </Link>
            <button className='mx-2 p-1 cursor-pointer rounded-full hover:bg-opacity-20 hover:bg-gray-300'> <GlobeAlt /></button>

            <div className='rounded-full flex border border-black p-1 mx-2 cursor-pointer hover:shadow-xl shadow-gray-400 mr-4' onClick={() => setAccountMenu(!accountMenu)} ref={refMenu}>
                <ViewList className='mx-1 h-8'/>
                {currentUser ? 
                <img className='w-8 h-8 rounded-full' src={currentUser.avatar}  alt='account'/> 
                  : 
                  <UserCircle className='mx-1 text-gray-500 h-8 w-8' />
                }
            </div>
            <div className='absolute right-14 top-16' ref={refMenu}>
            {accountMenu && 
              <div className='transition-all bg-white rounded-xl w-64 shadow-sm p-3'>
                <div className='flex flex-col border-b-2 pb-4 ml-2 '>
                  <Link href={'/auth/login'}><div className='font-semibold my-2'>Connexion</div></Link> 
                  <Link href={'/auth/register'}><div className='my-2'>Inscription</div></Link> 
                 {currentUser && <Link href={'/auth/profil'}><div className='my-2'>Compte</div></Link> }
                </div>
                <div className='flex flex-col font-light ml-2'>
                <Link href={'/places/addplace'}>
                  <span className='my-2'>Mettre mon logement sur Airbnb</span>
                </Link>
                  <span className='my-2'>Créer une expérience</span>
                  <span className='my-2'>Aide</span>
                </div>
              </div>}
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
