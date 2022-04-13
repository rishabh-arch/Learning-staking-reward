// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    RWD public rwd;
    Tether public tether;

    address[] public stakers;

    mapping(address => uint256) public StakingBalances;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaked;

    constructor(RWD _rwd, Tether _tether) {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }

    function depositTokens(uint256 amount) public {
        require(amount > 0, "Amount must be greater than 0");
        //transfer tether tokens to this contract address for staking
        tether.transferFrom(msg.sender, address(this), amount);

        //update staking balances
        StakingBalances[msg.sender] = StakingBalances[msg.sender] + amount;
        if (!hasStaked[msg.sender]) {
            // hasStaked[msg.sender] = true;
            stakers.push(msg.sender);
        }
        hasStaked[msg.sender] = true;
        isStaked[msg.sender] = true;
    }

    //issue rewards to stakers
    function issueTokens() public {
        //require the owner to issue tokens only
        require(msg.sender == owner, "Only the owner can issue tokens");
        //iterate through stakers
        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = StakingBalances[recipient] / 9;
            //check if staker has staked tokens
            if (balance > 0) {
                //issue tokens to staker
                rwd.transfer(recipient, balance);
                //remove staker from staking
                hasStaked[stakers[i]] = false;
                isStaked[stakers[i]] = false;
                //remove staker from staking array
                // stakers.remove(i);
            }
        }
    }

    //unstake tokens
    function unstakeTokens() public {
        uint256 amount = StakingBalances[msg.sender];
        require(amount > 0, "Amount must be greater than 0");
        //check if staker has staked tokens
        require(
            hasStaked[msg.sender],
            "You must stake tokens before you can unstake them"
        );
        //check if staker has enough tokens to unstake
        require(
            StakingBalances[msg.sender] >= amount,
            "You do not have enough tokens to unstake"
        );

        //transfer the tokens to the specified contract address from our bank
        tether.transfer(msg.sender, amount);
        //reset staking balances
        StakingBalances[msg.sender] = 0;

        //update staking status
        // hasStaked[msg.sender] = false;

        isStaked[msg.sender] = false; 
        // if(StakingBalances[msg.sender] == 0){
        //     hasStaked[msg.sender] = false;
        //     isStaked[msg.sender] = false;
        // }
    }
}
