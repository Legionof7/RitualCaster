// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.13;

import {CallbackConsumer} from "../lib/infernet-sdk/consumer/Callback.sol";
import {ERC721} from "solmate/tokens/ERC721.sol";

contract DiffusionNFT is CallbackConsumer, ERC721 {
    constructor(address coordinator) CallbackConsumer(coordinator) ERC721("DiffusionNFT", "DN") {}

    function mint(string memory prompt, address to) public {
        _requestCompute("prompt-to-nft", abi.encode(prompt, to), 20 gwei, 1_000_000, 1);
    }

    uint256 public counter = 0;
    mapping(uint256 => string) public arweaveHashes;

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return string.concat("https://arweave.net/", arweaveHashes[tokenId]);
    }

    function nftCollection() public view returns (uint256[] memory) {
        uint256 balance = balanceOf(msg.sender);
        uint256[] memory collection = new uint256[](balance);
        uint256 j = 0;
        for (uint256 i = 0; i < counter; i++) {
            if (ownerOf(i) == msg.sender) {
                collection[j] = i;
                j++;
            }
        }
        return collection;
    }

    function _receiveCompute(
        uint32 subscriptionId,
        uint32 interval,
        uint16 redundancy,
        address node,
        bytes calldata input,
        bytes calldata output,
        bytes calldata proof
    ) internal override {
        (bytes memory raw_output, bytes memory processed_output) = abi.decode(output, (bytes, bytes));
        (string memory arweaveHash) = abi.decode(raw_output, (string));

        (bytes memory raw_input, bytes memory processed_input) = abi.decode(input, (bytes, bytes));
        (string memory prompt, address to) = abi.decode(raw_input, (string, address));

        counter += 1;
        arweaveHashes[counter] = arweaveHash;

        emit NFTMinted(counter, string.concat("https://arweave.net/", arweaveHashes[counter]), to);

        _mint(to, counter);
    }

    event NFTMinted(uint256 indexed tokenId, string arweaveUrl, address owner);
}