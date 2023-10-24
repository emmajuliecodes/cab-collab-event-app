import {useContext, useEffect, useState} from 'react';
import {db} from '../firebase/FirebaseConfig';
import {collection, getDocs, query, where} from 'firebase/firestore';
import {AuthContext} from '../context/AuthContext';
import {Event, UserProfileData} from '../@types';

const Profile = () => {
  const {userData} = useContext(AuthContext);
  const [setUserProfile] = useState<UserProfileData | undefined>(userData);
  // const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  console.log('user profile');

  // useEffect(() => {
  //   console.log('testong', userData);
  //   if (userData) (userData);
  // }, [userData]);
  // const {myEvents = []} = userProfile || {};

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>User Profiles</h1>
      <div>
        {userData && (
          <>
            <p>Name: {userData.name.toUpperCase()}</p>
            <p>Email: {userData.email}</p>
            <p>City: {userData.city}</p>
            <p>Invites: {userData.invites} </p>
            <p>Attending: {userData.attending}</p>
            <p>Declined: {userData.declined}</p>
            My Events:
            <ul>
              {userData.myEvents.map(
                (event, idx) => {
                  return <li key={idx}>{event}</li>;
                }

                //TODO: Get this displaying events
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
