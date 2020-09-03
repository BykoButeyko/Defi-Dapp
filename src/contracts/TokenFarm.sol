pragma solidity ^0.5.0;

import './ClorofeelToken.sol';
import './DaiToken.sol';

contract TokenFarm {
    string public name = "Clorofeel Token Farm";
    ClorofeelToken public clorofeelToken;
    DaiToken public daiToken;

    constructor(ClorofeelToken _clorofeelToken, DaiToken _daiToken) public {
        clorofeelToken = _clorofeelToken;
        daiToken = _daiToken;
    }
}
