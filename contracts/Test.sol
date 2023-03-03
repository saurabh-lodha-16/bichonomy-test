// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Test {
    uint256 public someNumber;

    constructor() {}

    function update(uint256 _someNumber) public {
        someNumber = _someNumber;
    }
}
