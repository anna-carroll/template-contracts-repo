async function deploy(name, args = []) {
  const Implementation = await ethers.getContractFactory(name);
  const contract = await Implementation.deploy(...args);
  return contract.deployed();
}

async function deployTestContractSetup() {
  const emptyContract = await deploy('EmptyContract');

  return {
    emptyContract
  };
}

module.exports = {
  deployTestContractSetup,
  deploy,
};
