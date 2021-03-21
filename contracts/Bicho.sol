// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.2;
pragma abicoder v1;

import { ERC1155 } from '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
contract Bicho is ERC1155('https://bicho-nft.web.app/bicho/{id}.json') {
  struct Ticket {
    address player;
    uint8 number;
    uint256 amount;
    uint256 wonShare;
  }
  uint constant public EXPECTED_INTERVAL = 20 minutes;
  uint constant public AVG_BLOCK_TIME = 13 seconds;
  uint constant public BLOCK_INTERVAL = EXPECTED_INTERVAL/AVG_BLOCK_TIME;
  uint8 constant private MAX_NUMS = 25;
  uint private currentRound = 0;
  uint public start;
  Ticket[] public tickets;
  Ticket[] public redeemList;
  uint256[MAX_NUMS] public sumsByNumber;
  mapping (uint => uint256) public luckyNumbers;
  event Birth(uint number);
  event Result(uint round, uint number);

  function bet(uint8 number) public payable {
    if (block.number >= start + BLOCK_INTERVAL) endGame();
    tickets.push(Ticket({ player: msg.sender, number: number, amount: msg.value, wonShare: 0 }));
    sumsByNumber[number] += msg.value;
  }

  function endGame() public {
    if (luckyNumbers[currentRound] == 0) {
      fulfillRandomness('', uint(blockhash(block.number - 1)));
    }
    uint8 luckyNumber = uint8(luckyNumbers[currentRound] % MAX_NUMS);
    emit Result(currentRound, luckyNumber);
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
        uint256 dividend = ticket.amount * totalLost * 9000;
        uint256 divisor =  totalWon * 10000;
        ticket.wonShare = dividend / divisor;
        redeemList.push(ticket);
      }
    }
    while (tickets.length > 0) tickets.pop();
    start = block.number;
    currentRound++;
  }

  function redeem() public {
    for (uint i = 0; i < redeemList.length; i++) {
      Ticket memory ticket = redeemList[i];
      breed(ticket.number);
      payable(ticket.player).transfer(ticket.wonShare + ticket.amount);
    }
    while (redeemList.length > 0) redeemList.pop();
  }

  function repeatBiz(uint256 number) public returns (uint256) {
    luckyNumbers[currentRound] = number;
    return number;
  }

  function repeatP() public payable returns (uint256) {
    luckyNumbers[currentRound] = msg.value;
    return msg.value;
  }

  function repeat(uint8 number) public pure returns (uint8) {
    return number;
  }

  function repeat2(uint256 number) public pure returns (uint256) {
    return number;
  }

  function breed(uint8 number) internal {
    _mint(msg.sender, number, 1, '');
    emit Birth(number);
  }

  function fulfillRandomness(bytes32, uint256 randomness) internal {
    luckyNumbers[currentRound] = randomness;
  }
}
