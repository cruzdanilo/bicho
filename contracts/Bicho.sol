// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.2;

import { ERC1155 } from '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import { console } from 'hardhat/console.sol';
contract Bicho is ERC1155('https://bicho-nft.web.app/bicho/{id}.json') {
  struct Ticket {
    address player;
    uint8 number;
    uint256 amount;
    uint256 wonShare;
  }
  uint8 constant private BLOCK_INTERVAL = 20;
  uint8 constant private MAX_NUMS = 25;
  uint private currentRound = 0;
  uint private startedOnBlock;
  Ticket[] public tickets;
  Ticket[] public redeemList;
  uint256[MAX_NUMS] public sumsByNumber;
  mapping (uint => uint8) public luckyNumbers;
  event Birth(uint number);

  function bet(uint8 number) public payable {
    if (startedOnBlock == 0 || block.number - startedOnBlock > BLOCK_INTERVAL) endGame();
    tickets.push(Ticket({ player: msg.sender, number: number, amount: msg.value, wonShare: 0 }));
    sumsByNumber[number] += msg.value;
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
    if (totalWon > 0 && totalLost > 0) {
      for (uint i = 0; i < tickets.length; i++) {
        Ticket memory ticket = tickets[i];
        if (tickets[i].number != luckyNumber) continue;
        uint256 weight = ticket.amount / totalWon;
        uint256 withFee = totalLost * 9000 / 10000;
        ticket.wonShare = withFee * weight;
        redeemList.push(ticket);
      }
    }
    while (tickets.length > 0) tickets.pop();
    startedOnBlock = block.number;
    currentRound++;
  }

  function redeem() public {
    for (uint i = 0; i < redeemList.length; i++) {
      Ticket memory ticket = redeemList[i];
      breed(ticket.number);
      console.log(ticket.number, ticket.wonShare, address(this).balance);
      payable(ticket.player).transfer(ticket.wonShare + ticket.amount);
    }
    while (redeemList.length > 0) redeemList.pop();
  }

  function breed(uint8 number) internal {
    _mint(msg.sender, number, 1, '');
    emit Birth(number);
  }
}
