// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./ERC721A.sol";
import "./Ownable.sol";

contract GoldTier is Ownable, ERC721A {
    string private _baseTokenURI;
    uint256 public totalMint;

    // Array of whitelists
    mapping(address => bool) public _buyerlists;

    constructor() ERC721A("Third Wave Club Gold Nft", "TWCGN") {
        totalMint = 9500;
    }

    function mint(uint256 quantity) external payable onlyOwner {
        // _safeMint's second argument now takes in a quantity, not a tokenId.
        require(totalSupply() + quantity <= totalMint, "can't mint ");
        _safeMint(msg.sender, quantity);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function setBaseURI(string calldata baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    function addBuyerlist(address[] memory _recipients) external onlyOwner {
        for (uint256 i = 0; i < _recipients.length; i++) {
            _buyerlists[_recipients[i]] = true;
        }
    }

    function removeBuyerlist(address[] memory addresses) external onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            _buyerlists[addresses[i]] = false;
        }
    }

    function isBuyerlisted(address _account) public view returns (bool) {
        return _buyerlists[_account];
    }

    function migrate(address to, uint256[] memory tokenIds) external onlyOwner{
        require(isBuyerlisted(to));
        
        for(uint256 i = 0 ; i < tokenIds.length ; i ++) {
            require(tokenIds[i] < totalSupply());
            safeTransferFrom(owner(), to, tokenIds[i]);
        }
    }
}
