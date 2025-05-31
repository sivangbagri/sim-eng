// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Persona {
    address public owner;
    mapping(address => string) public personaJson;

    constructor(address _owner) {
        owner = _owner;
    }

    function setPersona(string memory json) public {
        personaJson[msg.sender] = json;
    }

    function getPersona(address user) public view returns (string memory) {
        return personaJson[user];
    }

    // Admin function to set persona for any address (optional)
    function setPersonaFor(address user, string memory json) public {
        require(msg.sender == owner, "Only owner can set persona for others");
        personaJson[user] = json;
    }
}
