import React, { useContext, useEffect, useState } from 'react';
import Places from '../../../components/places/Places'
import Header from '../../../components/layout/Header'
import BannerIcon from '../../../components/BannerIcons'
import AuthContext from '../../../context/AuthContext';
import GlobalContext from '../../../context/GlobalContext';
import PlaceCard from '../../../components/places/PlaceCard';
import { Trash } from "heroicons-react";


const Index = () => {

    const currentUser = useContext(AuthContext)
    const {search, category, filterPrice, filterCapacity} = useContext(GlobalContext)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [placeToDelete, setPlaceToDelete] = useState(null)

    const [list, setList] = useState([])
    const [places, setPlaces] = useState([])

    useEffect(() => {
        if(currentUser){
            setPlaces(currentUser?.currentUser?.places)
        }
    }, [currentUser]);

    const handleDelete = (event, place) => {
        event.stopPropagation();
        setDeleteDialog(true); 
        setPlaceToDelete(place)
    }
    const deletePlace = () => {
        console.log(placeToDelete)
        setDeleteDialog(false);
    }

    return (
        <>
            <BannerIcon/>
            <Header/>
           <div className='mx-auto text-2xl font-semibold text-center mt-48'>
            Vos Annonces
           </div>
            <div className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 justify-around cursor-pointer'>
        
            {places?.length>0 ? places.map((place) =>
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
            <div className='absolute top-1/2 w-full transition-opacity'>
                <div className='mx-auto w-1/3 bg-primary p-2 rounded-md'>
                   <span className='ml-2 mt-2'>Etes vous sur de vouloir supprimer cette annonce?</span>
                   <div className='flex justify-between p-2'>
                   <button className='p-2  rounded-md hover:text-white' onClick={deletePlace}>Valider</button>
                   <button className='p-2 hover:text-white rounded-md' onClick={() => {setDeleteDialog(false); setPlaceToDelete(null)}}>Annuler</button> 
                   </div>
                 
                </div>
                
                    
            </div>
            }
        </div>
        </>
    );
}

export default Index;
