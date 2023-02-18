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
        filteredPlaces.forEach((place) => {
          place.type.forEach((type) => {
            if (!type.toLowerCase().includes(category.toLowerCase())) {
              filteredPlaces = filteredPlaces.filter(p => p !== place);
            }
          });
        });
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
    <div className='my-4 mx-auto' style={{width: '94%'}}>
        
        <div className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mt-44 justify-around cursor-pointer'>
            {list.length>0 ? list.map((place) => 
            <PlaceCard place={place}/>
           
            )
          :
          <div className='absolute text-2xl text-center mt-10' style={{width: '94%'}}>
            <span className='mx-auto text-center'> Aucune location disponible !</span>
          </div>}
        </div>
        <div className='fixed bottom-20 w-full mx-auto z-50 whitespace-nowrap pointer-events-auto'>
            <button className='rounded-full py-3 px-4 mx-auto flex font-semibold text-white hover:scale-105 transition-all' style={{background: '#222222'}}>Afficher la carte {/* Affciher la list <List/> */}  <Map className='ml-1'/> </button>
        </div>
    </div>
    
  )
}
