import {createContext, useState, useEffect} from 'react';

const GlobalContext = createContext();

export default GlobalContext;


export const GlobalContextProvider = ({ children }) => {

  
  const [wishlist, setWishlist] = useState([]);
  const [dates, setDate] = useState({startDate: '11/03/2001', endDate: '11/04/20023', nbNights: 7});


  console.log(dates)
  const removePlaceWishlist = (id) => {
    // ....
  }
  
  const addPlaceWishlist = (place) => {
    console.log(place);
    setWishlist([...wishlist, place])
    // ...
  }

  const deleteWishlist = () => {
    setWishlist([])
  }

  const context = {
    removePlaceWishlist,
    addPlaceWishlist,
    deleteWishlist,
    wishlist,
    dates,
    setDate,
  }

  return (
  <GlobalContext.Provider value={context}>
    {children}
  </GlobalContext.Provider>
  )

}