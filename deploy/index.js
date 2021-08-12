const {ethers} = require("hardhat");
const fs = require("fs");
const dotenv = require('dotenv');
const {getDeployedAddresses, writeDeployedAddresses} = require("./helpers");

deployChain()
    .then(() => {
        console.log("DONE");
        process.exit(0);
    })
    .catch(e => {
        console.error(e);
        process.exit(1);
    });

function loadEnv() {
    dotenv.config();
    const {CHAIN_NAME, RPC_ENDPOINT, DEPLOYER_PRIVATE_KEY} = process.env;
    if (!(CHAIN_NAME && RPC_ENDPOINT && DEPLOYER_PRIVATE_KEY)) {
        throw new Error("Must populate all values in .env - see .env.example for full list");
    }
    return {CHAIN_NAME, RPC_ENDPOINT, DEPLOYER_PRIVATE_KEY};
}

function getDeployer(RPC_ENDPOINT, DEPLOYER_PRIVATE_KEY) {
    const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);
    const deployer = new ethers.Wallet(`0x${DEPLOYER_PRIVATE_KEY}`, provider);
    return deployer;
}

async function exampleDeploy() {
    // load .env
    const {CHAIN_NAME, RPC_ENDPOINT, DEPLOYER_PRIVATE_KEY} = loadEnv();

    // load config.json
    const config = JSON.parse(fs.readFileSync(`./deploy/configs/${CHAIN_NAME}.json`));
    const {configValue} = config;
    if (!(configValue)) {
        throw new Error("Must populate config");
    }

    // setup deployer wallet
    const deployer = getDeployer(RPC_ENDPOINT, DEPLOYER_PRIVATE_KEY);

    // Deploy contract
    console.log(`Deploy EmptyContract to ${CHAIN_NAME}`);
    const contract = await deploy(deployer,'EmptyContract', []);
    console.log(`Deployed EmptyContract to ${CHAIN_NAME}: `, contract.address);

    // get the existing deployed addresses
    let {directory, filename, contractAddresses} = getDeployedAddresses(CHAIN_NAME);

    // update the deployed address
    contractAddresses["emptyContract"] = contract.address;

    // write the updated object
    writeDeployedAddresses(directory, filename, contractAddresses);

    console.log(`EmptyContract written to ${filename}`);
}


async function deployChain() {
    await exampleDeploy();
}

async function deploy(wallet, name, args = []) {
    const Implementation = await ethers.getContractFactory(name, wallet);
    const contract = await Implementation.deploy(...args);
    return contract.deployed();
}