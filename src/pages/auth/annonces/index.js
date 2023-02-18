import React, { useContext, useEffect, useState } from 'react';
import Places from '../../../components/places/Places'
import Header from '../../../components/layout/Header'
import BannerIcon from '../../../components/BannerIcons'
import AuthContext from '../../../context/AuthContext';
import GlobalContext from '../../../context/GlobalContext';
import PlaceCard from '../../../components/places/PlaceCard';

const Index = () => {

    const currentUser = useContext(AuthContext)
    const {search, category, filterPrice, filterCapacity} = useContext(GlobalContext)

    const [list, setList] = useState([])
    const [places, setPlaces] = useState([])

    useEffect(() => {
        if(currentUser){
            setPlaces(currentUser?.currentUser?.places)
        }
    }, [currentUser]);

    return (
        <>
            <BannerIcon/>
            <Header/>
           <div className='mx-auto text-2xl font-semibold text-center mt-48'>
            Vos Annonces
           </div>
            <div className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 justify-around cursor-pointer'>
        
            {places?.length>0 ? places.map((place) => 
            <PlaceCard place={place}/>
            )
          :
          <div className='absolute text-2xl text-center mt-10' style={{width: '94%'}}>
            <span className='mx-auto'> Aucune location disponible !</span>
          </div>}
        </div>
        </>
    );
}

export default Index;
