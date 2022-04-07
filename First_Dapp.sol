// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract First_Dapp {
    address public owner;
    uint256 public fortune;
    bool public deceased;

    constructor() payable {
        owner = msg.sender; //msg sender represents the owner address of the contract
        fortune = msg.value; //msg value represents the amount of ether sent to the contract
        deceased = false;
    }

    //create modifier onlyOwner that can only be called by the owner
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    //create modifier so that we only allocate funds if friend's gramps is deceased
    modifier mustBeDeceased {
        require(deceased);
        _;
    }
    //list of family wallets
    address payable[] public familyWallets;

    //map through inheritance to get the family wallets
    mapping(address => uint256) public inheritance;

    //set inheritance to each address
    function setInheritance(address payable _address, uint256 amount) public onlyOwner {
        familyWallets.push(_address);
        inheritance[_address] = amount;
    }
    //pay each family member based on their wallet address
    function payout() private mustBeDeceased {
        for (uint256 i = 0; i < familyWallets.length; i++) {
            familyWallets[i].transfer(inheritance[familyWallets[i]]);
        }
    }
    //get the inheritance of the address
    function getInheritance(address _address) public view returns (uint256) {
        return inheritance[_address];
    }

//oracle switch simulation
function hasdeceased() public onlyOwner {
    deceased = true;
    payout();
}

    
}
