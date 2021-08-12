const fs = require("fs");
const dotenv = require('dotenv');
dotenv.config();
const {getDeployedAddresses} = require("./helpers");

async function verify() {
    // load .env
    const {CHAIN_NAME} = process.env;
    if (!(CHAIN_NAME) ) {
        throw new Error("Must add chain name to .env");
    } else if(hre.network.name != CHAIN_NAME) {
        throw new Error(`CHAIN_NAME in .env file is "${CHAIN_NAME}" but hardhat --network in package.json is "${hre.network.name}; change them to match"`)
    }

    // load config
    const config = JSON.parse(fs.readFileSync(`./deploy/configs/${CHAIN_NAME}.json`));
    const {configValue} = config;
    if (!(configValue)) {
        throw new Error("Must populate config");
    }

    // load deployed contracts
    const {contractAddresses} = getDeployedAddresses(CHAIN_NAME);
    const {emptyContract} = contractAddresses;
    if (!emptyContract) {
        throw new Error("No deployed Empty Contract for this chain");
    }

    console.log(`Verifying ${CHAIN_NAME}`);

    // Verify Empty Contract
    console.log(`Verify EmptyContract`);
    await verifyContract(emptyContract, []);
}

/*
 * Given one contract verification input,
 * attempt to verify the contracts' source code on Etherscan
 * */
async function verifyContract(address, constructorArguments) {
    const {CHAIN_NAME} = process.env;
    try {
        await hre.run('verify:verify', {
            network: CHAIN_NAME,
            address,
            constructorArguments,
        });
    } catch (e) {
        console.error(e);
    }
    console.log('\n\n'); // add space after each attempt
}

module.exports = {
    verify
};

