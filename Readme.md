# Welcome to the learning Days project

## Environment Setup -

1. - Install dependencies:
        - 1.1. Install Node.js

### To run the command `on solidity project root folder`

```
$ npm i -g @remix-projects/remixd
$ remixd -s . 
```

2. - Now go to browser and type:
        - 2.1. <https://remix.ethereum.org>
3. - You should see the following:
        - 3.1. Workspace
        - 3.2. now connect to localhost
        - 3.3. You can now start your project
4. - Do the project side by side
        - 4.1 Edit and creating contracts on Vs code
        - 4.2. compiling and testing on remix
5. - That's it

## At Main branch

- [Solidity by Examples(Very Important)](https://solidity-by-example.org/)

- [Solidity 0.8 (Smart Contract Programmer)](https://www.youtube.com/watch?v=xv9OmztShIw&list=PLO5VPQH6OWdVQwpQfw9rZ67O6Pjfo6q-p)

- [Block and Transaction Properties](https://dev.to/gbengelebs/introduction-to-solidity-228c)

- I made an example of grandfather Fortune contract.

## At Day2 branch

The contract allows only its creator to create new coins(different issuance schemes are possible).

Anyone can send coins to each other without a need for registering with a username and password, all you need is an Ethereum keypair.

### I am going to build a basic token contract

- [reference from YouTube channel](https://www.youtube.com/watch?v=chdYNPCC8ck&list=PLzb46hGUzitDd39YzB1YvZqeIXXtmBrHX&index=13)

## At Day3 branch

### Part 1

- so I have to clone git from a YouTube channel reference
- git clone [https://github.com/01Clarian/defi-staking-app-starter.git](https://github.com/01Clarian/defi-staking-app-starter.git) ,  
But you don't need to if you don't want to start configuring the project.
- Then `Npm i` to install all the dependencies
- Then I add some folders inside src -> components,contracts,truffle_abis
- root->migrations->1_initial_migrations.js
- after this i have to create truffle-config.js file inside root and add some configs

### Part 2

- Now I am going to make ERC20 token
- so first create solidity file in src/contracts folder named Tether.sol
- Now again go to migration folder make new JS file name 2_deploy_contract.js
- start writing codes in a file and also there are two more solidity file `RWD-> reward token and DecentralBank->staking` 
- [YouTube Channel Reference](youtube.com/watch?v=xDNymfgty5c&list=PLzb46hGUzitDd39YzB1YvZqeIXXtmBrHX&index=20) having a great tutorial for ERC20 token
- so after completing the coding part
- I am writing some terminal code for remembering How I Test & deployed my contracts
- remember one thing, Use Ganache for Development mode
- `1 ETH = 1^18 WEI`
```
$ truffle console
$ compile
$ migrate --reset
$ tether = await Tether.deployed()
$ tether.name()

$ accounts = await web3.eth.getAccounts()
$ accounts[1]
$ balance = await tether.balanceOf(accounts[1])
$ balance.toString()
$ convertBalance = web3.utils.fromWei(balance)
```