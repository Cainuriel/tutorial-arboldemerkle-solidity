// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.5.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.5.0/utils/Counters.sol";
import "@openzeppelin/contracts@4.5.0/utils/cryptography/MerkleProof.sol";

contract NFT_MERKLE is ERC721 {
    using Counters for Counters.Counter;
    mapping(address => bytes32) rootUsers;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("NFT ARBOL DE MERKLE", "NFTMER") {}

    function safeMint(bytes32[] memory proof) public {
        require(isValid(proof, keccak256(abi.encodePacked(msg.sender))), "No pertenece a la White List");
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(msg.sender, tokenId);
    }

    function isValid(bytes32[] memory proof, bytes32 leaf) public view returns (bool) {
        return MerkleProof.verify(proof, rootUsers[msg.sender], leaf);
    }

    function rootUser(bytes32 _rootUser) public  {
         rootUsers[msg.sender] = _rootUser;
    }
}
