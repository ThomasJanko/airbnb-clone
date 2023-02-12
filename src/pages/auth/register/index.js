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
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [type, setType] = useState(false)
    const [avatar, setAvatar] = useState('https://www.pngitem.com/pimgs/m/9-93862_my-account-account-vector-icon-png-transparent-png.png')

    const [message, setMessage] = useState('')


    const handleForm = () => {

        let form = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            type: type? 'OWNER' : 'CUSTOMER',
            avatar: avatar? avatar : 'https://www.pngitem.com/pimgs/m/9-93862_my-account-account-vector-icon-png-transparent-png.png'
        }
        if(form.email && form.password){
            AuthService.register(form)
            .then((res) => {
                if(res && res.status === 200){
                  setEmail('')
                  setPasssword('')
                  setLastName('')
                  setFirstName('')
                   localStorage.setItem('Auth', JSON.stringify(res.data))
                   login(res.data);
                   router.push('/');
            }
            else{
                setMessage('Une erreur est survenue')
            }

            })
            .catch((err) => {
                setMessage('Une erreur est survenue')
            })
        }
        else {
            setMessage('Remplissez tous les champs !')
        }

   
    }
  return (
    <div className='mx-auto  '>
        <Link href={'/'} className='absolute top-20 left-40'>
            <Image src={AirbBnbLogo.src} width={100} height={100} alt='logo' />
          </Link>
        <h2 className='title font-bold mt-32 text-center text-primary text-2xl'>Inscription</h2>
        <div className='bg-transparent mx-auto border rounded-2xl mt-4 card shadow-md elevation-2' style={{width: '40%', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'}}>
         <div className='mx-8 mt-4 flex-col '>

            <div className='grid grid-cols-2 '>
                <div className='mr-2'>
                    <label className='block text-secondary text-sm font-bold mt-2' htmlFor="password">NOM :</label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-secondary leading-tight focus:outline-none focus:shadow-outline' value={lastName} type="text" placeholder='DUBOIS' onChange={(e) => setLastName(e.target.value)} /><br/>
                </div>
                <div className='ml-2'>
                    <label className='block text-secondary text-sm font-bold mt-2' htmlFor="password">PRENOM :</label>
                    <input className='shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline' value={firstName} type="text" placeholder='Jean' onChange={(e) => setFirstName(e.target.value)} /><br/>
                </div>
           
            </div>

            <label className='block text-secondary text-sm font-bold mt-4' htmlFor="email">EMAIL :</label>
            <input className='shadow appearance-none border rounded w-full mt-2 p-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline' value={email} type="email" placeholder='user@user.com' onChange={(e) => setEmail(e.target.value)} /><br/>
            
            <label className='block text-secondary text-sm font-bold mt-4' htmlFor="password">MOT DE PASSE :</label>
            <input className='shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline' value={password} type="password" placeholder='user1234' onKeyDown={(e) => e.key==='Enter' && handleForm()}  onChange={(e) => setPasssword(e.target.value)} /><br/>
            
            <div className='grid grid-cols-2 mt-2'>
                <div className=''>
                    <label className='block text-secondary text-sm font-bold mt-4' htmlFor="password">AVATAR * :</label>
                    <input className='shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline' value={avatar} type="text" placeholder='http://image/url.png' onChange={(e) => setAvatar(e.target.value)} /><br/>
                </div>
                <div className='ml-10 mt-4 rounded-full h-20 w-20 object-cover bg-green-600'>
                    <img className='w-full h-full rounded-full' src={avatar} alt="avatar" />
                </div>
            </div>
            <input type='checkbox' className='mt-4 ml-2' value={type} onChange={() => setType(!type)} />
            <label className='ml-2'>Je souhaite mettre mon logement sur Airbnb</label>

            <div className='flex justify-center'>
                <button className='mt-4 text-center mx-auto bg-primary hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={() => handleForm()}> Valider </button>
            </div>

            <div className='flex justify-between mt-2'>
                    <a className="inline-block align-baseline font-bold text-sm text-primary cursor-pointer hover:text-red-700 pb-2" href="/auth/login">
                        Connexion
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
