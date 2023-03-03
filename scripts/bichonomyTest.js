const { ethers, ContractFactory } = require("ethers");
require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const SmartAccount = require("@biconomy/smart-account").default;
const contractArtifact = require("../artifacts/contracts/Test.sol/Test.json");
const DAPP_KEY = "gUv-7Xh-M.aa270a76-a1aa-4e79-bab5-8d857161c561"; //goerli dapp KEY
const GOERLI_RPC = "https://rpc.ankr.com/eth_goerli";

async function main() {
  const provider = new HDWalletProvider(process.env.PRIVATE_KEY, GOERLI_RPC);
  const walletProvider = new ethers.providers.Web3Provider(provider);

  const wallet = new SmartAccount(walletProvider, {
    activeNetworkId: 5,
    supportedNetworksIds: [5],
    networkConfig: [
      {
        chainId: 5,
        dappAPIKey: DAPP_KEY,
      },
    ],
  });
  const smartAccount = await wallet.init();

  const byteCode = contractArtifact.bytecode;
  const contractABI = contractArtifact.abi;
  const factory = new ContractFactory(
    contractABI,
    byteCode,
    smartAccount.signer
  );

  const unsignedDeployTransaction = factory.getDeployTransaction();

  console.log(unsignedDeployTransaction);

  // Transaction events subscription
  smartAccount.on("txHashGenerated", (response) => {
    console.log("txHashGenerated event received via emitter", response);
  });
  smartAccount.on("txMined", (response) => {
    console.log("txMined event received via emitter", response);
  });
  smartAccount.on("error", (response) => {
    console.log("error event received via emitter", response);
  });

  // Sending transaction
  const txResponse = await smartAccount.sendGaslessTransaction({
    transaction: unsignedDeployTransaction,
  });
  console.log("Transaction hash", txResponse.hash);
  return 0;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
