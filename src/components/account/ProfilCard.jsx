import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext'

const ProfilCard = (props) => {

    const currentUser = useContext(AuthContext)

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({})
    const [editing, setEditing] = useState(false)
    const [modal, setmodal] = useState(false)

    useEffect(() => {
        console.log(props.user)
        setUser(props.user)
    }, []);
    return (
       <div className='mx-auto bg-primary mt-52 p-8 rounded-lg xl:w-1/3 lg:w-1/2 md:w-1/2 sm:w-3/4' >
    {user &&
      <>
      {editing ? 
      <div>
        <input className='rounded-xl w-full p-1 px-2 bg-red-400'
            type='text'
            value={user.firstName}
            onChange={e => {
              const newUser = {...user};
              newUser.firstName = e.target.value;
              setUser(newUser);
            }}
            placeholder={user.firstName}
            />
            <br/>
        <input className='mt-2 rounded-xl w-full p-1 px-2 bg-red-400'
            type='text'
            value={user.lastName}
            onChange={e => {
              const newUser = {...user};
              newUser.lastName = e.target.value;
              setUser(newUser);
            }}
            placeholder={user.lastName}
            />
            <br/>
        <input className='mt-2 rounded-xl w-full p-1 px-2 bg-red-400'
            type='text'
            value={user.email}
            onChange={e => {
              const newUser = {...user};
              newUser.email = e.target.value;
              setUser(newUser);
            }}
            placeholder={user.email}
            />
    <br/>

            <div className='mt-2'>
            Admin: <span className='ml-2 cursor-pointer font-bold rounded-full border p-1' onClick={() => { const newUser = {...user}; newUser.isAdmin = !newUser.isAdmin; setUser(newUser)}}>{user.isAdmin ? 'YES': 'NO'} </span> 
            </div>
            <button type="button" className='rounded mt-2 bg-green-600  border py-1 px-2' onClick={()=> editUser()}>Valider</button>
      </div>
      :
      <div className='flex justify-between'>
        
        <div className='py-2'>
            <li className='my-1'>FIRSTNAME: <span className='font-bold'>{user.firstName}</span> </li>
            <li className='my-1'>LASTNAME: <span className='font-bold'>{user.lastName}</span> </li>
            <li className='my-1'>EMAIL: <span className='font-bold'>{user.email}</span> </li>
            <li className='my-1'> You are a <span className='font-bold'> {user.type=='OWNER'? 'OWNER': 'CUSTOMER'}</span> </li>
           {currentUser && currentUser.isAdmin && <li className='my-1'>ADMIN: <span className='font-bold'>{user.isAdmin? 'YES' : 'NO'}</span> </li> }
        </div>
        <div className='bg-red-400 mt-6 rounded-2xl' style={{width: '100px', height:'100px'}}>
                    {/* <img className='rounded-xl' 
                    src={user.isAdmin?
                     'https://png.pngtree.com/png-vector/20190629/ourmid/pngtree-office-work-user-icon-avatar-png-image_1527655.jpg'
                    : 'https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg'} alt=""/> */}
                     <img className='rounded-xl' 
                    src={user.avatar?
                     user.avatar
                    : 'https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg'} alt=""/>
                </div>
      </div>

      }
      <div className='flex w-full justify-center'>
      <button className='rounded mt-2 w-20 bg-orange-600  border py-1 px-2' onClick={()=> setEditing(!editing)} > Edit</button>
        
      </div>
      
      
      </>}
      {modal &&
      <div className='fixed top-24 mx-auto'>
        <Alert type='success'>
           <div>
            <span>User editing successfull ! </span> <span className='w-full cursor-pointer' onClick={() => setmodal(false)}>X</span>
           </div> 
        </Alert>
      </div>
      }
      </div>
    );
}

export default ProfilCard;
