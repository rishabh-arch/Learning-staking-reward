import React,{useState} from "react";
import Airdrop from "./Airdrop";

function Main({state,stakeToken,unstakeToken}) {
  const [stake, setStake] = useState(0);
  return (
    <div id="content" className="mt-3">
      {/* create a table and body */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Staking Reward </th>
            <th scope="col">Reward Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{window.web3.utils.fromWei(`${state.stakingBalance}`,"Ether")} USDT</td>
            <td>{window.web3.utils.fromWei(state.rwdBalance,"Ether")} RWD</td>
          </tr>
        </tbody>
      </table>

      {/* stake tokens and balance label */}
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="stake">Stake (Balance - {window.web3.utils.fromWei(`${state.tetherBalance}`,"Ether")} USDT)</label>
            
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

    <Airdrop/>

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
