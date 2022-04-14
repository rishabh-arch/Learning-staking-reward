require('babel-register');
require('babel-polyfill');

const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = "victory cancel exotic shell dawn visual memory patch liberty risk zoo shadow";

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*"
        },
        matic: {
            provider: () => new HDWalletProvider(mnemonic, `https://polygon-mumbai.g.alchemy.com/v2/RAPXlgGyhJMrfpJTxU55QkOWLc_fdbEg`),
           //  from:"0xafd538A9111B108e2Dfaf3FA29554Ff5635dE805",
            network_id: 80001,       // Ropsten's id
            gas: 5500000,        // Ropsten has a lower block limit than mainnet
            confirmations: 2,    // # of confs to wait between deployments. (default: 0)
            timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
            skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
            },
    },
    contracts_directory: "./src/contracts",
    contracts_build_directory: "./src/truffle_abis",
    compilers: {
        solc: {
            version: "^0.8.10",
            optimizer: {
                enabled: true,
                runs: 200,
            }
        }
    }

};