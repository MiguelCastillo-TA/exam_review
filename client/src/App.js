import './App.css';
import { useState } from 'react';
import axios from "axios"


function App() {
    
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleRegister = (e) => {
    e.preventDefault();
    const userDetails = {
        "firstName": firstName,
        "lastName": lastName,
        "password": password,
        "confirmPassword": confirmPassword,
        "email": email
    }
    axios.post('http://localhost:8000/api/user/create', userDetails)
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })

  }

  const handleLogin = (e) => {
    e.preventDefault();
    const userDetails = {
        "password": password,
        "email": email
    }
    axios.post('http://localhost:8000/api/user/login', userDetails, { withCredentials: true })
    .then((response) => {
      console.log(response)
      // redirect 
    })
    .catch((err) => {
      console.log(err)
    })
  }


  return (
    <div className="App">
        <div>
          <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
              <label htmlFor='firstName'>
                First Name
              </label>
              <input value={firstName} onChange={e => setFirstName(e.target.value)} id="firstName" type="text"/>
              <label htmlFor='lastName'>
                Last Name
              </label>
              <input value={lastName} onChange={e => setLastName(e.target.value)} id="lastName" type="text"/>
              <label htmlFor='email'>
                Email
              </label>
              <input  value={email} onChange={e => setEmail(e.target.value)} id="email" type="email"/>
              <label htmlFor='password'>
                Password
              </label>
              <input  value={password} onChange={e => setPassword(e.target.value)} id="password" type="text"/>
              <label htmlFor='confirmPassword'>
                Confirm Password
              </label>
              <input  value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} id="confirmPassword" type="text"/>
              <button>register</button>
            </form>
          </div>
          <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor='email'>
                  Email
                </label>
                <input  value={email} onChange={e => setEmail(e.target.value)} id="email" type="email"/>
                <label htmlFor='password'>
                  Password
                </label>
                <input  value={password} onChange={e => setPassword(e.target.value)} id="password" type="text"/>
                <button>  
                  login
                </button>
            </form>
          </div>
        </div>


    </div>
  );
}

export default App;
