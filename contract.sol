// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract URLShortener {
    address public owner;
    mapping(string => string) private shortToFull;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function shortenURL(string memory short, string memory full) public onlyOwner {
        shortToFull[short] = full;
    }

    function redirect(string memory short) public view returns (string memory) {
        return shortToFull[short];
    }
}
