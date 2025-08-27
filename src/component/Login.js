import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import ShoppingContext from '../Context/shopping/shoppingContext';
import './Login.css';
import KeyIcon from '@mui/icons-material/Key';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const shoppingContext = useContext(ShoppingContext);
  const { user } = shoppingContext;

  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        navigate('/'); 
      })
      .catch((error) => alert(error.message)); 
  };

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          navigate('/'); 
        }
      })
      .catch((error) => alert(error.message)); 
  };

  return (
    <div className='login'>
      
      <div className='login-container'>

        <img
        src='https://see.fontimg.com/api/rf5/axjg/Mjk4ZjQ3OGM3YTlmNGEzYjhjZGQyN2EwYjYyMGEyNTEudHRm/QUNSRVM/cloister-black-light.png?r=fs&h=65&w=1000&fg=000000&bg=FFFFFF&s=65'
        alt='logo'
        className='logo1'
      />
        
        <form>
          <label>Email</label>
          <input
            type='text'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type='text'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <KeyIcon/>
          <button onClick={signIn} type='submit' className='login-button'>
            Sign In
          </button>
        </form>
        <p>
          By continuing, you agree to  Conditions of Use and Privacy
          Notice.
        </p>
        <button onClick={register} className='register-button'>
          Create Account
        </button>
      </div>
    </div>
  );
};

export default Login;
