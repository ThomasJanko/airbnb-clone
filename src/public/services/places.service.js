import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default{
    
    addPlace(form, jwt){
        const config = {
            headers: {
              authorization: jwt,
            },
          };
       return axios.post(`${URL}/place/place`, form, config)
        .then(res=>res)
        .catch(err=>err)
    },

    getPlaces(){
       return axios.get(`${URL}/place/places`)
        .then(res=>res)
        .catch(err=>console.log(err))
    },
    getMyPlaces(jwt){
       return axios.get(`${URL}/place/places`)
        .then(res=>res)
        .catch(err=>console.log(err))
    },
    getPlace(id){
       return axios.get(`${URL}/place/place/${id}`)
        .then(res=>res)
        .catch(err=>console.log(err))
    }
}