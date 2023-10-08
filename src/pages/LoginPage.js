import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import styled from 'styled-components'
import Header from '../component/Header'
import BackgroundImage from '../component/BackgroundImage'
import { firebaseAuth } from '../utils/firebase-config'

export default function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin =  async()=>{
    try{
    await signInWithEmailAndPassword(firebaseAuth, email, password)

    }catch(error){
      console.log(error)
    }
  }

  onAuthStateChanged(firebaseAuth, (currentUser)=>{
    if(currentUser) navigate('/')
  })

  return (
    <Wrapper>
      <BackgroundImage />
      <div className="LoginContent">
        <Header />
        <div className="form-wrapper">

          <div className="form">
            <div className="title">
              <h1>Login</h1>
            </div>
            <div className="container">
              <input type="text" placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input type="password" placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button onClick={handleLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  .LoginContent{
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.6);
    height: 100vh;
    width: 100vw;
    grid-template-columns: 15vh 85vh;
    .form-wrapper{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      height: 85vh;
    }
    .form{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      background-color: rgba(0,0,0,0.83);
      height: 70vh;
      padding: 2rem;
      color: white;
      border-radius: 0.4rem;
    }
      .container{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        input{
          border-radius: 0.4rem;
          padding: 0.5rem;
          width: 20rem;
          height: 2.4rem;
          outline: none;
          background: transparent;
          color: white;
        }
        button{
          padding: 0.5rem;
          background-color: red;
          border: none;
          cursor: pointer;
          border-radius: 0.4rem;
          color: white;
          height: 3.4rem;
          font-weight: bolder;
          font-size: 1.05rem;
        }
      
    }
  }
  @media (max-width: 768px) {
    .LoginContent {
      padding: 1rem;
      gap: 1rem;
    }

    .form {
      padding: 1rem;
      gap: 1rem;

      .container {
        flex-direction: column;
        gap: 1rem;
        input {
          width: 100%;
        }
        button {
          padding: 0.3rem;
        }
      }
    }
  }
`
