import React, { useEffect, useState } from "react";
import { CubeSpinner } from "react-spinners-kit";
import Navbar from "./Widgets/Navbar";
// import { render } from "react-dom";
import "./App.css";
import Web3 from "web3";
import Tether from "../truffle_abis/Tether.json";
import RWD from "../truffle_abis/RWD.json";
import DecentralBank from "../truffle_abis/DecentralBank.json";
import Main from "./Main";
import ToWeiConvert from "../utils/ToWeiConvert";

function App() {
  // const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadWallet, setLoadWallet] = useState(false);
  const [state, setState] = useState({});
  const state2 = {
    account: "0x0",
    tether: {},
    rwd: {},
    decentralBank: {},
    tetherBalance: 0,
    rwdBalance: 0,
    stakingBalance: 0,
    tetherName: "",
    tetherAddress: "",
    rwdAddress: "",
  };
  useEffect(() => {
    let flag=0;
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      flag=1;
    } else if (window.web3) {
      window.web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    } else {
      window.alert("Please install MetaMask");
    }

    const web3 = window.web3;
    if(flag===1){web3.eth.getAccounts().then(async (accounts) => {
      const networkId = await web3.eth.net.getId();

      //load Tether contract
      const tetherData = Tether.networks[networkId];
      console.log(tetherData);
      const rwdData = RWD.networks[networkId];
      const decentralBankData = DecentralBank.networks[networkId];
      state2.tetherAddress = tetherData.address;
      state2.rwdAddress = rwdData.address;
      const tether = new web3.eth.Contract(Tether.abi, tetherData.address);

      const rwd = new web3.eth.Contract(RWD.abi, rwdData.address);

      const decentralBank = new web3.eth.Contract(
        DecentralBank.abi,
        decentralBankData.address
      );

      if (tetherData && rwdData && decentralBankData) {
        state2.account = accounts[0];
        await tether.methods
          .balanceOf(accounts[0])
          .call()
          .then(async (res) => (state2.tetherBalance = res))
          .then(async () => {
            await tether.methods
              .symbol()
              .call()
              .then((res) => (state2.tetherName = res));
          }) //state2.tetherBalance = res
          .then(async () => {
            await rwd.methods
              .balanceOf(accounts[0])
              .call()
              .then(async (res) => (state2.rwdBalance = res)); //state2.rwdBalance = res
            await decentralBank.methods
              .StakingBalances(accounts[0])
              .call()
              .then(async (res) => (state2.stakingBalance = res)); //state2.stakingBalance = res
          })
          .catch((err) => console.log(err))
          .finally(() => {
            state2.tether = tether;
            state2.rwd = rwd;
            state2.decentralBank = decentralBank; //state2.tether = tether, state2.rwd = rwd, state2.decentralBank = decentralBank
            setState({ ...state, ...state2 });
            setLoading(false); //state2.loading = false
          });
      } else {
        alert("contract not found on this network");
      }
      //load Reward contract
      //load DecentralBank contract
    });}
  }, []);
  // two function one that stakes and one that unstakes -
  // leverage our decentralBank contract - deposit tokens and unstaking
  // ALL Of This is for the staking:
  // depositTokens transferFrom
  // function approve transaction hash
  // STAKING FUNCTION ?? >> decentralBank.depositTokens (send transactionHash =>)

  const stakeToken = async (amount) => {
    setLoading(true);
    state.tether.methods
      .approve(state.decentralBank._address, ToWeiConvert(amount))
      .send({ from: state.account })
      .on("transactionHash", (hash) => {
        state.decentralBank.methods
          .depositTokens(ToWeiConvert(amount))
          .send({ from: state.account })
          .on("transactionHash", (hash) => {
            setLoading(false);
          });
      });
  };
  const unstakeToken = async () => {
    setLoading(true);
    state.decentralBank.methods
      .unstakeTokens()
      .send({ from: state.account })
      .on("transactionHash", (hash) => {
        setLoading(false);
      });
  };
  return (
    <>
      {loading ? (
        <div className="LoadingClass">
        <CubeSpinner size={30} color="#686769" loading={state.loading} />
        </div>
      ) : (
        <div>
          <Navbar state={state} />
          <div className="container-fluid mt-5">
            <div className="row">
              <main role="main" className="col-md-12 ml-sm-auto col-lg-12 px-4">
                <Main
                  state={state}
                  unstakeToken={unstakeToken}
                  stakeToken={stakeToken}
                  StakingTokenAddress ={state.tetherAddress}
                  rewardTokenAddress ={state.rwdAddress}
                />
              </main>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
