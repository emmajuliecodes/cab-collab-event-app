import {useContext, useEffect, useState} from 'react';
import {db} from '../firebase/FirebaseConfig';
import {collection, getDocs, query, where} from 'firebase/firestore';
import {AuthContext, UserProfile} from '../context/AuthContext';

const Profile = () => {
  const {user} = useContext(AuthContext);
  const [userData, setUserData] = useState<UserProfile | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const findUserByUID = async (uid: string) => {
    try {
      const usersCollection = collection(db, 'users');
      const q = query(usersCollection, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);
      // Assuming there's only one document with the same UID
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      setUserData(userData as UserProfile);
    } catch (error) {
      console.error('Error finding user by UID:', error);
      throw error;
    }
  };
  useEffect(() => {
    if (user) findUserByUID(user.uid);
  }, []);

  // Added user as a dependency
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>User Profiles</h1>
      <div>
        {userData &&
          Object.entries(userData).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {value}
            </p>
          ))}
      </div>
    </div>
  );
};

export default Profile;
