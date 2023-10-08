import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {AiOutlineIntoCircle} from 'react-icons/ai'
import {FaPlay} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import TopNav from '../component/TopNav'
import Card from '../component/Card'
import {useDispatch, useSelector} from 'react-redux'
import { fetchMovies, getGenres } from '../store/Index'
import SliderContainer from '../component/SliderContainer'

export default function Netflix() {

  const [isScrolled, setIsScrolled] = useState(false)

  const navigate = useNavigate()

  const movies = useSelector((state)=> state.netflix.movies)

  const generesLoaded = useSelector((state)=>state.netflix.generesLoaded)

  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(getGenres())
  }, [])
  useEffect(()=>{
    if(generesLoaded){
      dispatch(fetchMovies({type: "all"}))
    }
  })

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null)
  }
  // here we listened the onscroll event, if teh scrollY is 0 then it return false, and if it is not 0 or we have scolled a little bit it will return true
  // console.log(movies)
  return (
    <HeroContainer>

      <div className='hero'>
        <TopNav isScrolled={isScrolled} />
        {/* here we have passed the props to TopNav */}
        <img className='background-image' src="https://res.cloudinary.com/ehizeex-shop/image/upload/v1668267540/NetflixApp/avengers-age-of-ultron-team-together-poster-wallpaper-1600x600-92751_84_qvwbif.jpg" alt="no internet available" />
        <div className="container">
          <div className="title">
            <h1>Super man</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit repellat in minima reiciendis atque consequuntur. Sed iste nisi, nulla optio amet ipsa, maxime eos suscipit facere sequi harum cupiditate, cum placeat dolore.</p>
          </div>
          <div className="buttons">
            <button onClick={()=>navigate('/player')} className="playBtn">Play</button>
            <button className="moreBtn">More</button>
          </div>
        </div>


      </div>
      <SliderContainer movies={movies}/>
    </HeroContainer>
  )
}

const HeroContainer = styled.div`
  .hero{
    position: relative;
    .background-image{
      filter: brightness(40%);
    }
    img{
      height: 70vh;
      width: 100%;
    }
    .container{
      position: absolute;
      bottom: 1rem;
      .title{
        h1{
          margin-left: 5rem;
          text-transform: uppercase;
          font-size: 73px;
          background: -webkit-linear-gradient(#eee, rgb(128, 13, 13));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        p{
          margin-bottom: -50px;
          width: 640px;
          margin-left: 5rem;
          font-family: "lexend Deca", sans-serif;
          color: white;
        }
      }
      .buttons{
        display: flex;
        margin: 5rem;
        gap: 2rem;
      }
      .playBtn{
        display: flex;
        align-items: center;
        justify-content: center;
        color: red;
        border-radius: 1rem;
        font-size: 1.4rem;
        gap: 1rem;
        padding: 0.9rem;
        padding-left: 2rem;
        padding-right: 2.4rem;
        border: none;
        cursor: pointer;
      }
      .moreBtn{
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        background-color: black;
        border-radius: 1rem;
        font-size: 1.4rem;
        gap: 1rem;
        padding: 0.9rem;
        padding-left: 2rem;
        padding-right: 2.4rem;
        border: 0.1rem solid white;
        cursor: pointer;
      }
    }
  }
  @media (max-width: 768px) {
  .hero {
    img {
      height: 70vh;
      width: 100%;
    }
    
    .container .title h1 {
      font-size: 36px;
      text-transform: uppercase;
          /* font-size: 73px; */
          background: -webkit-linear-gradient(#eee, rgb(128, 13, 13));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-left: 0px;
    }

    .container .title p {
      font-size: 16px;
      margin-left: 0px;
     
    }

    .container .buttons {
      /* flex-direction: column; */
      gap: 1rem;
      /* margin: 2rem 0; */
    }

    .container .playBtn,
    .container .moreBtn {
      padding: 0.5rem 1rem;
      font-size: 1rem;
    }
  }
}
`