// SPDX-License-Identifier: MIT
// ============ External Imports ============
const { waffle } = require('hardhat');
const { provider } = waffle;
const { expect } = require('chai');
// ============ Internal Imports ============
const { deployTestContractSetup } = require('./helpers/deploy');

describe('Example Test', async () => {
  // setup test variables
  let contract;
  const signers = provider.getWallets();

  before(async () => {
    // DEPLOY TEST CONTRACT SETUP
    const contracts = await deployTestContractSetup();
    contract = contracts.emptyContract;
  });

  it('Expects something', async () => {
    await expect(0).to.equal(0);
    await expect(0).to.not.equal(1);

    // await expect(sendTransaction).to.be.revertedWith("errorMessage");
    // await expect(sendTransaction).to.not.be.reverted;
    // await expect(sendTransaction).to.emit(contract, eventName);
  });
});