import React from 'react'
import { CarouselPage } from './src/App'
import styled from 'styled-components'
const MainDiv = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  z-index: 0;
  .react-multi-carousel__arrow{
    z-index: 0;
  }
`
const EquipmentsTitle = styled.div`
    text-align: center;
    font-size: 35px;
    font-weight: bold;
    color: #4eafe4;
    position: relative;
    top: 30px;
`
export const Chapter = () => {
    return (
        <>
            <MainDiv >
              <EquipmentsTitle>DOCTORS</EquipmentsTitle>
                <CarouselPage/>
            </MainDiv>
        </>
    )
}
