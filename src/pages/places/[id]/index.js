import React, { useEffect, useRef, useState } from 'react'
import Header from '../../../components/layout/Header'
import { useRouter } from 'next/router';
import PlaceService from '../../../public/services/places.service'
import { ShareOutline, HeartOutline, Star, Translate, LocationMarkerOutline, CalendarOutline, ChevronDown } from "heroicons-react";
import DatesPicker from '../../../components/utilities/DatesPicker'




const gradient = "linear-gradient(to right, rgb(230, 30, 77) 0%, rgb(227, 28, 95) 50%, rgb(215, 4, 102) 100%)";

export default function index() {

  const router = useRouter();
    const { id } = router.query;

    const ref = useRef(null);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [place, setPlace] = useState({})

    const [select, setSelect] = useState(false)


    
    useEffect(() => {
      if(router.isReady){
          fetchData();
      }
  }, [router.isReady]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setSelect(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);


async function fetchData() {
    try {
      // let jwt = JSON.parse(localStorage.getItem('Auth'))
      const response = await PlaceService.getPlace(id); //jwt
      setPlace(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p className='text-2xl font-bold text-center mt-52'>Loading...</p>;
    }
    if (error) {
      return <p>Error: Not able to load this place</p>;
    }

  return (
    <div>
        <Header/>
        <div className='mt-28 w-full'>
          <div className='mx-auto' style={{width: '80%'}}>
            
            <div className='mx-auto ' >
              <span className='text-2xl font-bold flex'> <Translate/> {place.title} </span>
              <div className='flex flex-row justify-between'>
                <div className='flex mt-2'>
                  <span className='flex font-semibold'> <Star/> 4,6 ·</span>
                  <span className='font-semibold ml-1 underline'> 64 Commentaires</span>
                  <span className='flex'> · ! Superhost · </span>
                  <span className='ml-2 font-semibold underline '> Tremosine sul Garda, Brescia, Italie</span>
                </div>
                <div className='flex'>
                  <span className='mx-4 flex'> <ShareOutline/> Partager</span>
                  <span className='mx-4 flex'> <HeartOutline/> Enregistrer</span>
                </div>
              </div>
            </div>
            <div className='mx-auto mt-4 flex'>
              <img className='object-cover block w-1/2  rounded-xl p-1' src={place.image} alt={place.title} style={{height: '400px'}} />
              <div className='grid grid-cols-2 w-1/2'>
                <img className='object-cover  block w-full  rounded-xl p-1' src={place.image} alt={place.title} style={{height: '200px'}} />
                <img className='object-cover  block w-full  rounded-xl p-1' src={place.image} alt={place.title} style={{height: '200px'}}/>
                <img className='object-cover block w-full  rounded-xl p-1' src={place.image} alt={place.title} style={{height: '200px'}}/>
                <img className='object-cover  block w-full  rounded-xl p-1' src={place.image} alt={place.title} style={{height: '200px'}}/>
              </div>
            </div>
            <div className='w-full flex'>
                  
                <div style={{width: '60%'}}>
                  
                  <div className='mt-6 flex justify-between border-b-2 pb-8' >
                    <div className='flex flex-col'>
                      <span className='font-semibold text-2xl'>{place.description} </span>
                      <span>3 voyageurs · 1 chambre · 2 lits · 1 salle de bain</span>
                    </div>
                    <div className=' align-middle items-center'>
                      <img className='rounded-full h-14 w-14 object-cover ' width={60} height={60} src="https://a0.muscache.com/im/pictures/user/f8f6ecdd-c65a-4d0c-ace4-0f3f8c337209.jpg?im_w=240" alt="hote avatar"/>
                    </div>
                  </div>

                  <div className='border-b-2 pb-6 mt-8'>
                    <div className='flex flex-col my-4'>
                      <span className='text-lg font-semibold flex'> <HeartOutline className='mr-2'/> Mara est Superhôte</span>
                      <span className='ml-8'>Les Superhôtes sont des hôtes expérimentés qui bénéficient de très bonnes évaluations et qui s'engagent à offrir d'excellents séjours aux voyageurs.</span>
                    </div>
                    <div className='flex flex-col my-4'>
                      <span className='text-lg font-semibold flex'> <LocationMarkerOutline className='mr-2'/> Idéalement situé</span>
                      <span className='ml-8'>95 % des voyageurs ont attribué 5 étoiles à l'emplacement du logement.</span>
                    </div>
                    <div className='flex flex-col my-4'>
                      <span className='text-lg font-semibold flex'> <CalendarOutline className='mr-2'/> Annulation gratuite avant le 31 janv..</span>
                    </div>
                  </div>

                  <div className='aircover mt-6 border-b-2 pb-8'>
                      <img src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg" alt="aircover" width={120} />
                      <p className='mt-4'>Chaque réservation comprend une protection gratuite en cas d'annulation par l'hôte,
                        d'inexactitudes dans la description du logement, ainsi que d'autres problèmes comme les
                        difficultés d'accès au logement.</p>
                        <span className='cursor-pointer mt-6 underline font-semibold'>En savoir plus...</span>
                  </div>
                  <div className='mt-4'>
                    <div className='mx-auto flex justify-center'>
                    <DatesPicker/>
                    </div>
                  </div>
                </div>


              <div className=' ml-32 mt-8 w-full sticky' style={{bot: '0'}}>
                <div className='border  shadow-2xl w-5/6 rounded-xl p-6' >
                  <div className='flex justify-between'>
                    <div>  <span className='text-xl font-bold pt-2'>{place.pricePerDay} € </span> par nuit </div>
                    <div className='flex'>
                      <span className='flex'> <Star/> 4,6 · </span>
                      <span className='underline ml-2 opacity-80 cursor-pointer'>  64 Commentaires</span>
                    </div>
                  </div>
                  <div className='rounded-xl w-full mt-6' ref={ref}>
                    {select && <DatesPicker/>}
                    <div className='grid grid-cols-2 mx-auto'>
                      <div className='uppercase border rounded-tl-xl p-2 flex flex-col cursor-pointer' onClick={() => setSelect(!select)}> 
                        <span className='font-semibold'>Arrivée</span>
                        <span>11/03/2023</span>
                       </div>
                      <div className='uppercase border rounded-tr-xl p-2 flex flex-col cursor-pointer' onClick={() => setSelect(!select)} >
                        <span className='font-semibold'>Départ</span>
                        <span>17/03/2023</span>
                      </div>
                    </div>
                    <div className='flex justify-between p-2 border rounded-bl-xl rounded-br-xl'>
                      <div className='flex flex-col'>
                        <span className='uppercase w-full'>Voyageurs</span>
                        <span>1 voyageurs</span>
                      </div>
                      <ChevronDown/>
                    </div>

                  </div>

                  <button className='mt-4 w-full rounded-md h-12 reservation' style={{background: gradient}} type="text" >Réserver</button>
                
                  <div className='opacity-90 text-center mt-2'>Aucun montant ne vous sera débité pour le moment</div>

                  <div className='w-full border-b-2 pb-4'>
                    <div className='flex justify-between py-2 cursor-pointer'> <span className='underline'>145 € x 5 nuits</span> <span>723 €</span> </div>
                    <div className='flex justify-between py-2 cursor-pointer'> <span className='underline'>Frais de service</span> <span>122 €</span> </div>
                  </div>

                  <div className='flex justify-between mt-3'> <span className='font-semibold'>Total</span> <span>845 €</span> </div>
                </div>
              </div>
              </div>

          </div>
        </div>
        
    </div>
  )
}
