
import React from "react";

function Navbar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Stake n Reward
          </a>
        </div>
            <i className="fa fa-align-right text-white d-flex w-100" aria-hidden="true">
              
              Account No.{props.state}</i>
      </nav>
    </div>
  );
}

export default Navbar;
