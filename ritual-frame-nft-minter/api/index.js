import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import express from "express";

const app = express();
const port = 3000;
const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "base", {
  secretKey: process.env.SECRET_KEY,
});

app.post("/mint", async (req, res) => {
  const { addr } = req.query;

  const contract = await sdk.getContract(process.env.CONTRACT_ADDRESS);
  const quantity = 1; // how many unique NFTs you want to claim

  const tx = await contract.erc721.claimTo(addr, quantity);
  res.send(tx);
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
