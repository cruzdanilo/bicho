// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.2;

import { ERC1155 } from '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import { console } from 'hardhat/console.sol';
contract Bicho is ERC1155('https://bicho-nft.web.app/bicho/{id}.json') {
  struct Ticket {
    address player;
    uint8 number;
    uint128 amount;
    uint round;
    uint256 wonShare;
  }
  uint8 constant private BLOCK_INTERVAL = 20;
  uint8 constant private MAX_NUMS = 25;
  uint private currentRound = 0;
  uint private startedOnBlock;
  Ticket[] public tickets;
  uint128[MAX_NUMS] public sumsByNumber;
  mapping (uint => uint8) public luckyNumbers;
  event Birth(uint number);

  function breed() public {
    uint number = uint(blockhash(block.number - 1));
    _mint(msg.sender, number, 1, '');
    emit Birth(number);
  }

  function bet(uint8 number, uint128 amount) public {
    if (startedOnBlock == 0 || block.number - startedOnBlock > BLOCK_INTERVAL) endGame();
    tickets.push(Ticket({ player: msg.sender, number: number, amount: amount, round: currentRound, wonShare: 0 }));
    sumsByNumber[number] += amount;
  }

  function endGame() public {
    uint8 luckyNumber = uint8(uint(blockhash(block.number - 1)) % MAX_NUMS);
    luckyNumbers[currentRound] = luckyNumber;
    uint totalLost;
    uint totalWon = sumsByNumber[luckyNumber];
    for (uint8 number = 0; number < MAX_NUMS; number++) {
      if (number != luckyNumber) totalLost += sumsByNumber[number];
      sumsByNumber[number] = 0;
    }
    if (totalWon > 0) {
      for (uint i = 0; i < tickets.length; i++) {
        Ticket memory ticket = tickets[i];
        if (ticket.round != currentRound || tickets[i].number != luckyNumber) continue;
        tickets[i].wonShare = (totalLost * ticket.amount * 9000) / (totalWon * 10000);
      }
    }
    startedOnBlock = block.number;
    currentRound++;
  }

  function batchRedeem() public {
    while (tickets.length > 0) {
      // Ticket memory ticket = tickets[0];
      // redeem
      tickets.pop();
    }
  }
}
