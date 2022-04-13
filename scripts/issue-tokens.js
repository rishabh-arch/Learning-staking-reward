const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function issueRewards(cb){
    const decentralBank = await DecentralBank.deployed();
    await decentralBank.issueTokens();
    console.log("Tokens issued");
    cb()
}