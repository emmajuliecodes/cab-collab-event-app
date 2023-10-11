import {useContext} from 'react';
import AuthForm from '../components/AuthLoginForm';
import {AuthContext} from '../context/AuthContext';
// import {redirect} from 'react-router-dom';

const Login = () => {
  const {handleLogin} = useContext(AuthContext);

  return (
    <div>
      <AuthForm title={'Login'} handleSubmit={handleLogin} />
    </div>
  );
};

export default Login;
