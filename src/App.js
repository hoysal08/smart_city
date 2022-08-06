import { Fragment } from 'react';
import React, { Component } from 'react';
import './App.css';
import Home_page from './Home_page';
import Nav_bar from './Nav_bar';
import Registration_page from './Registration_page';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const [authuser,setauthuser] = useState(false);

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText('Wallet Connected');
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log('Need to install MetaMask');
      setErrorMessage('Please install MetaMask browser extension to interact');
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
  };

  return (
    <BrowserRouter>
      <Container className="mt-3">
        <Nav_bar
          connectbutton={connButtonText}
          defaultaccount={defaultAccount}
          connectwallet={connectWalletHandler}
          authuser={authuser}
        />
        <Routes>
          <Route path="/" element={<Home_page />} />
          <Route path="/registration" element={<Registration_page />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
