const { ethers } = require("hardhat");

const UPDATEINTERVAL = 3600; // for production
// const INTERVAL = 60; // for testing
const PRICEFEED = "0x0715A7794a1dc8e42615F059dD6e406A6594651A";
const VRFCOORDINATOR = "0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed";

module.exports = { UPDATEINTERVAL, PRICEFEED, VRFCOORDINATOR };
