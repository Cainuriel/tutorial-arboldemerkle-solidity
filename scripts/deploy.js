const hre = require("hardhat");

async function main() {

  const NFT_MERKLE = await hre.ethers.getContractFactory("NFT_MERKLE");
  const nft_MERKLE = await NFT_MERKLE.deploy();

  await nft_MERKLE.deployed();
 
  console.log("NFT_MERKLE deployed to:", nft_MERKLE.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
