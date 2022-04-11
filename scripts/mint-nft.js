require('dotenv').config();
const API_URL = process.env.API_URL;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const alchemyWeb3 = createAlchemyWeb3(API_URL);
const contract = require("../artifacts/contracts/ExampleNFT.sol/ExampleNFT.json");
const contractAddress = "0x17659481078dC8826c1c4c36117470ea262F2407";
const nftContract = new alchemyWeb3.eth.Contract(contract.abi, contractAddress);
const METAMASK_PUBLIC_KEY = process.env.METAMASK_PUBLIC_KEY;
const METAMASK_PRIVATE_KEY = process.env.METAMASK_SECRET;

async function mintNFT(tokenURI) {
    // get the nonce - nonce is needed for security reasons. It keeps track of the number of
    // transactions sent from our address and prevents replay attacks.
    const nonce = await alchemyWeb3.eth.getTransactionCount(METAMASK_PUBLIC_KEY, 'latest');
    const tx = {
        from: METAMASK_PUBLIC_KEY, // our MetaMask public key
        to: contractAddress, // the smart contract address we want to interact with
        nonce: nonce, // nonce with the no of transactions from our account
        gas: 1000000, // fee estimate to complete the transaction
        data: nftContract.methods
            .createNFT(METAMASK_PUBLIC_KEY, tokenURI)
            .encodeABI(), // call the createNFT function from our ExampleNFT.sol file and pass the account that should receive the minted NFT.
    };
    const signPromise = alchemyWeb3.eth.accounts.signTransaction(
        tx,
        METAMASK_PRIVATE_KEY
    );
    signPromise
        .then((signedTx) => {
            alchemyWeb3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function (err, hash) {
                    if (!err) {
                        console.log(
                            "The hash of our transaction is: ",
                            hash,
                            "\nCheck Alchemy's Mempool to view the status of our transaction!"
                        );
                    } else {
                        console.log(
                            "Something went wrong when submitting our transaction:",
                            err
                        );
                    }
                }
            );
        })
        .catch((err) => {
            console.log(" Promise failed:", err);
        });
}

mintNFT("https://ipfs.io/ipfs/QmboTi9k3hZqSz9Sq6xUSrXdynQXepsU5AEPFLXF1VuppX");
