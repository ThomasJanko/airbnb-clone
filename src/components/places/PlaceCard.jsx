import React, { useContext, useEffect, useState } from 'react'
import { Star, HeartOutline, Map } from "heroicons-react";
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import GlobalContext from '../../context/GlobalContext';
import { useRouter } from 'next/router';


export default function PlaceCard({place}) {

    // const {currentUser, wishlist, addPlaceWishlist, removePlaceWishlist, setWishlist } = useContext(GlobalContext)
    const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist')) || []);

    const [favorites, setFavorites] = useState( []);
    const router = useRouter()

    useEffect(() => {
        // get favorites from local storage or empty array
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
      }, []);
    
    const isInWishlist = (place) => {
        let fav = JSON.parse(localStorage.getItem('favorites'))
        return fav?.some((item) => item == place._id);
      };
   
    const handleClick = (event, place) => {
        event.stopPropagation();

        const id = place._id;
        const index = favorites.indexOf(id);
        
    
        // return if target doesn't have an id (shouldn't happen)
        if (!id) return;
    
        // item is not favorite
        if (index === -1) {
          const newFavorites = [...favorites, place];
          setFavorites(newFavorites);
          // store array in local storage
          localStorage.setItem('favorites', JSON.stringify(newFavorites));
        } 
        // item is already favorite
        else {
          const newFavorites = favorites.filter((favorite) => favorite !== id);
          setFavorites(newFavorites);
          // store array in local storage
          localStorage.setItem('favorites', JSON.stringify(newFavorites));
        }
        // router.reload()
      }

     
   

  return (
    <div key={place._id} className='p-3' onClick={() => Router.push(`/places/${place._id}`)}>
                <div className='rounded-xl' style={{height: '400px'}}>
                    <div>
                        {/* Allow all domain image in Next.config.js */}
                        {/* <Image src={place.image} alt={place.title} width={40} height={40} /> */}
                        <div className='relative'>
                            <img className='object-cover h-72 block w-full border rounded-xl' src={place.image} alt={place.title} />
                             {/* <div className=' absolute top-4 right-4'><HeartOutline fill={`${isInWishlist(place)? 'red' : 'transparent'}`} className='cursor-pointer  text-white' onClick={(event) => {isInWishlist(place)? removeFromFavorites(event, place) : addToFavorites(event, place)}}/></div> */}
                             <div className=' absolute top-4 right-4'><HeartOutline fill={`${isInWishlist(place)? 'red' : 'transparent'}`} className='cursor-pointer  text-white' onClick={(event) => handleClick(event, place)}/></div>
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
}
