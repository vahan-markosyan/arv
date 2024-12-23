import styled from "styled-components";
import { Link } from "react-router-dom";
export const MainDiv = styled.div`
  padding: 50px;
  @media (max-width: 700px) {
    padding: 5px;
  }
`;

export const ServiceTitle = styled.div`
  text-align: center;
  font-size: 35px;
  font-weight: bold;
  color: #4eafe4;
  margin-top: 30px;
`;

export const ServicesDiv = styled.div`
  padding: 50px;
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  min-height: 200px;
  @media (max-width: 700px) {
    padding: 5px;
  }
`;

export const ItemsDiv = styled(Link)`
  width: 400px;
  height: 400px;
  background-image: url(${({ img }) => `http://localhost:3000/uploads/${img}`});
  background-size: cover;
  background-position: center;
  transition: 0.3s;
  cursor: pointer;
  box-shadow: 0px 0px 53px 1px rgba(0, 0, 0, 0.51) inset;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  text-decoration: none;
  backdrop-filter: blur(2px); /* Adjust the blur value */
  border-radius:20px;
  /* Blur effect */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(2px); /* Adjust the blur value */
    filter: blur(2px); /* Fallback for older browsers */
    z-index: 0;
  }

  @media (max-width: 700px) {
    width: 90vw;
    height: 90vw;
  }

`;

export const ServiceTitle2 = styled.div`
  font-weight: bold;
  position: relative;
  color: #4eafe4;
  font-size: 28px;
  text-align: center;
  z-index: 1; 
`;
