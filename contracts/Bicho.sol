// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.2;

import { ERC1155 } from '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import { console } from 'hardhat/console.sol';

contract Bicho is ERC1155('https://bicho-nft.web.app/bicho/{id}.json') {
  event Birth(uint number);

  function breed() public {
    emit Birth(uint(blockhash(block.number - 1)));
  }
}
