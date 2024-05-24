ChainShortener
==============

ChainShortener is a decentralized URL shortener built on the Binance Smart Chain testnet (Chain ID 97). It leverages smart contracts to store and retrieve shortened URLs securely on the blockchain.

Features
--------

*   Shorten long URLs and store them on the blockchain.
*   Retrieve long URLs using the shortened version.
*   Connect your MetaMask wallet to interact with the dApp.
*   Check if the connected network is the Binance Smart Chain testnet (Chain ID 97).

Prerequisites
-------------

*   Node.js
*   MetaMask extension installed in your browser

Getting Started
---------------

### 1\. Clone the repository

    git clone https://github.com/your-username/chainshortener.git cd chainshortener
    
  

### 2\. Install dependencies

    npm install
    
  

### 3\. Configuration

  Change your deployed `contractAddress` in `App.jsx` thats it
    
  

### 4\. Run the development server

    npm start
    
  

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Deploying the React App
-----------------------

### 1\. Install GitHub Pages package

    npm install gh-pages --save-dev
    
  

### 2\. Add the following scripts to your package.json

    "scripts": {   "predeploy": "npm run build",   "deploy": "gh-pages -d build" }
    
  

### 3\. Deploy the app

    npm run deploy
    
  

Project Structure
-----------------

    chainshortener/ 
    ├── public/ 
    ├── src/ 
    │   ├── App.js 
    │   ├── App.css 
    │   ├── index.js 
    │   └── ... 
    ├── package.json 
    └── ...
    
  

Smart Contract
--------------

The smart contract for ChainShortener is written in Solidity. Make sure to deploy it on the Binance Smart Chain testnet (Chain ID 97) and update the contract address in the .env file.

Contributing
------------

Contributions are welcome! Please fork the repository and create a pull request with your changes.

License
-------

This project is licensed under the [MIT License](License).

Contact
-------

If you have any questions or suggestions, feel free to open an issue or contact me at rakib4ggp@gmail.com.
