var HDWalletProvider = require("truffle-hdwallet-provider");

const mnemonic = "galaxy lumber world example pottery health just dune predict blind steel exile";
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/73cfdb279c2a42d1b28c94f4076bbfc3");
      },
      network_id: 4,

    }
  },
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.6.6",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
