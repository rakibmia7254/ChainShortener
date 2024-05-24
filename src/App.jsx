import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css';

const contractAddress = "0x0e8472C785Bf6B329123aA5b35a61E077828d943";
const abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "short", "type": "string" }], "name": "redirect", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "short", "type": "string" }, { "internalType": "string", "name": "full", "type": "string" }], "name": "shortenURL", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [networkError, setNetworkError] = useState('');
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [retrievedUrl, setRetrievedUrl] = useState('');

  useEffect(() => {
    const checkNetwork = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        const chainId = await web3Instance.eth.getChainId();
        if (chainId !== 97) {
          setNetworkError('Please connect to the Binance Smart Chain testnet (Chain ID 97).');
        } else {
          setNetworkError('');
        }
      } else {
        console.log('Please install MetaMask!');
      }
    };

    checkNetwork();
  }, []);
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        web3Instance.eth.net.isListening()
          .then(() => setAccount(accounts[0]))
          .catch(e => console.log('Wow. Something went wrong: ' + e));
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3Instance.eth.getAccounts();
        const chainId = await web3Instance.eth.getChainId();

        if (chainId !== 97) {
          setNetworkError('Please connect to the Binance Smart Chain testnet (Chain ID 97).');
        } else {
          setNetworkError('');
          const contractInstance = new web3Instance.eth.Contract(abi, contractAddress);
          setWeb3(web3Instance);
          setContract(contractInstance);
          setAccount(accounts[0]);
        }
      } catch (error) {
        console.error('Error connecting to MetaMask', error);
      }
    } else {
      console.log('Please install MetaMask!');
    }
  };

  const handleShorten = async (e) => {
    e.preventDefault();
    if (!contract) return;

    try {
      await contract.methods.setShortUrl(shortUrl, longUrl).send({ from: account });
      alert('URL shortened successfully!');
    } catch (error) {
      console.error(error);
      alert('Error shortening URL');
    }
  };

  const handleRetrieve = async (e) => {
    e.preventDefault();
    if (!contract) return;

    try {
      const url = await contract.methods.getLongUrl(shortUrl).call();
      setRetrievedUrl(url);
    } catch (error) {
      console.error(error);
      alert('Error retrieving URL');
    }
  };

  return (
    <div className="App">
      <h1>Web3 URL Shortener</h1>
      {account ? (
        <>
          <p>Connected account: {account}</p>
          {networkError && <p className="error">{networkError}</p>}
          <form onSubmit={handleShorten}>
            <input
              type="text"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="Enter long URL"
            />
            <input
              type="text"
              value={shortUrl}
              onChange={(e) => setShortUrl(e.target.value)}
              placeholder="Enter short URL"
            />
            <button type="submit">Shorten</button>
          </form>
          <form onSubmit={handleRetrieve}>
            <input
              type="text"
              value={shortUrl}
              onChange={(e) => setShortUrl(e.target.value)}
              placeholder="Enter short URL to retrieve"
            />
            <button type="submit">Retrieve</button>
          </form>
          {retrievedUrl && (
            <div>
              <p>Long URL: {retrievedUrl}</p>
            </div>
          )}
        </>
      ) : (
        <>
          <button onClick={connectWallet}>Connect Wallet</button>
          {networkError && <p className="error">{networkError}</p>}
        </>
      )}
    </div>
  );
}

export default App;

