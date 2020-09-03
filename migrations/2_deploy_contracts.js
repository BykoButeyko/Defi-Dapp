const ClorofeelToken = artifacts.require("ClorofeelToken")
const DaiToken = artifacts.require("DaiToken")
const TokenFarm = artifacts.require("TokenFarm")

module.exports = async function(deployer, network, accounts) {
  //Deploy mDai Token
  await deployer.deploy(DaiToken)
  const daiToken = await DaiToken.deployed()

  //Deploy Clorofeel Token
  await deployer.deploy(ClorofeelToken)
  const clorofeelToken = await ClorofeelToken.deployed()

  //Deploy TokenFarm
  await deployer.deploy(TokenFarm, clorofeelToken.address, daiToken.address)
  const tokenFarm = await TokenFarm.deployed()

  //Transfer all tokens to TokenFarm (1 million)
  await clorofeelToken.transfer(tokenFarm.address, '1000000000000000000000000')

  //Transfer 100 mDai tokens to investor
  await daiToken.transfer(accounts[3], '100000000000000000000')
}
