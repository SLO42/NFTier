// contracts/ExampleNFT.sol
// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// implements the ERC721 standard
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// adds _setTokenURI which is supposedly assumed in ERC721 but is not explicitly defined
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// keeps track of the number of tokens issued
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Accessing the Ownable method ensures that only the creator of the smart contract can interact with it
contract ExampleNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // the name and symbol for the NFT
    constructor() public ERC721("ExampleNFT", "EFT") {}

    // Create a function to mint/create the NFT
    // receiver takes a type of address. This is the wallet address of the user that should receive the NFT minted using the smart contract
    // tokenURI takes a string that contains metadata about the NFT

    function createNFT(address receiver, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(receiver, newItemId);
        _setTokenURI(newItemId, tokenURI);

        // returns the id for the newly created token
        return newItemId;
    }
}
