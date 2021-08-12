function eth(num) {
  return ethers.utils.parseEther(num.toString());
}
function weiToEth(num) {
  return parseFloat(ethers.utils.formatEther(num.toString()));
}

function encodeData(contract, functionName, args) {
  const func = contract.interface.getFunction(functionName);
  return contract.interface.encodeFunctionData(func, args);
}

// Example function calling external contract "approve" method
async function approve(signer, tokenContract, to, tokenId) {
  const data = encodeData(tokenContract, 'approve', [to, tokenId]);

  return signer.sendTransaction({
    to: tokenContract.address,
    data,
  });
}

module.exports = {
  eth,
  weiToEth,
  encodeData,
  approve,
};
