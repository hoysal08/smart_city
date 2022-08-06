import { Fragment, useEffect } from 'react';
import React, { Component } from 'react';
import './App.css';
import Home_page from './Home_page';
import Nav_bar from './Nav_bar';
import Registration_page from './Registration_page';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import Certificate from './Certificate';
import ABI from "./contracts/pollution.json"
import { ethers } from "ethers";


function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const [authuser,setauthuser] = useState(false);
  const[authaddress,setauthaddress] = useState([])

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

  // useEffect( async ()=>{

  //   const cntadd= "0x0a0C48B0d7c7c7C3469cA5Ee5D82B6e9049d40ba"
  //   const provider=new ethers.providers.Web3Provider(window.ethereum);
  //   const signer=provider.getSigner();
  //    const cnt = new ethers.Contract(cntadd,ABI,signer);
  //    let arr=await cnt.getAuthorisedAddr();
  //    console.log(arr);

  // })

  useEffect(()=>{
      const cntadd= "0x0a0C48B0d7c7c7C3469cA5Ee5D82B6e9049d40ba"
      const provider=new ethers.providers.Web3Provider(window.ethereum);
      const signer=provider.getSigner();
      const cnt = new ethers.Contract(cntadd,ABI,signer);



  })

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
          <Route path="/certificate" element={<Certificate />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
