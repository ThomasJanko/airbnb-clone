import React, { useContext, useState, useRef, useEffect } from 'react'
import { GlobeAlt, Adjustments, AcademicCap, Archive, CubeTransparent,Hashtag, ChevronLeftOutline, ChevronRightOutline, Filter } from "heroicons-react";
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

    const {category, setCategories, filterPrice, setFilterPrice, filterCapacity, setFilterCapacity} = useContext(GlobalContext)
    const [filterMenu, setFilterMenu ] = useState(false)

    const ref = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            setFilterMenu(false)
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);

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
    <button className='flex rounded-xl border border-black border-opacity-60 p-2 h-12 items-center mt-10 ml-4' onClick={() => setFilterMenu(!filterMenu)}>
        <Adjustments/>
        Filtres
    </button>
    {filterMenu && 
        <div className='transition-all absolute right-20 top-20 mt-2 bg-white rounded-xl w-64 shadow-sm p-3' ref={ref}>
            <div className='w-full mt-2'>
               <span className='font-bold'> Fourchette de Prix</span>
                <div className=''>
                    {/* <input className='rounded-xl w-full' type="range" name="price" min={filterPrice.min} max={filterPrice.max} step="1" value={filterPrice.max} onChange={(e) => setFilterPrice({...filterPrice,min:e.target.value})} /> */}
                    <div className='grid grid-cols-2 justify-center w-full mt-2'> 
                    <div className=''>
                        <label class="block uppercase tracking-wide italic opacity-80 text-gray-600  text-xs font-bold mb-2" for="grid-first-name">
                            Prix min
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" placeholder='min' min={0} value={filterPrice.min}  onChange={(e) => setFilterPrice({...filterPrice, min:e.target.value})} />
                    </div>
                    <div className='ml-1'>
                        <label class="block uppercase tracking-wide italic opacity-80 text-gray-600 text-xs font-bold mb-2" for="grid-first-name">
                            Prix max
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" placeholder='max' min={0} value={filterPrice.max}  onChange={(e) => setFilterPrice({...filterPrice, max:e.target.value})} />
                    </div>
                    </div>
                </div>
            </div>
            <div className='w-full' >
               <span className='font-bold'> Fourchette de Capacité</span>
                <div className=''>
                    {/* <input className='rounded-xl w-full' type="range" name="price" min={filterPrice.min} max={filterPrice.max} step="1" value={filterPrice.max} onChange={(e) => setFilterPrice({...filterPrice,min:e.target.value})} /> */}
                    <div className='grid grid-cols-2 justify-center w-full mt-2'> 
                    <div className=''>
                        <label class="block uppercase tracking-wide italic opacity-80 text-gray-600 text-xs font-bold mb-2" for="grid-first-name">
                            Capacité min
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" min={0} id="grid-first-name" type="number" placeholder='min' value={filterCapacity.min}  onChange={(e) => setFilterCapacity({...filterCapacity, min:e.target.value})} />
                    </div>
                    <div className='ml-1'>
                        <label class="block uppercase tracking-wide italic opacity-80 text-gray-600 text-xs font-bold mb-2" for="grid-first-name">
                            Capacité max
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" min={0} id="grid-first-name" type="number" placeholder='max' value={filterCapacity.max}  onChange={(e) => setFilterCapacity({...filterCapacity, max:e.target.value})} />
                    </div>
                    </div>
                </div>
            </div>
        </div>
    }
    </div>

  )
}
