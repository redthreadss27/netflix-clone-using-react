import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { firebaseAuth } from '../utils/firebase-config'



export default function TopNav({ isScrolled }) {

    const navLinks = [
        { name: "Home", link: "/" },
        { name: "TV Show", link: "/tv" },
        { name: "My List", link: "/mylist" },
        { name: "Movies", link: "/movies" },
    ]

    const navigate = useNavigate()

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) navigate('/login')
    })

    return (
        <NavContainer>
            <nav className={` navbar navbar-expand-lg ${isScrolled ? "scrolled" : "notScrolled"}`}>
                <div class="container-fluid">
                    <div className="leftSide">

                    <a class="navbar-brand logo" href="#"><img src="https://res.cloudinary.com/ehizeex-shop/image/upload/v1668265433/NetflixApp/2560px-Netflix_2015_logo.svg_rbicwl_knwp6f.png" alt="logo" /></a>
                    </div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon bg-danger"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 links">
                        
                        {
                            navLinks.map(({ name, link }) => {
                                return (
                                    <li key={name} class="nav-item">
                                        <Link to={link}>{name}</Link>
                                    </li>
                                )
                            })
                        }
                   
                            
                        </ul>
                        <button class="btn btn-danger rightSide" onClick={() => signOut(firebaseAuth)} type="submit">Logout</button>

                    </div>
                </div>
            </nav>
        </NavContainer>
    )
}

const NavContainer = styled.div`
    .notScrolled{
        display: flex;
    }
    .scrolled{
        display: flex;
        background-color: black;
    }
    nav{
        position: sticky;
        top: 0;
        height: 6rem;
        width: 100%;
        justify-content: space-between;
        position: fixed;
        z-index: 2;
        padding: 0.4rem;
        align-items: center;
        transition: 0.3s ease-in-out;
color: white;

        .leftSide{
            display: flex;
            align-items: center;
            gap: 2rem;
            margin-left: 2rem;
            margin-right: 2rem;
        
        .logo{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        img{
            width: 10rem;
            height: 2rem;
        }
    }
    .links{
        display: flex;
        list-style-type: none;
        gap: 3rem;
        li{
            a{
                color: white;
                text-decoration: none;
            }
        }
    }
    }
    .rightSide{
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-right: 2rem;
        button{
            background-color: red;
            border: none;
            cursor: pointer;
            border-radius: 50%;
        } &focus{
            outline: none;
        }svg{
            color: white;
            font-size: 2rem;
        }
    }
    @media (max-width: 768px) {
    nav {
      flex-direction: column;
      height: auto;
      padding: 1rem;
      .leftSide {
        margin-left: 0;
        .logo {
          margin-bottom: 1rem;
        }
        .links {
          flex-direction: column;
          gap: 1rem;
          li {
            a {
              font-size: 1.2rem;
            }
          }
        }
      }
      .rightSide {
        margin-right: 0;
      }
    }
  }
`
