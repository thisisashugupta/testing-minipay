"use client"

import { useState } from 'react';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { web3State, contractState } from '../recoil/atoms';
import Web3 from 'web3';
import  { aceloContractAddress, contractABI } from '../../contracts/contractAddress';
const contractAddress = aceloContractAddress;

// Import web3.js or ethers.js for interacting with the smart contract.
// Define the address and ABI of the Storage smart contract.
// Create a web3 instance.
// Create a contract instance.
// Read the 'retrieve' function from the smart contract.
// Call the function to read from the smart contract.

export default function Test3() {

    // const web3 = useRecoilValue(web3State);
    // const contract = useRecoilValue(contractState);
    
    const [favnum, setFavnum] = useState(0);
    const [errorLog, setErrorLog] = useState(null);
    const [logs, setLogs] = useState(["0"]);

    async function addNum() {
        try {
            if (window.ethereum) {
                // get accounts
                window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(async () => {
                    const web3Instance = new Web3(window.ethereum);
                    const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
                    const accounts = await web3Instance.eth.getAccounts();
                    // const accounts = await web3.eth.getAccounts();
                    console.log("accounts", accounts);
                    // contractInstance.methods.store(favnum).send({ from: accounts[0] })
                    contract.methods.store(favnum).send({ from: accounts[0] })
                    .on('transactionHash', (hash) => {
                        console.log('Transaction hash:', hash);
                        setLogs([...logs, hash]);
                    })
                    .on('receipt', (receipt) => {
                        console.log('Transaction successful:', receipt);
                        setLogs([...logs, receipt]);
                    })
                    .on('error', (error) => {
                        console.error('Error:', error);
                    });
                })
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function handleClick() {

        async function readStorage() {
            try {
                const web3Instance = new Web3(window.ethereum);
                const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
                if (!web3Instance || !contractInstance) {
                    console.log("null hai");
                    
                    return;
                }
                const result = await contractInstance.methods.retrieve().call();
                console.log('Value in Storage contract:', result);
                setFavnum(result);
                setErrorLog(null);
            } catch (error) {
                console.error('Error reading from Storage contract:', error);
                setErrorLog(error);
            }
        }

        if (window.ethereum) {
            readStorage();
        }
    }

    return (
    <>
    <div>Hello from /test route</div>
    <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>Click to fecth number</button>
    </div>
    <div>{`${favnum}`}</div>
    <div>{`${errorLog}`}</div>
    <div>
        <input type="text" name="favnum" onChange={(e) => {setFavnum(e.target.value)}} />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addNum}>Click to add favnum</button>
    </div>
    </>
    );
}