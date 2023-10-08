import React, { useState } from 'react'
import styled from 'styled-components'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../utils/firebase-config'
import Header from '../component/Header'
import BackgroundImage from '../component/BackgroundImage'
import { useNavigate } from 'react-router-dom'


export default function SignUpPage() {
  const [ showPassword, setShowPassword ] = useState(false)

  const [formValues, setFormValues] = useState({email: "", password: ""})

  const navigate = useNavigate()

  const handleSingIn = async()=>{
    try{
      const {email, password} = formValues
      await createUserWithEmailAndPassword(firebaseAuth, email, password)
    }catch(error){
      console.log(error)
    }
  }

  onAuthStateChanged(firebaseAuth, (currentUser)=>{
    if(currentUser) navigate('/')
  })

  return (
    <div>
      <Container>
        <BackgroundImage />
        <div className="content">
          <Header login />
          <div className="body">
            <div className="text">
              <h1>Unlimited movies, TV shows and more</h1>
              <h4>watch anywhere, Cancel Anytime</h4>
              <h6>Enter you email to create or restart membership</h6>
            </div>
            <div className="form">
              {
                showPassword ?
                  (<input type="password" placeholder='Password' name='password' 
                  value={formValues.password}
                  onChange={(e)=>setFormValues({
                    ...formValues,[e.target.name]: e.target.value
                  })}
                  />)
                  :
                  (<input type="email" placeholder='Email Address' name='email' 
                  value={formValues.email}
                  onChange={(e)=>setFormValues({
                    ...formValues,[e.target.name]: e.target.value
                  })}
                  />)
                  // here, ...formValues is creating a new object, e.target.name is getting name property of the input and e.target.value is used to get the value of the property, the this is used to add new property to the created object
              }
              {
                !showPassword ?
                  (
                    <button onClick={()=>setShowPassword(true)}>Get Started</button>
                  ) : (
                    <button onClick={handleSingIn}>Sign up</button>
                  )
              }
              {/* when we click on Get Started button, it will get us the password field and the sign up button that's why we have used showPassword use state */}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

const Container = styled.div`
  position: relative;
  .content{
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.79);
    height: 100vh;
    width: 100vw;
    grid-template-columns: 15vh 85vh;
    .body{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .text{
      display: flex;
      flex-direction: column;
      text-align: center;
      font-size: 2rem;
      color: white;
    }
    h1{
      padding: 0 25rem;
    }
    h4{
      margin-top: 1.5rem;
    }

    h6{
      margin-top: 1.5rem;
      font-size: 1rem;
      word-wrap: break-word;
     
    }
  }
  .form{
    display: grid;
    width: 60%;
    grid-template-columns: ${({showPassword})=>showPassword?"1fr 1fr":"2fr 1fr"};
    input{
      color: black;
      padding: 1.5rem;
      font-size: 1.2rem;
      width: 45rem;
      background-color: transparent;
      color: white;
      margin-right: 10px;
      &:focus{
        outline: blue;
      }
    }
    button{
      padding: 0.5rem 1rem;
      background-color: red;
      border: none;
      cursor: pointer;
      color: white;
      font-size: 1.05rem;
      width: 10rem;
    }
  }
  @media (max-width: 768px) {
    .form {
      grid-template-columns: 1fr;
      input,
      button {
        margin-right: 0;
        width: 100%;
      }
    }
    h1 {

      padding: 0 2rem;
    }
    h4 {
      font-size: 1rem; 
    }
    h6{
      font-size: 1rem;
      word-wrap: break-word;
      
    }
  }
`
