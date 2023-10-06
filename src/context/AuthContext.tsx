import {createContext, useState, ReactNode, useEffect} from 'react';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {User} from '../@types';

//TODO: make changes to login interface and continue auth context with firebase

interface DefaultValue {
  user: null | User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    email: string,
    password: string,
    username: string,
    avatar: File | null
  ) => Promise<void>;
}

const initialValue: DefaultValue = {
  user: null,
  setUser: () => {
    throw new Error('context not implemented.');
  },
  login: () => {
    throw new Error('context not implemented.');
  },
  logout: () => {
    throw new Error('context not implemented.');
  },
  register: () => {
    throw new Error('context not implemented.');
  },
};
export const AuthContext = createContext<DefaultValue>(initialValue);

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<null | User>(null);

  const login = async (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      console.error(error);
    });
  };

  const register = async () => {};

  const logout = () => {};

  const getActiveUser = async () => {};

  useEffect(() => {
    getActiveUser().catch((e) => console.log(e));
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser, login, logout, register}}>
      {children}
    </AuthContext.Provider>
  );
};
