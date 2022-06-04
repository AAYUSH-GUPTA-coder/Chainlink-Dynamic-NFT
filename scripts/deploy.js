const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-etherscan");
const {
  UPDATEINTERVAL,
  PRICEFEED,
  VRFCOORDINATOR,
} = require("../constants/index");

async function main() {
  /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so verifyContract here is a factory for instances of our Verify contract.
  */
  const verifyContract = await ethers.getContractFactory("BullBear");

  // deploy the contract
  const deployedVerifyContract = await verifyContract.deploy(
    UPDATEINTERVAL,
    PRICEFEED,
    VRFCOORDINATOR
  );

  await deployedVerifyContract.deployed();

  // print the address of the deployed contract
  console.log("Verify Contract Address:", deployedVerifyContract.address);

  console.log("Sleeping.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(20000);

  // Verify the contract after deploying
  await hre.run("verify:verify", {
    address: deployedVerifyContract.address,
    constructorArguments: [UPDATEINTERVAL, PRICEFEED, VRFCOORDINATOR],
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
