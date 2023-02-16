import React, { useContext } from 'react';
import WithAuth from '../../WithAuth'
import ProfilCard from '../../../components/account/ProfilCard'
import AuthContext from '../../../context/AuthContext'
import Link from 'next/link'
import AirbBnbLogo from '../../../public/assets/airBnbLogo.png'
import Image from 'next/image'


const Index = () => {

    const {currentUser} = useContext(AuthContext)
    
    return (
        <div className='w-full mx-auto'>
            <Link href={'/'} className='absolute top-20 left-40'>
            <Image src={AirbBnbLogo.src} width={100} height={100} alt='logo' />
          </Link>
            <ProfilCard user={currentUser}/>
        </div>
    );
}

export default WithAuth(Index)
