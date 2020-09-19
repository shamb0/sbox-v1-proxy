import { expect } from './setup'

/* External Imports */
import { ethers } from '@nomiclabs/buidler'
import { Contract, ContractFactory, Signer, BigNumber, utils } from 'ethers'
import {
  getContractFactory, sleep, sendLT, getBalanceLT
} from './test-utils'

import { getLogger } from './test-utils'
import { string } from '@nomiclabs/buidler/internal/core/params/argumentTypes'

const log = getLogger('GEFAlarm-Test')

describe('ChainLink Alarm API Test', () => {
  let wallet: Signer
  let owner1: Signer
  let owner2: Signer

  before(async () => {
    ;[wallet, owner1, owner2] = await ethers.getSigners()

    // log.info(`Admin :: ${await wallet.getAddress()}`)
    // log.info(`Own1 :: ${await owner1.getAddress()}`)
    // log.info(`Own2 :: ${await owner2.getAddress()}`)
  })

  let cliomgrimplfact: ContractFactory
  let cliomgrimplinst: Contract

  before(async () => {

    cliomgrimplfact = getContractFactory( "CLIOAlarmManager", wallet )

    cliomgrimplinst = await cliomgrimplfact.deploy();

    log.debug( `Alarm Impl Cont @ ${cliomgrimplinst.address}`)

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

  it('Alaram API Test', async () => {

    let iterCount = 0

    for( iterCount = 0; iterCount < 2; iterCount++ )
    {

      try{

        let iseventfired: boolean = false

        log.info(`iter count :: ${iterCount}`)

        // Profile the Start Time-Stamp ...
        let tsbefore = new Date()
        log.debug( `TS @ iter start ${tsbefore}`)

        // Configure the Alarm to fire after 1 min ...
        await cliomgrimplinst.delayStart( 1 )

        // Register for the event-callback ...
        cliomgrimplinst.once( "eventAlaramDone", ( requestId ) => {

          iseventfired = true
          log.info( `ReqID :: ${requestId}`);

        })

          // Poll for the event-callback ...
        while( iseventfired === false ){
          await sleep( 1 * 1000 ) //sleep for 5 sec, poll for the event
          // log.info( `Blocked for event notif state(${eventoccur})`);
        }

        // Profile the End Time-Stamp ...
        let tsafter = new Date()
        log.debug( `TS @ iter end ${tsafter}`)

      }catch(err){

        log.error(err);

      }

    }

  })

})
