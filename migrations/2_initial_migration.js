const Election_with_ERC721 = artifacts.require("Election_with_ERC721.sol");


module.exports = function(deployer) {
  deployer.deploy(Election_with_ERC721);
};
