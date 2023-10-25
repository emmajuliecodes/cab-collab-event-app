import { createContext, useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { type User, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  // updateDoc,
  // doc,
} from "firebase/firestore";
import { auth, db } from "../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import { UserProfileData } from "../@types";

interface ContextType {
  user: User | null;
  userData: UserProfileData | undefined;

  handleLogin: (e: FormEvent<HTMLFormElement>, email: string, password: string) => void;
  logout: () => void;
  handleRegister: (e: FormEvent<HTMLFormElement>, name: string, email: string, password: string) => void;
  isChecked: boolean;
}

const defaultValue: ContextType = {
  user: null,
  userData: undefined,
  handleLogin: () => {
    throw Error("No provider");
  },

  logout: () => {
    throw Error("No provider");
  },
  handleRegister: () => {
    throw Error("No provider");
  },
  isChecked: false,
};

export const AuthContext = createContext(defaultValue);

interface Props {
  children: React.ReactNode;
}

export const AuthContextProvider = (props: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserProfileData | undefined>(undefined);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        toast.info("logged out");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  const handleRegister = (e: FormEvent<HTMLFormElement>, name: string, email: string, password: string) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        console.log("new user", user);

        toast.success("Success, you are registered");
        const data = {
          email: user.email!,
          uid: user.uid,
          name: name,
          city: "",
          phone: "",
          myEvents: [],
          invites: [],
          declined: [],
          attending: [],
        };
        addDoc(collection(db, "users"), data);
        setUserData(data);

        navigate("/");
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.log(error);
      });
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>, email: string, password: string) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        console.log(user);

        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        getDocs(q).then((querySnapshot) => {
          const uData: UserProfileData[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data() as UserProfileData;
            uData.push(data);
            console.log(doc.id, " => ", doc.data());
          });
          setUserData(uData[0]);

          toast.success("Success, you are logged in");
          navigate("/");
        });
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.log(error);
      });
  };

  const checkActiveUser = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getUserProfileByUID(user.uid);
      } else {
        setUser(null);
      }
      setIsChecked(true);
    });
  };

  //TODO: Find out why the func is not assigning user profile details to the userData setState
  const getUserProfileByUID = (uid: string) => {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    getDocs(q).then((querySnapshot) => {
      const uData: UserProfileData[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as UserProfileData;
        uData.push(data);
        console.log(doc.id, " => ", doc.data());
      });
      setUserData(uData[0]);
    });

    // try {
    //   if (user) {
    //     const usersCollection = collection(db, 'users');
    //     const q = query(usersCollection, where('uid', '==', uid));
    //     const querySnapshot = await getDocs(q);
    //     const userDoc = querySnapshot.docs[0];
    //     const userData = userDoc.data();
    //     setUserData(userData as UserProfileData);
    //   }
    // } catch (error) {
    //   console.error('Error finding user by UID:', error);
    //   throw error;
    // }
  };

  useEffect(() => {
    checkActiveUser();
  }, []);

  // useEffect(() => {
  //   getUserProfileByUID();
  // }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        handleLogin,
        userData,
        logout,
        handleRegister,
        isChecked,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
