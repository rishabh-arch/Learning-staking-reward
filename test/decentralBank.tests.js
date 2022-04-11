/* eslint-disable no-undef */

const { should } = require("chai");

const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("DecentralBank", (accounts) => {
  let tether, rwd, decentralBank;
  const tokens = (number) => {
    return web3.utils.toWei(number.toString(), "ether");
  };
  before(async () => {
    tether = await Tether.deployed();
    rwd = await RWD.deployed();
    decentralBank = await DecentralBank.deployed(rwd.address, tether.address);
    should("transfering tether", async () => {
      await rwd.transfer(decentralBank.address, tokens(1000000));

      // Transfer 100 ReUSDT to Customer
      // await tether.transfer(accounts[0], tokens(100), { from: accounts[1] }); 
    });
    // // Transfer all tokens to the decentral bank
  });

  describe("Mock Tether Deployment", async () => {
    it("should be deployed", async () => {
      //   assert.notEqual(decentralBank.address, 0x0);
      assert.notEqual(tether.address, 0x0);
      assert.notEqual(rwd.address, 0x0);
    });
  });
  describe("Mock Tether Deployment", async () => {
    it("matches the name successfully", async () => {
      const name = await tether.name();
      assert.equal(name, "ReTether");
    });
  });
  describe("Reward Token", async () => {
    it("matches the name successfully", async () => {
      const name = await rwd.name();
      assert.equal(name, "Reward Token");
    });
  });
  describe("DecentralBank Bank Deployement", async () => {
    it("matches the name successfully", async () => {
      const name = await decentralBank.name();
      assert.equal(name, "Reward Token");
    });
    it("contract has tokens", async () => {
      const balance = await rwd.balanceOf(decentralBank.address);
      assert.equal(balance, tokens(1000000));
    });
  });
 
  // it('should have correct owner', async function() {
  //     const tether = await Tether.deployed();
  //     const rwd = await RWD.deployed();
  //     const decentralBank = await DecentralBank.deployed();
  //     const owner = await decentralBank.owner();

  //     assert.equal(owner, accounts[0]);

  // }
  // );
  // it('should have correct rwd', async function() {
  //     const tether = await Tether.deployed();
  //     const rwd = await RWD.deployed();
  //     const decentralBank = await DecentralBank.deployed();
  //     const rwdAddress = await decentralBank.rwd();
  // });
});
