
import styled from "styled-components";

export const MainDiv = styled.div`
  width: 100%;
  height: 65vh;
  display: flex;
  flex-wrap: wrap;
  background-color: #f9f9f9;
  font-family: 'Arial', sans-serif;
      @media(max-width:768px){
    height: 100vh;
  }
`;

export const Halfs = styled.div`
  width: 50%;
  height: auto;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  @media (max-width: 768px) {
    width: 100%;
    border: none;
    padding: 10px;
  }
`;

export const TableHeader = styled.div`
  width: 100%;
  height: 50px;
  border: 1px solid #ddd;
  display: flex;
  background-color: #f0f0f0;
  color: #333;
  font-weight: bold;
`;

export const DataDiv = styled.div`
  width: 25%;
  height: 50px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  word-wrap: break-word;
  padding: 5px;
  font-size: 13px;
`;

export const OneAuthMain = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  background-color: ${({ selected }) => (selected ? '#4eafe4' : '#ffffff')};
  color: ${({ selected }) => (selected ? '#ffffff' : '#333')};

  &:hover {
    background-color: #4eafe4;
    color: #ffffff;
    transform: scale(1.02);
  }

  & > div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const UserInfoDiv = styled.div`
  width: 100%;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: Arial, sans-serif;
  color: #333;
  word-wrap: break-word;
  line-height: 1.5;
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const InputSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;

  textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
  height: 200px;
  vertical-align: top;
  resize: none; /* Optional: Prevents resizing */
  &:focus {
    outline: none;
    border-color: #4eafe4;
    box-shadow: 0 0 5px rgba(78, 175, 228, 0.5);
  }
}

  button {
    padding: 12px 25px;
    border: none;
    border-radius: 5px;
    background-color: #4eafe4;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;

    &:hover {
      background-color: #357ab8;
      transform: scale(1.01);
    }
  }

  @media (max-width: 768px) {
    input {
      font-size: 0.9rem;
    }

    button {
      font-size: 0.9rem;
    }
  }
`;
