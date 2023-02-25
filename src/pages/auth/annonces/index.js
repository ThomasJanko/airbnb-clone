import React, { useContext, useEffect, useState } from 'react';
import Places from '../../../components/places/Places'
import Header from '../../../components/layout/Header'
import BannerIcon from '../../../components/BannerIcons'
import AuthContext from '../../../context/AuthContext';
import GlobalContext from '../../../context/GlobalContext';
import PlaceCard from '../../../components/places/PlaceCard';
import { Trash } from "heroicons-react";
import placesService from '../../../public/services/places.service';
import { useRouter } from 'next/router';


const Index = () => {

    const currentUser = useContext(AuthContext)
    const {search, category, filterPrice, filterCapacity} = useContext(GlobalContext)

    const [deleteDialog, setDeleteDialog] = useState(false)
    const [placeToDelete, setPlaceToDelete] = useState(null)

    const [list, setList] = useState([])
    const [places, setPlaces] = useState([])

    const router = useRouter()

    useEffect(() => {
        const fetchCurrentUserPlaces = async () => {
            let p = await currentUser?.currentUser?.places;
            if (p) {
              setPlaces(p);
              setList(p);
            }
          };
      
          fetchCurrentUserPlaces();
    }, [currentUser]);


    const handleDelete = (event, place) => {
        event.stopPropagation();
        setDeleteDialog(true); 
        setPlaceToDelete(place)
    }
    const deletePlace = () => {
        console.log(placeToDelete)
        let jwt = JSON.parse(localStorage.getItem('Auth'))
        placesService.deletePlace(placeToDelete, jwt)
        .then((res) => {
            router.reload()
        })
        .catch((err) => {});
        setDeleteDialog(false);

    }

    useEffect(() => {
        let filteredPlaces = places;
        if (category !== 'Tous') {
          filteredPlaces.forEach((place) => {
            place.type.forEach((type) => {
              if (!type.toLowerCase().includes(category.toLowerCase())) {
                console.log(type)
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

    return (
        <>
            <BannerIcon/>
            <Header/>
           <div className='mx-auto text-2xl font-semibold text-center mt-48'>
            Vos Annonces
           </div>
            <div className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 justify-around cursor-pointer'>
        
            {list?.length>0 ? list.map((place) =>
            <div key={place._id} className='relative'>
               <PlaceCard place={place} />
               <div className='absolute right-2 bottom-4 hover:text-red-600' onClick={(e) => handleDelete(e, place)}>
                <Trash />
               </div>
            </div>
           
            )
          :
          <div className='fixed text-2xl text-center mt-10' style={{width: '94%'}}>
            <span className='mx-auto'> Aucune location disponible !</span>
          </div>}
          {deleteDialog && 
            <div className='absolute top-1/3 w-full transition-opacity'>
                <div className='mx-auto w-1/3 backdrop-filter backdrop-blur-md bg-opacity-25 p-2 font-semibold rounded-md text-xl border-primary border'>
                   <div className='ml-2 mt-2'>Etes-vous sûr de vouloir supprimer l'annonce "<span className='text-primary'>{placeToDelete?.title}</span>"?</div>
                   <div className='flex justify-between p-2'>
                   <button className='p-2  rounded-md hover:text-green-500' onClick={deletePlace}>Valider</button>
                   <button className='p-2 hover:text-red-600 rounded-md' onClick={() => {setDeleteDialog(false); setPlaceToDelete(null)}}>Annuler</button> 
                   </div>
                 
                </div>
                
                    
            </div>
            }
        </div>
        </>
    );
}

export default Index;
