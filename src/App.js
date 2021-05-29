import './App.css';
import styled, {  createGlobalStyle } from 'styled-components';
import React from 'react';
import Main from './components/Main';

function App() {
  return (
    <>
    <GlobalStyle />
      <Container>
        <LogoImg src='/imgs/logo.png' alt='logo'/>
        <Main />
      </Container>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    display:flex;
  }
`;

const Container = styled.div`
  width:100vw;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
`;

const LogoImg = styled.img`
  width: 20%;
  height: 20%;
`;
export default App;
