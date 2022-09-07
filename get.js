// ? Retrieving Data from IPFS using Filecoin Web3Storage Client

require("dotenv").config();
const axios = require("axios");
const { Web3Storage } = require("web3.storage");
const Fs = require("fs");
const Path = require("path");
const Axios = require("axios");

// * Get File data from IPFS & Download them
async function retrieveFiles(CID) {
  // *Create Web3Storage CLient Instance for querying IPFS
  const client = new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN });

  // *Get Data using Content ID
  const res = await client.get(CID);

  console.log(`Got a response! [${res.status}] ${res.statusText}`);

  // *Check for error in response
  if (!res.ok) {
    throw new Error(`failed to get ${CID} - [${res.status}] ${res.statusText}`);
  }

  // *Get Files directory from response
  const files = await res.files();

  // *Get each file in files directory
  for (const file of files) {
    // * Determine file extension to give the correct path
    // * or use a general path for any kind of file
    let path;
    if (file.name.includes(".txt")) {
      path = Path.resolve(__dirname, "download", "file.txt");
    } else if (file.name.includes(".jpg")) {
      path = Path.resolve(__dirname, "download", "file.jpg");
    } else if (file.name.includes(".mp4")) {
      path = Path.resolve(__dirname, "download", "file.mp4");
    } else if (file.name.includes(".mp3")) {
      path = Path.resolve(__dirname, "download", "file.mp3");
    }
    // * Function defined below
    // ? @params: Content ID: Remote Location of file to download, Path: where to store the downloaded file
    downloader(file.cid, path);
    console.log(`Downloaded ${file.cid} -- ${file.name} -- ${file.size}`);
  }
}

// * Download files from IPFS
async function downloader(cid, path) {
  // * Creating a Stream to write data, since Http downloads file in chunks
  const writer = Fs.createWriteStream(path);

  // * Create URL for axios
  const url = `https://${cid}.ipfs.dweb.link`;

  // * Create Axios Request
  // ? Type: stream (in case of hyperMedia)
  const response = await Axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  // * Write the data into storage using the IO stream, everytime we recieve an event(data chunk from the reqeuest)
  response.data.pipe(writer);

  // * Return a promise that resolve on "finish" event
  // * And reject on "error" event
  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

retrieveFiles(
  "bafybeihnow5x3457stlrrikgxamdt26enntc2ek2qfpn4hauqmmtuezvde"
).catch(console.error);
