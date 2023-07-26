import chai, { expect } from "chai";
const { ethers, deployments } = require("hardhat");
import { expectRevert } from '@openzeppelin/test-helpers';
import { solidity } from "ethereum-waffle";
const { parseEther } = ethers.utils;

const ERC20_ABI = require("@openzeppelin/contracts-upgradeable/build/contracts/ERC20Upgradeable.json").abi;

chai.use(solidity);

describe("Swap", async () => {

  let contract, busd;
  let contractArtifact;
  let deployer, a1, a2, accounts;

  before(async () => {
    [deployer, a1, a2, ...accounts] = await ethers.getSigners();

    contractArtifact = await deployments.getArtifact("Swap");
  });

  beforeEach(async () => {
    await deployments.fixture(["hardhat_bsc_swap"])

    busd = new ethers.Contract("0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", ERC20_ABI, deployer);

    const contractProxy = await ethers.getContract("Swap_Proxy");
    contract = new ethers.Contract(contractProxy.address, contractArtifact.abi, a1);
  });

  describe('Basic', () => {
    it("Buy", async () => {
      await contract.buy({value: parseEther('1')});
      expect(await busd.balanceOf(a1.address)).gt(0);
    });
  });

});