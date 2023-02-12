import React, { createContext, useContext, useState } from 'react'
import AuthService from '../../../public/services/auth.service'
// import Alert from '../Utilities/Alert'
import { useRouter } from 'next/router';
import Link from 'next/link'
import AirbBnbLogo from '../../../public/assets/airBnbLogo.png'
import Image from 'next/image'
import AuthContext from '../../../context/AuthContext'


const Index = () => {
    
    const {login, currentUser} = useContext(AuthContext)
    const router = useRouter();

    const [email, setEmail] = useState('')
    const [password, setPasssword] = useState('')
    const [message, setMessage] = useState('')



    const handleForm = () => {

        let form = {
            email: email,
            password: password
        }
        if(form.email && form.password){
            AuthService.login(form)
            .then((res) => {
                console.log(res)
                // if(res && res.status == 200){
                if(res && res.code != 'ERR_BAD_RESPONSE'){
                  setEmail('')
                  setPasssword('')
                   localStorage.setItem('Auth', JSON.stringify(res.data))
                   login(res.data);
                   router.push('/');
            }
            else{
                setMessage('Email or password incorrect !')
            }

            })
            // .catch((err) => {
            //     setMessage('Erreur !')
            // })
        }
        else {
            setMessage('Fill empty fields !')
        }

   
    }
  return (
    <div className='mx-auto  '>
        {/* <Link href={'/'}>
            <span className='absolute top-20 left-40 underline cursor-pointer'> Accueil </span>
        </Link> */}
         <Link href={'/'} className='absolute top-20 left-40'>
            <Image src={AirbBnbLogo.src} width={100} height={100} alt='logo' />
          </Link>
        <h2 className='title font-bold mt-32 text-center text-primary text-2xl'>Connexion</h2>
        <div className='bg-transparent mx-auto border rounded-2xl mt-4 card shadow-md elevation-2' style={{width: '40%', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'}}>
         <div className='mx-8 mt-4 flex-col '>
            <label className='block text-secondary text-sm font-bold mt-4' htmlFor="email">EMAIL :</label>
            <input className='shadow appearance-none border rounded w-full mt-2 p-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline' value={email} type="email" placeholder='user@user.com' onChange={(e) => setEmail(e.target.value)} /><br/>
            
            <label className='block text-secondary text-sm font-bold mt-4' htmlFor="password">MOT DE PASSE :</label>
            <input className='shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline' value={password} type="password" placeholder='user1234' onKeyDown={(e) => e.key==='Enter' && handleForm()}  onChange={(e) => setPasssword(e.target.value)} /><br/>

            <div className='flex justify-center'>
                <button className='mt-4 text-center mx-auto bg-primary hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={() => handleForm()}> Valider </button>
            </div>

            <div className='flex justify-between mt-2'>
                    <a className="inline-block align-baseline font-bold text-sm text-primary cursor-pointer hover:text-red-700 pb-2" href="/auth/register">
                        Inscription
                    </a>
                
                <a className="inline-block align-baseline font-bold text-sm text-primary cursor-pointer hover:text-red-700 pb-2">
                    Mot de passe oublié ?
                </a>
            </div>
         </div>

         {message && 
          <div className='p-2 w-3/4 mt-4 bg-red-600 rounded-md mx-auto text-center relative' >
            {message} <span className='cursor-pointer absolute top-1 right-1 font-bold text-xl' onClick={() => setMessage('')}>X</span>
          </div> 
        }
        </div> 

    </div>
  )
}
export default Index;
