import React, { useContext } from 'react';
import WithAuth from '../../WithAuth'
import ProfilCard from '../../../components/account/ProfilCard'
import AuthContext from '../../../context/AuthContext'
const Index = () => {

    const {currentUser} = useContext(AuthContext)
    
    return (
        <div className='w-full mx-auto'>
            <ProfilCard user={currentUser}/>
        </div>
    );
}

export default WithAuth(Index)
