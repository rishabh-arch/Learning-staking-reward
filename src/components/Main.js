import React,{useEffect, useState} from "react";
import Airdrop from "./Airdrop";

function Main({state,rewardTokenAddress,stakeToken,unstakeToken,StakingTokenAddress}) {

  // const TetherName = ()=>  ;

  const [stake, setStake] = useState(0);
  // const [tetherName, setTetherName] = useState("");
  // useEffect(() => {
  //   setTetherName(async()=>await state.tether.methods.symbol().call().then(res=>res));
  // }, [state.tether]);

  return (
    <div id="content" className="mt-3">
      {/* create a table and body */}
      <div class="card" style={{backgroundColor:"cadetblue",borderColor:"darkblue"}}>
        
        <div class="card-body">
          <h2>Import these addresses in your wallet first</h2>
          <h4 class="card-title">{state.tetherName} - {StakingTokenAddress}</h4>
          <h4 class="card-title">RWD - {rewardTokenAddress}</h4>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Staking Reward </th>
            <th scope="col">Reward Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{window.web3.utils.fromWei(`${state.stakingBalance}`,"Ether")} {state.tetherName}</td>
            <td>{window.web3.utils.fromWei(state.rwdBalance,"Ether")} RWD</td>
          </tr>
        </tbody>
      </table>

      {/* stake tokens and balance label */}
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="stake">Stake (Balance - {window.web3.utils.fromWei(`${state.tetherBalance}`,"Ether")} {state.tetherName})</label>
            
            <input
              type="number" 
              onChange={(e) =>{ setStake(e.target.value);console.log(e.target.value)}}
              className="form-control"
              id="stake"
              placeholder="0"
            />
          </div>
        </div>
   
        <button type="button" onClick={()=>{stakeToken(stake);}} className="btn btn-primary m-2">Deposit</button>
        <button type="button" onClick={()=>unstakeToken()} className="btn btn-primary m-2">Withdraw</button>
      </div>

    {/* <Airdrop/> */}

      {/* <div className="card">
        <div className="card-body">
          <div className="form-group">
            <label for="">DEPOSIT</label>
            <input
              type="text"
              className="form-control"
              name=""
              id=""
              aria-describedby="helpId"
              placeholder=""
            />
            <label for="">DEPOSIT</label>
            <input
              type="text"
              className="form-control"
              name=""
              id=""
              aria-describedby="helpId"
              placeholder=""
            />
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Main;
