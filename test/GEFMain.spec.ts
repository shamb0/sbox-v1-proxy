import { expect } from './setup'

/* External Imports */
import { ethers } from '@nomiclabs/buidler'
import { Contract, ContractFactory, Signer, providers } from 'ethers'
import {
  getContractFactory, sleep
} from './test-utils'

import { getLogger } from './test-utils'

const log = getLogger('GEFMain-Test')

describe('Proxy Upgrade Test', () => {
  let wallet: Signer
  let owner1: Signer
  let owner2: Signer
  let deploycont:boolean = false

  before(async () => {
    ;[wallet, owner1, owner2] = await ethers.getSigners()

    log.info(`Admin :: ${await wallet.getAddress()}`)
    log.info(`Own1 :: ${await owner1.getAddress()}`)
    log.info(`Own2 :: ${await owner2.getAddress()}`)
  })

  let cliomgrfact: ContractFactory
  let cliomgrinst: Contract
  before(async () => {

    cliomgrfact = getContractFactory( "CLIOManager", wallet )

    if( deploycont == true ){

      cliomgrinst = await cliomgrfact.deploy()
      log.info(`Deployed at ${cliomgrinst.address}`)
    }
    else{

      cliomgrinst = new Contract( "0x5f554ceDB511584f9ac46692B56056fF615193B9",
                               cliomgrfact.interface,
                               wallet
                              )
    }

  })

  it('Test Random Number Gen', async () => {

    log.info( `before :: ${await cliomgrinst.randomResult()}` )

    const reqid = await cliomgrinst.getRandomNumber( 20 )

    sleep(2000);

    log.info( `after :: ${await cliomgrinst.randomResult()}` )

    log.info( `Link Balance :: ${await cliomgrinst.getUserLinkBalance()}` )

  })

})
