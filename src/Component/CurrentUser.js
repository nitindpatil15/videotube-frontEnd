import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrentUser = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.post('http://localhost:7500/api/v1/users/current-user', {}, {
          withCredentials: true // Include credentials in the request
        });
        setUser(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCurrentUser();
  }, []);

  if (error) {
    return <div className='text-white md:ml-32'>Error: {error}</div>;
  }

  if (!user) {
    return <div className='text-white md:ml-32'>Loading...</div>;
  }

  return (
    <div className='md:ml-32'>
      <img src={user.data.coverImage} alt="coverImage" className='w-96'/>
      <img src={user.data.avatar} alt="avatar" className='w-12'/>
      <h1 className='text-white font-bold'>Wellcome {user.data.fullName}</h1>
      <p className='text-white font-bold'>Username: {user.data.username}</p>
      <p className='text-white font-bold'>Email: {user.data.email}</p>
    </div>
  );
};

export default CurrentUser;