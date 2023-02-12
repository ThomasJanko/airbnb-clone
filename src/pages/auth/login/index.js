import React, { createContext, useContext, useState } from 'react'
import AuthService from '../../../public/services/auth.service'
// import Alert from '../Utilities/Alert'
import { useRouter } from 'next/router';
import Link from 'next/link'
import AirbBnbLogo from '../../../public/assets/airBnbLogo.png'
import Image from 'next/image'


const Index = () => {
    
    // const {login} = useAuth()
    const router = useRouter();

    const [email, setEmail] = useState('')
    const [password, setPasssword] = useState('')
    const [message, setMessage] = useState('')

    const [alert, setAlert] = useState('')


    const handleForm = () => {

        let form = {
            email: email,
            password: password
        }
        if(form.email && form.password){
            AuthService.login(form)
            .then((res) => {
                if(res){
                  setAlert('success')
                  setEmail('')
                  setPasssword('')
                  // setUser(res.data.user)
                   localStorage.setItem('Auth', JSON.stringify(res.data))
                //    login();
                   router.push('/');
            }
            else{
                setMessage('Email or password incorrect !')
                setAlert('error')
            }

            })
            .catch((err) => {
                setAlert('error')
    })
        }
        else {
            setMessage('Fill empty fields !')
            setAlert('error')
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

        {/* {alert=='success' &&
            <div className='flex justify-center pt-6'>
            <Alert type='success'>
                <div className='flex justify-between'>
                   Login success ! <span onClick={()=> setAlert('')} className='cursor-pointer '>X</span>
                </div>
                
            </Alert>
            </div>
        }

        {alert=='error' &&
            <div className='flex justify-center pt-6'>
            <Alert type='error'>
                <div className='flex justify-between'>
                    {message} <span  onClick={()=> setAlert('')} className=' cursor-pointer'>X</span>
                </div>
                
            </Alert>
            </div>
        } */}
        </div> 

    </div>
  )
}
export default Index;
