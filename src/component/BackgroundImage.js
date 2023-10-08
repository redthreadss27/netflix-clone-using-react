import React from 'react'
import styled from 'styled-components'

const BackgroundContainer = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  img {
    height: 100vh;
    width: 100vw;
    object-fit: cover;
  }
`

export default function BackgroundImage() {
  return (
    <BackgroundContainer>
      <img src='https://res.cloudinary.com/ehizeex-shop/image/upload/v1668265236/NetflixApp/netflix-reuse-official_ntcjl2_wtrhhh.jpg' alt='no internet connection.' />
    </BackgroundContainer>
  )
}
