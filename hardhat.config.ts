import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import 'hardhat-deploy';
require('dotenv').config({ path: __dirname + '/.env' });

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.6.0",
      },
      {
        version: "0.8.0",
        settings: {},
      },
    ],
  },
  namedAccounts: {
    deployer: 0,
    simpleERC20Beneficiary: 1
  },
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/JT_sThZx_7hIEnRiDPHbDFscAtA3bEuF",
      accounts: [process.env.GOERLI_PRIVATE_KEY!],
      allowUnlimitedContractSize: true,
      gas: 10100000,
      gasPrice: 8000000000,
    },
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/dVg8OjLTuJPQJ4bxJbGkJzcqvHAecb0y",
      accounts: {
        mnemonic: process.env.RINKEBY_MNEMONIC,
      },
      allowUnlimitedContractSize: true,
      gas: 10100000,
      gasPrice: 8000000000,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      allowUnlimitedContractSize: true,
      gas: 2100000,
      gasPrice: 8000000000,
      blockGasLimit: 100000000429720, // whatever you want here,
      loggingEnabled: true
    },
  },
};

export default config;
