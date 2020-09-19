import { expect } from './setup'

/* External Imports */
import { ethers } from '@nomiclabs/buidler'
import { Contract, ContractFactory, Signer, BigNumber, utils } from 'ethers'
import {
  getContractFactory, sleep, sendLT, getBalanceLT
} from './test-utils'

import { getLogger } from './test-utils'

const log = getLogger('GEFVRF-Test')

describe('ChainLink VRF Api Test', () => {
  let wallet: Signer
  let owner1: Signer
  let owner2: Signer
  let deployproxycont:boolean = false

  before(async () => {
    ;[wallet, owner1, owner2] = await ethers.getSigners()

    // log.info(`Admin :: ${await wallet.getAddress()}`)
    // log.info(`Own1 :: ${await owner1.getAddress()}`)
    // log.info(`Own2 :: ${await owner2.getAddress()}`)
  })

  let cliomgrimplfact: ContractFactory
  let cliomgrimplinst: Contract

  before(async () => {

    ContractFactory.getContractAddress

    cliomgrimplfact = getContractFactory( "CLIOVRFManager", wallet )

    // Deploy the implementation part of the logic
    cliomgrimplinst = await cliomgrimplfact.deploy();

    log.debug( `VRF Impl Cont @ ${cliomgrimplinst.address}`)

  })

  beforeEach("Check LT Balance and refill", async () => {

    try{

      let walletltbal: string = await getBalanceLT( wallet, await wallet.getAddress() )
      let implltbal: string = await getBalanceLT( wallet, cliomgrimplinst.address )

      log.debug( `wallet LT Balance  :: ${ walletltbal }` )
      log.debug( `impl LT Balance :: ${ implltbal }` )

      let ltbalthreashold = BigNumber.from("2")
      let bnimplltbal = utils.parseUnits( implltbal, 18 )

      if( bnimplltbal.lte( ltbalthreashold ) === true ){

          await sendLT( wallet, cliomgrimplinst.address, "2" )

      }
    }catch(err){

      log.error(err);

      await sendLT( wallet, cliomgrimplinst.address, "2" )
    }

  })

  it('Test Random Number Gen', async () => {

    let iterCount = 0

    for( iterCount = 0; iterCount < 3; iterCount++ )
    {

      try{

        let eventoccur: boolean = false

        log.info(`iter count :: ${iterCount}`)

        let tsbefore = new Date()
        log.debug( `TS @ iter start ${tsbefore}`)

        const reqid = await cliomgrimplinst.getRandomNumber( 20 )

        cliomgrimplinst.once( "eventReceivedRandomNumber", ( requestId: string, randomness: number ) => {

          eventoccur = true
          // log.info( `ReqID :: ${requestId}`);
          log.info( `RandomNumb :: ${randomness}`);

        })

        while( eventoccur === false ){
          await sleep( 1 * 1000 ) //sleep for 1 sec, poll for the event
        }

        let tsafter = new Date()
        log.debug( `TS @ iter end ${tsafter}`)
        log.info( `VRF Proxy Link Balance :: ${await cliomgrimplinst.getUserLinkBalance()}` )

      }catch(err){

        log.error(err)

      }

    }

  })

})
