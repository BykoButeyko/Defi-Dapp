pragma solidity ^0.5.0;

import './ClorofeelToken.sol';
import './DaiToken.sol';

contract TokenFarm {
    string public name = "Clorofeel Token Farm";
    address public owner;
    ClorofeelToken public clorofeelToken;
    DaiToken public daiToken;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(ClorofeelToken _clorofeelToken, DaiToken _daiToken) public {
        clorofeelToken = _clorofeelToken;
        daiToken = _daiToken;
        owner = msg.sender;
    }

    // 1. Stakes tokens (Deposit)
    function stakeTokens(uint _amount) public {
        //Require amount greater than 0
        require(_amount > 0, "amount cannot be 0");

        // Transfer Mock Dai tokens to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        //Update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        //Add user to stakers array *only* if they haven't staked already
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        //Update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;

    }

    //2. Unstaking tokens (Withdraw)

    //3. Issuing Tokens (Reward for staking)
    function issueToken() public {
        require(msg.sender == owner, "caller must be the owner");

        //Issue tokens to all stakers
        for (uint i=0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            if(balance > 0) {
                clorofeelToken.transfer(recipient, balance);
            }
        }
    }
}
