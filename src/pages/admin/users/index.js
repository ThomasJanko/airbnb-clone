import React, {useState, useEffect} from 'react';
import userService from '../../../public/services/users.service'
import Header from '../../../components/layout/Header'

const Index = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
          const response = await userService.getUsers();
          setUsers(response.data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    
      if (loading) {
        return <p className='text-2xl font-bold text-center mt-52'>Loading...</p>;
        // return <Loader/>
      }
      if (error) {
        return <p>Error: {error.message}</p>;
      }

    return (
        <div className='w-full'>
            <Header/>
            <div className='mx-auto xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-5/6 mt-40'>
                <div className='text-center text-2xl font-semibold '>Liste des Utilisateurs:</div>
                <div>
                    {users?.map((user) => 
                    <div key={user._id} className="mt-4">
                        <div className="bg-white rounded-lg shadow-primary shadow-md p-4">
                            <div className="flex items-center">
                                <img className="w-16 h-16 rounded-full mr-4" src={user.avatar? user.avatar : 'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png' } alt="Profile picture"/>
                                <div>
                                <h2 className="text-lg font-bold first-letter:uppercase">{user.firstName} {user.lastName}</h2>
                                <p className="text-gray-600">{user.email}</p>
                                </div>
                            </div>
                           
                            <div className="mt-4 flex justify-between">
                                <div>
                                <p className="text-gray-600 font-bold">type</p>
                                <p className="text-lg font-bold">{user.type}</p>
                                </div>
                                <div>
                                <p className="text-gray-600 font-bold">Nombres d'annonces</p>
                                <p className="text-lg font-bold">{user.places.length}</p>
                                </div>
                                <div>
                                <p className="text-gray-600 font-bold">Administrateur</p>
                                <p className="text-lg font-bold">{user.isAdmin? 'OUI' : 'NON'}</p>
                                </div>
                            </div>
                            </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Index;
