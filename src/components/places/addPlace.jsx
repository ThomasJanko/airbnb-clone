import React, { useRef, useState } from 'react';
import placesService from '../../public/services/places.service';
import { useRouter } from 'next/router';
import { GlobeAlt, Adjustments, AcademicCap, Archive, CubeTransparent,Hashtag, ChevronLeftOutline, ChevronRightOutline, Filter } from "heroicons-react";
import WithAuth from '../../pages/WithAuth'


const categoriesList = [
    // {title: 'Tous', icon: <AcademicCap/>},
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

const addPlace = () => {

    const router = useRouter();
    const [message, setMessage] = useState('')
    

  const [place, setPlace] = useState({
    title: '',
    type: [],
    owner: '',
    pricePerDay: '',
    capacity: '',
    description: '',
    image: '',
    Addresse: {
        city: '',
        street:{
            zipCode: '',
            gps:{
                lat: '',
                long: ''
            }
        }
    }
  });

  const handleSubmit = (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    // let a = {...place}
    // a.owner = user.id

    let jwt = JSON.parse(localStorage.getItem('Auth'))
    // console.log(place);
    placesService.addPlace(place, jwt)
    .then((res) => {
      if(res && res.code != 'ERR_BAD_RESPONSE'){
        router.push('/')
      }
        else{
          setMessage(res.response.data.message)
        }
    })
    .catch((errors) => {
        setMessage(errors)
    })
  };
 

  return (
    <form  onSubmit={handleSubmit} className='mx-auto mt-24 p-3 mb-8 border-primary border rounded-md shadow-md shadow-primary'>
      <div className="mb-4 text-center ">
        <label className="block text-secondary font-bold text-xl mb-2" htmlFor="title">
          Titre
        </label>
        <input 
          className={`border border-gray-400 p-2 rounded w-3/4`}
          type="text"
          name="title"
          placeholder='Maison bord de Mer'
          id="title"
          onChange={(e) => setPlace({...place,title:e.target.value})}
          value={place.title}
        />
        {/* {errors && errors.title && (
          <p className="text-red-500 text-xs italic">
            Title is required and must be between 2 and 50 characters.
          </p>
        )} */}
      </div>

      <div className="mb-4 text-center">
        <label className="block text-secondary font-bold mb-2 text-left xl:ml-16 md:ml-14 " htmlFor="type">
          Type
        </label>
        <select
          className={`border border-gray-400 p-2 rounded w-5/6  `}
          type="text"
          placeholder='Maison'
          name="type"
          list="categories"
          id="type"
          autocomplete="on"
        //   onChange={(e) => setPlace({...place,type:e.target.value})}
        multiple
        onChange={(e) => {
            const selectedOption = e.target.value;
            if (place.type.includes(selectedOption)) {
              setPlace({
                ...place,
                type: place.type.filter((value) => value !== selectedOption),
              });
            } else {
              setPlace({
                ...place,
                type: [...place.type, selectedOption],
              });
            }
        }}
        value={place.type}
        >
            {categoriesList.map((category) => 
            <option key={category.title} value={category.title} >  {category.title}</option>
                
            )}
           </select> 
          <div>{place.type && place.type.map((c) => <span className='font-semibold'> - {c}  </span>)}</div> 
        {/* {errors && errors.type && (
          <p className="text-red-500 text-xs italic">
            Type is required
          </p>
        )} */}
      </div>
    
    <div className="mb-4 flex justify-evenly">
        <div>
        <label className="block text-secondary italic font-semibold mb-2" htmlFor="pricePerDay">
          Prix / jour
        </label>
        <input
          className={`border border-gray-400 p-2 rounded w-full`}
          type="number"
          name="pricePerDay"
          id="pricePerDay"
          min={0}
          max={9999}
          onChange={(e) => setPlace({...place,pricePerDay:e.target.value})}
          value={place.pricePerDay}
        /> 
        </div>
        <div>
        <label className="block font-semibold text-secondary italic mb-2" htmlFor="capcity">
          Nombre de personnes
        </label>
        <input
          className={`border border-gray-400 p-2 rounded w-full`}
          type="number"
          name="capacity"
          min={0}
          max={100}
          id="capacity"
          onChange={(e) => setPlace({...place,capacity:e.target.value})}
          value={place.capacity}
        />
        </div>
    </div>

        
    <div className="mb-4 mx-8">
        <label className="block text-secondary font-medium mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          className={`border border-gray-400 p-2 rounded w-full`}
          name="description"
          placeholder='Maison en bord de mer, trés calme et ...'
          id="description"
          onChange={(e) => setPlace({...place,description:e.target.value})}
          value={place.description}
        />
    </div>
    <div className="mb-4 mx-20">
        <label className="block text-secondary font-medium mb-2" htmlFor="image">
          Image
        </label>
        <input
          className={`border border-gray-400 p-2 rounded w-full`}
          type="text"
          placeholder='https://image/url.com'
          name="image"
          id="image"
          onChange={(e) => setPlace({...place,image:e.target.value})}
          value={place.image}
        />
    </div>
    <div className='flex mx-auto justify-center w-1/2'>
        <img className='mx-auto object-cover rounded-md' src={place.image} alt="Preview" />
    </div>
    <div className="mb-4 mt-4 flex justify-center text-center">
        <div className='mr-2'>
            <label className="block italic font-medium mb-2" htmlFor="city">
            City
            </label>
            <input
            className={`border border-gray-400 p-2 rounded w-full`}
            type="text"
            placeholder='Paris'
            name="Addresse.city"
            id="city"
            onChange={(e) => setPlace({ ...place, Addresse: { ...place.Addresse, city: e.target.value } })}
            value={place.Addresse.city}
            />
        </div>
        <div className='ml-2'>
            <label className="block italic font-medium mb-2" htmlFor="zipCode">
            Zip Code
            </label>
            <input
            className={`border border-gray-400 p-2 rounded w-full`}
            type="number"
            placeholder='75010'
            name="Addresse.street.zipCode"
            id="zipCode"
            min={0}
            onChange={(e) => setPlace({ ...place, Addresse: { ...place.Addresse, street: {...place.Addresse.street, zipCode: e.target.value } } })}
            value={place.Addresse.street.zipCode}
            />
        </div>
    </div>
    
    <div className="mb-4 flex justify-center text-center">
        <div className='mr-1'>
            <label className="block font-medium mb-2" htmlFor="lat">
            Latitude
            </label>
            <input
            className={`border border-gray-400 p-2 rounded w-full`}
            type="text"
            placeholder='48.808311'
            name="Addresse.street.gps.lat"
            id="lat"
            onChange={(e) => setPlace({ ...place, Addresse: { ...place.Addresse, street: {...place.Addresse.street, gps: {...place.Addresse.street.gps, lat: e.target.value}} } })}
            value={place.Addresse.street.gps.lat}
            />
        </div>
        <div className='ml-1'>
            <label className="block  font-medium mb-2" htmlFor="long">
            Longitude
            </label>
            <input
            className={`border border-gray-400 p-2 rounded w-full`}
            type="text"
            placeholder='2.234734'
            name="Addresse.street.gps.long"
            id="long"
            onChange={(e) => setPlace({ ...place, Addresse: { ...place.Addresse, street: {...place.Addresse.street, gps: {...place.Addresse.street.gps, long: e.target.value}} } })}

            value={place.Addresse.street.gps.long}
            />
        </div>
    </div>
        
        <div className='w-40 mx-auto text-center'>
            <button className="bg-primary hover:shadow-xl hover:scale-105 transition-all shadow-primary text-white font-medium py-2 px-4 rounded-full">
            Valider
            </button>
        </div>
        {message && 
          <div className='p-2 w-3/4 mt-4 bg-red-600 rounded-md mx-auto text-center relative' >
            {message} <span className='cursor-pointer absolute top-1 right-1 font-bold text-xl' onClick={() => setMessage('')}>X</span>
          </div> 
        }
    </form>
  )
}
export default WithAuth(addPlace);
    