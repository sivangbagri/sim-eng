// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";
import {Persona} from "../contracts/Persona.sol";

/**
 * @notice Deploy script for Persona contract
 * @dev Inherits ScaffoldETHDeploy which:
 *      - Includes forge-std/Script.sol for deployment
 *      - Includes ScaffoldEthDeployerRunner modifier
 *      - Provides `deployer` variable
 * Example:
 * yarn deploy --file DeployPersona.s.sol  # local anvil chain
 * yarn deploy --file DeployPersona.s.sol --network optimism # live network (requires keystore)
 */
contract DeployPersona is ScaffoldETHDeploy {
    /**
     * @dev Deployer setup based on `ETH_KEYSTORE_ACCOUNT` in `.env`:
     *      - "scaffold-eth-default": Uses Anvil's account #9 (0xa0Ee7A142d267C1f36714E4a8F75612F20a79720), no password prompt
     *      - "scaffold-eth-custom": requires password used while creating keystore
     *
     * Note: Must use ScaffoldEthDeployerRunner modifier to:
     *      - Setup correct `deployer` account and fund it
     *      - Export contract addresses & ABIs to `nextjs` packages
     */
    function run() external ScaffoldEthDeployerRunner {
        // Replace with your MetaMask address
        address ownerAddress = 0x718821024544fC3463bAE7A884B9522BaCaD1BCB; // PUT YOUR METAMASK ADDRESS HERE
        new Persona(ownerAddress);
        
    }
}
