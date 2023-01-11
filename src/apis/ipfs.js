import { create } from "ipfs-http-client";

import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'

const IPFS_TOKEN = process.env.REACT_APP_IPFS_TOKEN || null;

const ipfsStorage = new Web3Storage({ token: IPFS_TOKEN });

const url = 'https://dweb.link/api/v0';
const ipfs = create({ url });
const links = [];

const ipfsFiles = (obj) => {
    let newObj = {};
    newObj.name = obj.name;
    newObj.cid = obj.cid._baseCache.get('b');
    return newObj;
};

export async function uploadFilesToIPFS(files) {
  if (!IPFS_TOKEN) {
    return console.error('A token is needed. You can create one on https://web3.storage')
  }

  console.log(`Uploading ${files.length} files`)
  const cid = await ipfsStorage.put(files)
  console.log('Content added with CID:', cid)
  for await (const link of ipfs.ls(cid)) {
    links.push(link);
  }

  let results = links.map(ipfsFiles);
  return results;
}