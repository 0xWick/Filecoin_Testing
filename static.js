// ? Storing Data IPFS using Filecoin & Web3Storage

// ? This script will upload the contents of the `data` folder to web3.storage, so you
// ? can view the application using an IPFS gateway.

const fs = require("fs");
require("dotenv").config();
const { Web3Storage, getFilesFromPath } = require("web3.storage");

async function uploadStatic() {
  // * Check if data exists locally
  if (!fs.existsSync("./data")) {
    console.error("data folder not found!");
    process.exit(1);
  }

  // *Create web3Storage instance with web3.storage API token
  const web3Storage = new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN });

  // *Load files from local folder
  console.log("Loading site files...");
  const files = await getFilesFromPath("./data");

  // *Upload files to IPFS
  console.log(`Uploading ${files.length} files to Web3.Storage...`);
  const cid = await web3Storage.put(files, { wrapWithDirectory: true });

  console.log("Deployed to Web3.Storage!");
  console.log("Root cid: ", cid);
  console.log(`Gateway url: https://${cid}.ipfs.dweb.link`);
}

uploadStatic().catch(console.error);
