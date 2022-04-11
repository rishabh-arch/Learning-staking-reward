// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Tether {
    string public name = "ReTether";
    string public symbol = "rUSDT";
    uint public decimals = 18;
    uint public totalSupply = 1000000000000000000000000; // 1 million tokens = 18+6 zeros

    event Transfer(address indexed _from, address indexed _to, uint _value);
    event Approval(address indexed _owner, address indexed _spender, uint _value);

    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;


    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }
    function transfer(address _to, uint _value) public returns (bool success) {
        require(_to != address(0));
        require(_value > 0);
        require(balanceOf[msg.sender] >= _value);

        balanceOf[msg.sender] -= _value;   
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    function approve(address _spender, uint _value) public returns (bool success) {
        require(_value > 0);
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    function transferFrom(address _from, address _to, uint _value) public returns (bool success) {
        require(_to != address(0));
        require(_value > 0);
        require(balanceOf[_from] >= _value);
        require(allowance[_from][msg.sender] >= _value);

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

}