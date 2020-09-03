const { assert } = require('chai')

const ClorofeelToken = artifacts.require("ClorofeelToken")
const DaiToken = artifacts.require("DaiToken")
const TokenFarm = artifacts.require("TokenFarm")

require('chai')
    .use(require('chai-as-promised'))
    .should()

function tokens(n) {
    return web3.utils.toWei(n, 'Ether')
}

contract('TokenFarm', ([owner, investor]) => {
    let daiToken, clorofeelToken, tokenFarm

    //Write tests here...
    before(async()=>{
        //Load contracts
        daiToken = await DaiToken.new()
        clorofeelToken = await ClorofeelToken.new()
        tokenFarm = await TokenFarm.new(clorofeelToken.address, daiToken.address)

        //Transfer all clorofeel tokens to farm (1 million)
        await clorofeelToken.transfer(tokenFarm.address, tokens('1000000'))

        //Send tokens to investor
        await daiToken.transfer(investor, tokens('100'), { from: owner})

    })

    describe("Mock DAI deployment", async() => {
        it('has a name', async() => {
            const name = await daiToken.name()
            assert.equal(name, "Mock DAI Token")
        })
    })

    describe("Clorofeel Token deployment", async() => {
        it('has a name', async() => {
            const name = await clorofeelToken.name()
            assert.equal(name, "Clorofeel Token")
        })
    })

    describe("Token Farm Deployment", async() => {
        it('has a name', async() => {
            const name = await tokenFarm.name()
            assert.equal(name, "Clorofeel Token Farm")
        })

        it('contract has tokens', async () => {
            let balance = await clorofeelToken.balanceOf(tokenFarm.address)
            assert.equal(balance.toString(), tokens('1000000'))
        })
    })
})
