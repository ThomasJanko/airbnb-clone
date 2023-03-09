import React from 'react';

const ReservationCard = ({reservation}) => {
    return (
        <div>
            <div className="bg-white rounded-lg shadow-primary shadow-md p-4">
                    <div className="relative w-full">
                      <img className="h-14 w-14 rounded-xl object-cover"
                        src='https://zeenea.com/wp-content/uploads/2019/09/data-portal-airbnb-.jpg'
                        alt='reservation'
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-xl">{reservation.title}</h3>
                      <h4 className="text-lg font-semibold my-2"> Dates: <span className='font-mono'> {reservation.dates}</span></h4>
                      <p className="text-gray-500 text-sm my-2">Nombre de nuits: <span className='font-bold'>{reservation.nbOfNights}</span> </p>
                      <p className="text-lg font-mono mt-2">{reservation.totalPrice} €</p>
                    </div>
                    <div className='flex justify-between'>
                         <div>
                         Réservé par <span className='font-mono text-md font-bold'>{reservation.owner.firstName} {reservation.owner.lastName}</span>
                        </div>  
                    <img className=' rounded-md w-8 h-8 object-cover' src={reservation.owner.avatar? reservation.owner.avatar: 'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png'} alt="avatar" />
                    </div>
                    </div>
        </div>
    );
}

export default ReservationCard;
