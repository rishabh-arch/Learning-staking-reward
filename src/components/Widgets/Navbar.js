
import React from "react";

function Navbar({state}) {
  
  return (
    <div>
      {/* {console.log(props.state)} */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Stake n Reward
          </a>
        </div>
            <i className="fa fa-align-right text-white d-flex w-100" aria-hidden="true">
              
              Account No.{state.account}</i>
      </nav>
    </div>
  );
}

export default Navbar;
