import React, { createContext, useContext, useState } from 'react'
import AuthService from '../../../public/services/auth.service'
// import Alert from '../Utilities/Alert'
import { useRouter } from 'next/router';



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
                //    router.push('/users');
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
        <h2 className='title font-bold mt-32 text-center text-2xl'>LoginForm</h2>
        <div className='bg-green-100 mx-auto border rounded-2xl mt-4 card shadow-md elevation-2' style={{width: '40%', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'}}>
         <div className='mx-8 mt-4 flex-col '>
            <label className='block text-gray-700 text-sm font-bold mt-2' htmlFor="email">EMAIL :</label><br/>
            <input className='shadow appearance-none border rounded w-full p-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={email} type="email" onChange={(e) => setEmail(e.target.value)} /><br/>
            
            <label className='block text-gray-700 text-sm font-bold mt-2' htmlFor="password">PASSWORD :</label><br/>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={password} type="password" onKeyDown={(e) => e.key==='Enter' && handleForm()}  onChange={(e) => setPasssword(e.target.value)} /><br/>

            <div className='flex justify-center'>
                <button className='mt-4 text-center mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={() => handleForm()}> Login </button>
            </div>

            <div className='flex justify-between'>
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 pb-2" href="/auth/register">
                        Register
                    </a>
                
                <a className="inline-block align-baseline font-bold text-sm text-blue-500  hover:text-blue-800 pb-2">
                    Forgot Password?
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
