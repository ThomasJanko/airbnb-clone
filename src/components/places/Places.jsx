import React, {useState, useEffect, useContext } from 'react'
import PlaceCard from './PlaceCard'
import PlaceService from '../../public/services/places.service'
import Image from 'next/image';
import { Star, HeartOutline, Map } from "heroicons-react";
import Link from 'next/link';
import Router from 'next/router';
import GlobalContext from '../../context/GlobalContext';

export default function Places() {

    const {search, category, filterPrice, filterCapacity} = useContext(GlobalContext)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const [list, setList] = useState([])
    const [places, setPlaces] = useState([])

    useEffect(() => {
        fetchData();
    }, []);


    useEffect(() => {
      let filteredPlaces = places;
      if (category !== 'Tous') {
      filteredPlaces = filteredPlaces.filter(place =>
      place.type.toLowerCase().includes(category.toLowerCase())
      );
      }
      
      filteredPlaces = filteredPlaces.filter(place =>
      place.title.toLowerCase().includes(search.toLowerCase()) ||
      place.description.toLowerCase().includes(search.toLowerCase())
      );

      filteredPlaces = filteredPlaces.filter(place =>
        place.pricePerDay >= filterPrice.min && place.pricePerDay <= filterPrice.max
      );

      filteredPlaces = filteredPlaces.filter(place =>
        place.capacity >= filterCapacity.min && place.capacity <= filterCapacity.max
      );
      setList(filteredPlaces);
      }, [search, category, filterPrice, filterCapacity]);
      
      
      
      
      

  async function fetchData() {
    try {
      const response = await PlaceService.getPlaces();
      setPlaces(response.data);
      setList(response.data)
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p className='text-2xl font-bold text-center mt-52'>Loading...</p>;
    // return <Loader/>
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className='mt-4 mx-auto' style={{width: '94%'}}>
        
        <div className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mt-44 justify-around cursor-pointer'>
            {list.length>0 ? list.map((place) => 
            <div key={place._id} className='p-3' onClick={() => Router.push(`/places/${place._id}`)}>
                <div className='rounded-xl' style={{height: '400px'}}>
                    <div>
                        {/* Allow all domain image in Next.config.js */}
                        {/* <Image src={place.image} alt={place.title} width={40} height={40} /> */}
                        <div className='relative'>
                            <img className='object-cover h-72 block w-full border rounded-xl' src={place.image} alt={place.title} />
                             <div className=' absolute top-4 right-4'><HeartOutline className='cursor-pointer text-white'/></div>
                        </div>
                        <div className='flex justify-between mt-2 ml-2'>
                            <span className='font-semibold capitalize'>{place.title}, {place.Addresse && place.Addresse.city} </span>
                            {/* Model PLace Ajouter Note */}
                            <span className='flex'> <Star className='h-4 w-4 mt-1'/> 4.6</span>
                        </div>
                        <div className='ml-2 overflow-clip text-ellipsis capitalize-first' style={{color: '#717171'}}>{place.description} </div>
                        {/* Model Place Ajouter Plage date */}
                        <div className='ml-2 overflow-clip text-ellipsis' style={{color: '#717171'}}> 11 -17 aout </div>
                        <div className='mt-2 ml-2'> <span className='font-bold'>{place.pricePerDay} €</span>  /nuit </div>
                    </div>

                </div>
            </div>
            )
          :
          <div className='absolute text-2xl text-center mt-10' style={{width: '94%'}}>
            <span className='mx-auto'> Aucune location disponible !</span>
          </div>}
        </div>
        <div className='fixed bottom-20 w-full mx-auto z-50 whitespace-nowrap pointer-events-auto'>
            <button className='rounded-full py-3 px-4 mx-auto flex font-semibold text-white hover:scale-105 transition-all' style={{background: '#222222'}}>Afficher la carte {/* Affciher la list <List/> */}  <Map className='ml-1'/> </button>
        </div>
    </div>
    
  )
}
