require('hardhat-gas-reporter');
require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
const dotenv = require('dotenv');
dotenv.config();
const {verify} = require("./deploy/verify");

task("verify-contracts", "Verifies the core contracts").setAction(verify);

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.8.5',
        settings: {
          optimizer: {
            enabled: true,
            runs: 999999,
          },
        },
      }
    ],
  },

  gasReporter: {
    currency: 'USD',
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },

  networks: {
    hardhat: {},
    localhost: {
      url: 'http://localhost:8545',
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    }
  },
};
