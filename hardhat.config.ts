import type { HardhatUserConfig, HttpNetworkUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import '@nomiclabs/hardhat-ethers';
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "hardhat-gas-reporter";
import 'hardhat-contract-sizer';
import 'solidity-coverage';
import dotenv from "dotenv";

dotenv.config();

const sharedNetworkConfig: HttpNetworkUserConfig = {};
if (process.env.PRIVATE_KEY) {
  sharedNetworkConfig.accounts = [process.env.PRIVATE_KEY];
} else {
  sharedNetworkConfig.accounts = {
    mnemonic: process.env.MNEMONIC || "",
  };
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{
      version: "0.8.18",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }]
  },
  networks: {
    bscMainnet: {
      ...sharedNetworkConfig,
      url: `https://bsc-dataseed.binance.org`,
    },
    bscTestnet: {
      ...sharedNetworkConfig,
      url: `https://data-seed-prebsc-2-s1.binance.org:8545`,
    },
  },
  etherscan: {
    apiKey: {
      bsc: process.env.BSCSCAN_API_KEY || "",
      bscTestnet: process.env.BSCSCAN_API_KEY || "",
    }
  },
  gasReporter: {
    enabled: true
  },
  mocha: {
    timeout: 120000
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: false,
    strict: true,
  }
};
export default config;