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
## At Day4 branch
 I tried testing with `Chai` but failed because i need to paste
 ```
{
    "presets": ["babel-preset-env"]
} 
```
in `.babelrc` in root folder
then run the command in terminal
```
truffle test
```
[Youtube Channel Reference](https://www.youtube.com/watch?v=-am44UmQWjI&list=PLzb46hGUzitDd39YzB1YvZqeIXXtmBrHX&index=18)

### Transfer vs TransferFrom `I got this on reddit`

[Let's take a look at the EIP](https://eips.ethereum.org/EIPS/eip-20)

```
function transfer(address _to, uint256 _value) public returns (bool success)
transferFrom()
```
```
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
```
As you can see, the return is the same (bool), but the parameters on the function call are not. `transferFrom()` requires an additional parameter: `address _from`.

This function `transferFrom()` allows a third-party `who has authorization
isation to spend on your behalf, which is called with approve() function` to send tokens. This opens up some things;

Someone paying for your gas fees to transfer tokens

Someone being able to transfer your tokens `think direct debit`

Contracts, with authorization, can spend your tokens

You've probably encountered this function call `and the terrible UX that comes with it`, then you need to press "Approve"/"Enable" buttons on dapps for token interactions - this is what it is doing.

[explains these two functions](http://www.wealdtech.com/articles/understanding-erc20-token-contracts/) and [talks about using transferFrom](http://www.wealdtech.com/articles/ethereum-smart-service-payment-with-tokens/)

`One More Site` [https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/](https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/),
 

## At Day5 branch

Completing the contracts for staking
[Youtube Channel Reference](youtube.com/watch?v=Cskg8OTyuiA&list=PLzb46hGUzitDd39YzB1YvZqeIXXtmBrHX&index=22)

`Found Some errors while testing but i am not going to debug at this Day`

## At Day6 Branch

### Part 1 - Frontend

ReactJS comes here

### Part 2 - Load Web3 and Blockchain

[Youtube Channel Reference](https://www.youtube.com/watch?v=suxmHQCv3nM&list=PLzb46hGUzitDd39YzB1YvZqeIXXtmBrHX&index=21)

```
const [loading, setLoading] = useState(true);
  const [loadWallet, setLoadWallet] = useState(false);
  const [state, setState] = useState({});
  const state2 ={
    account: "0x0",
    tether: {},
    rwd: {},
    decentralBank: {},
    tetherBalance: 0,
    rwdBalance: 0,
    stakingBalance: 0,
  }
  useEffect(() => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      
    } else if (window.web3) {
      window.web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    } else {
      window.alert("Please install MetaMask");
    }

    const web3 = window.web3;
    web3.eth.getAccounts().then(async (accounts) => {
      setState({ ...state, account: accounts[0] });
      const networkId = await web3.eth.net.getId();

      //load Tether contract
      const tetherData = Tether.networks[networkId];
      const rwdData = RWD.networks[networkId];
      const decentralBankData = DecentralBank.networks[networkId];

      const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
      const rwd = new web3.eth.Contract(RWD.abi, rwdData.address);
      const decentralBank = new web3.eth.Contract(RWD.abi, rwdData.address);

      if (tetherData && rwdData && decentralBankData) {
        state2.account = accounts[0];
        await tether.methods
          .balanceOf(accounts[0])
          .call()
          .then(async (res) => state2.tetherBalance = res)  //state2.tetherBalance = res
          .then(async () => {
            await rwd.methods
              .balanceOf(accounts[0])
              .call()
              .then(async (res) => state2.rwdBalance = res); //state2.rwdBalance = res
            await decentralBank.methods
              .balanceOf(accounts[0])
              .call()
              .then(async (res) => state2.stakingBalance = res);  //state2.stakingBalance = res
          })
          .catch((err) => console.log(err))
          .finally(() => {
            state2.tether = tether;
            state2.rwd = rwd;
            state2.decentralBank = decentralBank; //state2.tether = tether, state2.rwd = rwd, state2.decentralBank = decentralBank
            setState({ ...state, ...state2 });
            setLoading(false); //state2.loading = false
          });
      } else {
        alert("contract not found on this network");
      }
      //load Reward contract
      //load DecentralBank contract
    });
  }, []);

```

from Ganache network i got an error that says `Did you ran out of a gas?`, So I replaced it with `Matic Network`

```
matic: {
    provider: () => new HDWalletProvider(mnemonic, `https://polygon-mumbai.g.alchemy.com/v2/RAPXlgGyhJMrfpJTxU55QkOWLc_fdbEg`),
    network_id: 80001,       //mumbai matic's id
    gas: 5500000,        // Ropsten has a lower block limit than mainnet
    confirmations: 2,    // # of confs to wait between deployments. (default: 0)
    timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
```

## At Day7 Branch

[Call vs Send](https://bitsofco.de/calling-smart-contract-functions-using-web3-js-call-vs-send/)

