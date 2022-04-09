// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Tether {
    string public name = "Tether";
    string public symbol = "USDT";
    uint public decimals = 18;
    uint public totalSupply = 1000000000000000000000000; // 1 million tokens = 18+6 zeros
}