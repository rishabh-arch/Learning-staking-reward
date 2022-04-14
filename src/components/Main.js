import React from "react";

function Main() {
  return (
    <div id="content" className="mt-3">
      {/* create a table and body */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Staking Reward</th>
            <th scope="col">Reward Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>USDT</td>
            <td>RWD</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Main;
