import {createContext, useState, useEffect} from 'react';

const GlobalContext = createContext();

export default GlobalContext;


export const GlobalContextProvider = ({ children }) => {

  const formattedDate = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
  
  const [wishlist, setWishlist] = useState([]);
  const [dates, setDate] = useState({startDate: formattedDate, endDate: formattedDate, nbNights: 0});
  const [search, setSearch] = useState('');
  const [category, setCategories] = useState('')

  const handleSearch = (input) =>{
      setSearch(input);
      console.log(input)
  }

  const setDates = (date) => {
    setDate(date)
  }

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
    setDates,
    setSearch,
    handleSearch,
    setCategories,
    wishlist,
    dates,
    search,
    category,
  }

  return (
  <GlobalContext.Provider value={context}>
    {children}
  </GlobalContext.Provider>
  )

}