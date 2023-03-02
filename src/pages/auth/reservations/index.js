import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import PlaceCard from '../../../components/places/PlaceCard';
import ReservationCard from '../../../components/reservations/reservationCard';
import AuthContext from '../../../context/AuthContext';
import AirbBnbLogo from '../../../public/assets/airBnbLogo.png'

const Index = () => {
const {currentUser} = useContext(AuthContext)

const [reservations, setReservations] = useState([])

useEffect(() => {
    currentUser && setReservations(currentUser.reservations) 
    console.log(currentUser)   
}, [currentUser])


    return (
        <div className='mt-20 w-full'>
        <Link href={'/'} className='absolute top-20 left-40'>
        <Image src={AirbBnbLogo.src} width={100} height={100} alt='logo' />
        </Link>
        <div className='flex justify-evenly mt-40'>
            <div className=''>
                {currentUser?.reservations?.map((reservation) =>
                <div className='w-full mx-auto'>
                    <ReservationCard reservation={reservation} />
                </div> 
                )}
            </div>
            <div className=''>
                {currentUser?.reservations?.map((reservation) =>
                <div className='w-full mx-auto'>
                    <ReservationCard reservation={reservation} />
                </div> 
                )}
            </div>


            </div>

        </div>
    );
}

export default Index;
