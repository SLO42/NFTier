/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { API_URL, METAMASK_SECRET } = process.env;
module.exports = {
  solidity: "0.8.13",
  defaultNetwork: "ropsten",
  networks: {
    hardhat: {},
    ropsten: {
      url: API_URL,
      accounts: [`0x${METAMASK_SECRET}`]
    }
  },
};
