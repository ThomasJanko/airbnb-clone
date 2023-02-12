import React from 'react';
import Header from '../../../components/layout/Header'
import AddPlace from '../../../components/places/addPlace';

const Index = () => {
    return (
        <div className='w-full'>
            <Header/>
            <div className='mt-32 xl:w-1/2 md:w-3/4 sm:w-3/4 sm:mt-40 mx-auto'>
                <AddPlace/>
            </div>
        </div>
    );
}

export default Index;
