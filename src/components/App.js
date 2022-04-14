import React, { useEffect, useState } from "react";
import Navbar from "./Widgets/Navbar";
// import { render } from "react-dom";
import "./App.css";
import Web3 from "web3";
import Tether from "../truffle_abis/Tether.json";
import RWD from "../truffle_abis/RWD.json";
import DecentralBank from "../truffle_abis/DecentralBank.json";

function App() {
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(true);
  const state = {
    account: "0x0",
    tether: {},
    rwd: {},
    decentralBank: {},
    tetherBalance: 0,
    rwdBalance: 0,
    stakingBalance: 0,
  };

  useEffect(() => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    } else {
      window.alert("Please install MetaMask");
    }

    const web3 = window.web3;
    web3.eth.getAccounts().then(async (accounts) => {
      state.account = accounts[0];
      setAccount(accounts[0]);
      const networkId = await web3.eth.net.getId();

      //load Tether contract
      const tetherData = Tether.networks[networkId];
      if (tetherData) {
        const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
        state.tether = tether;
        const tetherBalance = await tether.methods
          .balanceOf(state.account)
          .call();

        state.tetherBalance = tetherBalance;
        console.log(tetherBalance);

      } else {
        alert("Tether contract not found on this network");
      }
      //load Reward contract
      const rwdData = RWD.networks[networkId];
      if (rwdData) {
        const rwd = new web3.eth.Contract(RWD.abi, rwdData.address);
        state.rwd = rwd;
        const rwdBalance = await rwd.methods.balanceOf(state.account).call();

        state.rwdBalance = rwdBalance;
        console.log(rwdBalance);
      } else {
        alert("Reward contract not found on this network");
      }
      //load DecentralBank contract
      const decentralBankData = DecentralBank.networks[networkId];
      if (decentralBankData) {
        const decentralBank = new web3.eth.Contract(RWD.abi, rwdData.address);
        state.decentralBank = decentralBank;
        const stakingBalance = await decentralBank.methods.balanceOf(state.account).call();

        state.stakingBalance = stakingBalance.toString();
        console.log(stakingBalance);
      } else {
        alert("DecentralBank contract not found on this network");
      }
      // const tetherData = Tether.
      setLoading(false);
    });
    
  }, []);

  return (
    <div>
      <Navbar state={account} />
      {console.log(loading)}
    </div>
  );
}

export default App;
