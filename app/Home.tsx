"use client"

import Web3 from 'web3';
import React, { useState, useEffect } from 'react';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { web3State, contractState } from './recoil/atoms';
import  { aceloContractAddress as contractAddress, contractABI, bytecode } from '../contracts/contractAddress'
import { useRouter } from 'next/navigation';
import Test3 from './test3/page';
import { CredentialType, IDKitWidget } from '@worldcoin/idkit'
// (contractABI, contractAddress);
// const web3 = new Web3(Web3.givenProvider || process.env.RPC_URL);

export default function Home() {

    // const [web3, setWeb3] = useRecoilState(web3State);
    // const [contract, setContract] = useRecoilState(contractState);

  // const [web3, setWeb3] = useState(null);
  const [connectedToACELO, setConnectedToACELO] = useState(false);
  const [currentNetwork, setCurrentNetwork] = useState(null);
  const [miniPay, setMiniPay] = useState("false");
  // When navigating to another page with data
  const router = useRouter();

  const ALFAJORES_PARAMS = {
    chainId: "0xaef3",
    chainName: "Alfajores Testnet",
    nativeCurrency: { name: "Alfajores Celo", symbol: "A-CELO", decimals: 18 },
    rpcUrls: ["https://alfajores-forno.celo-testnet.org"],
    blockExplorerUrls: ["https://alfajores-blockscout.celo-testnet.org/"],
    iconUrls: ["future"],
  };
  
  const connectACELO = async () => {
    if (window.ethereum) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [ALFAJORES_PARAMS],
      });
    } else {
      window.alert("connect to a wallet first!");
      
    }
  }

  function getWeb3() {
    if (window.ethereum) {

      // get accounts
      window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // web3 instance
      const web3Instance = new Web3(window.ethereum);
      console.log("web3Instance created");
      
      // setWeb3(web3Instance);

      // contract instance
      const storageContract = new web3Instance.eth.Contract(contractABI, contractAddress);
      console.log("storageContractInstance created");
      // setContract(storageContract);
      
      console.log("getWeb3");

      web3Instance.eth.net.getId()
      .then((networkId) => {
        console.log('Connected to network with ID:', networkId);
        setCurrentNetwork(networkId);
      });
      console.log("getConnectedNetwork");

      
      // router.push('/test3');
        // pathname: '/test3',
        // query: { param1: 'web3Instance', param2: 'storageContract' },
        // query: { web3Instance: web3Instance, storageContract: storageContract },
      // });

    }
    else {
      window.alert("get an ethereum wallet");
    }
  }

  
    function getMiniPayStatus() {
        // Ensure MiniPay provider is available
        if (window.ethereum && window.ethereum.isMiniPay) {
            setMiniPay("true");
            console.log("oh no");
        } else {
            console.error("MiniPay provider not detected");
        }
    }

    useEffect(() => {
        getWeb3();
        getMiniPayStatus();
    } , []);

  const onSuccess = () => {
    console.log("onSuccess")
  }

  const handleVerify = () => {
    console.log("handleVerify")
  }

  return (
    <div className='bg-grey-500 h-screen w-screen flex' >
      MiniPay Status: {miniPay}
      { (miniPay == "false") ? (<div>no minipay found</div>) : (<div>oh yes! minipay found</div>) }
      <div>
        {/* {web3 === null ? <>web3 is null</> : <>web3 is set</> } */}
      </div>
      <div>
        {/* {contract === null ? <>courseContract is null</> : <>courseContract is set</> } */}
      </div>
      <div>
        {currentNetwork === null ? <>currentNetworkId is null</> : <>currentNetworkId is {`${currentNetwork}`}</> }
      </div>
      {/* <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={connectACELO}>Connect to ACELO</button>
      </div> */}
      <div>
        {/* <Test3/> */}
        <IDKitWidget
          app_id="app_staging_f76857baa94ac9ef1ec53f86bbecccba" // obtained from the Developer Portal
          action="vote_1" // this is your action name from the Developer Portal
          onSuccess={onSuccess} // callback when the modal is closed
          handleVerify={handleVerify} // optional callback when the proof is received
          credential_types={[CredentialType.Orb, CredentialType.Phone]} // optional, defaults to ['orb']
          enableTelemetry // optional, defaults to false
        >
          {({ open }) => <button onClick={open}>Verify with World ID</button>}
        </IDKitWidget>
      </div>
    </div>
  )
}