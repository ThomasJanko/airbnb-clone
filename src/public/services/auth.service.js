import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default{
    
    register(form){
       return axios.post(`${URL}/auth/register`, form)
        .then(res=>res)
        .catch(err=>err)
    },

    login(form){
       return axios.post(`${URL}/auth/login`, form)
        .then(res=>res)
        // .then(localStorage.setItem('User', JSON.stringify(form)))
        // .then(res => { localStorage.setItem('Token', res.data.jwt)
        //  })
        // //  .then(() => this.setState({ redirection: true }))
        .catch(err=>console.log(err))
    }
}