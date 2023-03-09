import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default{
    
    addReservation(form, jwt){
        const config = {
            headers: {
              authorization: jwt,
            },
          };
       return axios.post(`${URL}/reservation/reservation`, form, config)
        .then(res=>res)
        .catch(err=>err)
    },
    getReservations(jwt){
        const config = {
            headers: {
              authorization: jwt,
            },
          };
       return axios.get(`${URL}/reservation/reservations`, config)
        .then(res=>res)
        .catch(err=>err)
    },

   
     
}