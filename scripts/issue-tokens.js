const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function issueRewards(cb){
    const decentralBank = await DecentralBank.deployed();
    const check = await decentralBank.issueTokens();
    console.log("Tokens issued");
    console.log(check);
    cb()
}