// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "infernet-sdk/consumer/Callback.sol";

contract NFTMint is ERC721, Ownable, CallbackConsumer {
    uint256 private _currentTokenId = 0;
    mapping(uint256 => string) private _tokenMetadataURIs;

    event NFTMinted(uint256 indexed tokenId, string metadataURI, address owner);
    event ComputeRequested(string computeId, bytes input);
    event ComputeReceived(uint32 indexed subscriptionId, uint32 indexed interval, uint16 indexed redundancy, address node, bytes input, bytes output, bytes proof);

    constructor(
        string memory name,
        string memory symbol,
        address coordinator,
        address initialOwner
    ) ERC721(name, symbol) CallbackConsumer(coordinator) Ownable(initialOwner) {
        if (coordinator == address(0)) {
            revert("Invalid coordinator address");
        }
        if (initialOwner == address(0)) {
            revert("Invalid initial owner address");
        }
    }

    function mintTo(address to, string memory prompt) public onlyOwner {
        if (to == address(0)) {
            revert("Invalid recipient address");
        }
        if (bytes(prompt).length == 0) {
            revert("Prompt cannot be empty");
        }
        bytes memory input = abi.encode(prompt, to);
        emit ComputeRequested(computeId, input);
        _requestCompute("i-0340c9fbfbcb1ab1d", input, 100 gwei, 1000000, 1);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return "ipfs://your-base-uri/";
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        if (bytes(_tokenMetadataURIs[tokenId]).length == 0) {
            revert("Token does not exist or metadata not set");
        }
        return _tokenMetadataURIs[tokenId];
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
        emit ComputeReceived(subscriptionId, interval, redundancy, node, input, output, proof);

        // Example processing logic; adapt as needed for your use case
        (string memory prompt, address to) = abi.decode(input, (string, address));
        (string memory result, string memory metadataURI) = abi.decode(output, (string, string));

        if (keccak256(abi.encodePacked(result)) != keccak256(abi.encodePacked("Approved"))) {
            revert("Minting not approved");
        }

        _currentTokenId += 1;
        uint256 newTokenId = _currentTokenId;
        _safeMint(to, newTokenId);
        _tokenMetadataURIs[newTokenId] = metadataURI;
        emit NFTMinted(newTokenId, metadataURI, to);
    }

    // Implement other necessary functions and overrides as needed.
}  
