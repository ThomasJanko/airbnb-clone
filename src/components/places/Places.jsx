import React, {useState, useEffect } from 'react'
import PlaceCard from './PlaceCard'
import PlaceService from '../../public/services/places.service'
import Image from 'next/image';

export default function Places() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const [places, setPlaces] = useState([])

    useEffect(() => {
        fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await PlaceService.getPlaces();
      setPlaces(response.data);
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
        Places
        <div className='grid grid-cols-4 justify-around'>
            {places.map((place) => 
            <div key={place._id} className='p-3'>
                <div className='rounded-xl' style={{height: '400px'}}>
                    <div>
                        {/* Allow all domain image in Next.config.js */}
                        {/* <Image src={place.image} alt={place.title} width={40} height={40} /> */}
                        <img className='object-cover h-72 w-full border rounded-xl' src={place.image} alt={place.title} />
                        <div className='flex justify-between mt-2 ml-2'>
                            <span className='font-semibold capitalize'>{place.title}, {place.Addresse && place.Addresse.city} </span>
                            <span>4.6</span>
                        </div>
                        <div className='ml-2 overflow-clip text-ellipsis capitalize-first' style={{color: '#717171'}}>{place.description} </div>
                        <div className='ml-2 overflow-clip text-ellipsis' style={{color: '#717171'}}> 11 -17 aout </div>
                        <div className='mt-2 ml-2'> <span className='font-bold'>{place.pricePerDay} €</span>  /nuit </div>
                    </div>

                </div>
            </div>
            )}
        </div>
    </div>
    
  )
}
