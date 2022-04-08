// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

//The contract allows only its creator to create new coins(different issuance schemes are possible).

// Anyone can send coins to each other without a need for registering with a username and password, all you need is an Ethereum keypair.

contract Coin {
    address public minter;
    mapping(address => uint256) public balances;

    event Sent(address from, address to, uint256 amount);

    constructor() {
        minter = msg.sender;
    }

    modifier onlyMinter() {
        require(msg.sender == minter);
        _;
    }

    //make a new coins and send them to an address only the owner can send these coins
    function mint(address to, uint256 amount) public onlyMinter {
        balances[to] += amount;
    }

    error insufficientFunds(uint256 requested, uint256 available);

    //send any amount of coins to an exisitng address
    function send(address receiver, uint256 amount) public {
        if (amount > balances[msg.sender]) 
        revert insufficientFunds(amount, balances[msg.sender]);

        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
