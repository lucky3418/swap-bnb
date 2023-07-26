//SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

interface IRouter {
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        payable
        returns (uint[] memory amounts);
}

contract Swap is OwnableUpgradeable
{
    IRouter public constant PnckRouter = IRouter(0x10ED43C718714eb63d5aA57B78B54704E256024E);
    address internal constant WBNB = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;
    address internal constant BUSD = 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public virtual initializer {
        __Ownable_init_unchained();
    }

    function buy() external payable {
        address[] memory path = new address[](2);
        path[0] = WBNB;
        path[1] = BUSD;
        PnckRouter.swapExactETHForTokens{value: msg.value}(0, path, msg.sender, block.timestamp);
    }

    receive() external payable {}
}
