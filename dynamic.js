// ? Storing Data IPFS using Filecoin & Web3Storage

// ? This script will upload the contents of the `data` folder to web3.storage, so you
// ? can view the application using an IPFS gateway.

require("dotenv").config();
const { Web3Storage, getFilesFromPath } = require("web3.storage");

async function uploadDynamic() {
  // *Create web3Storage instance with web3.storage API token
  const web3Storage = new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN });

  // * Get the Dynamic Content to upload

  // * Determine the content type

  // * Upload the content to IPFS

  // * Return the CID of the content
}
