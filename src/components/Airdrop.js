import React, { useEffect, useState } from "react";

function Airdrop() {
  //Airdrop to have a timer that counts down
  //initialize the countdown after our customers have staked a certain amount of tokens
  //timer functionality,countdown,startTimer,state - for time to work..
  const [state, setState] = useState({ time: {}, seconds: 20 });
  let timer=0;

  const startTimer = () => {
    timer = setInterval(() => {
      setState({
        time: {
          ...state.time,
          seconds: state.seconds - 1,
        },
      });
    }, 1000);
  };
  
  const countDown = () => {
    setState({
      time: {
        ...state.time,
        seconds: state.seconds - 1,
      },
    });

  };
  // this.startTimer = startTimer.bind(this);
  // this.countDown = this.countDown.bind(this);
  
  const secondsToTime = (secs) => {
    let hours = Math.floor(secs / (60 * 60));
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);
    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  };

  useEffect(() => {
    let timeLeftVar = secondsToTime(state.seconds);
    setState({ ...state, time: timeLeftVar });
  }, [state.seconds]);

  return (
    <div>
      <div className="card text-center">
        <div className="card-body">
          <h4 className="card-title">AIRDROP -{state.time.m}:{state.time.s} </h4>
        </div>
      </div>
    </div>
  );
}

export default Airdrop;
