# Sandbox repo tried to expriment Proxy patterns on ChainLink Oracle Service API

## Study Reference

- [Proxy Patterns – OpenZeppelin blog](https://blog.openzeppelin.com/proxy-patterns/)

- [Proxy Delegate | solidity-patterns](https://fravoll.github.io/solidity-patterns/proxy_delegate.html)

![](https://i.imgur.com/XENRPoF.png)

## Reference repo of expriment with Proxy pattern

- [sbox-v2-proxy](https://github.com/shamb0/sbox-v2-proxy.git)

## Objective

Just for learning fun, explored is there any possibility to avoid wastage of LINK Tokens during development [ any way we have unlimited free tokens for kovan testnet :-) ], Link token is binded to proxy layer and Logic Contract( Logic Layer ) is decoupled from token requirement and logic layer API's gets executed under proxy layer context.

## Design approach

Proxy pattern requires, constructor must be avoided in Logic Contract( Logic Layer ). and
instance global state variables need to be initialised via explicit "init" API. Looks like this requirement forces to avoid "immutable" state variable, which can be initialised only in constructor ( May be leading to security vulnerability, needs to be verified with experts ).

## Reference implementation is done for below service API ...

- [Chainlink Alarm Clock (Testnet)](https://docs.chain.link/docs/chainlink-alarm-clock)

- [Generate Random Numbers for Smart Contracts using Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf)

## Howto install

```shell
$ git clone https://github.com/shamb0/sbox-v2-proxy.git
$ cd sbox-v2-proxy
$ yarn install
```

### Howto run "Chainlink Alarm Clock" test API

```shell
 sbox-v1-proxy$ env DEBUG="debug*,info*,error*" yarn run test ./test/GEFAlarm.spec.ts --network kovan
yarn run v1.22.4
$ yarn run test:contracts ./test/GEFAlarm.spec.ts --network kovan
$ cross-env SOLPP_FLAGS="FLAG_IS_TEST,FLAG_IS_DEBUG" buidler test --show-stack-traces ./test/GEFAlarm.spec.ts --network kovan
$(process.argv.length)
All contracts have already been compiled, skipping compilation.


  ChainLink Alarm API Test
  debug:GEFAlarm-Test Alarm Impl Cont @ 0x547E3bcfF7738e0323e5f55c4c56324Cd9F87eab +0ms
  debug:GEFAlarm-Test wallet LT Balance  :: 201.0 +4s
  debug:GEFAlarm-Test impl LT Balance :: 0.0 +1ms
  debug:LinkToken-Intf Transfer +0ms
  debug:LinkToken-Intf   From:    0xAECD01bB15873eC2BE8d28d01f5D176A65D0ACD3 +0ms
  debug:LinkToken-Intf   To:      0x547E3bcfF7738e0323e5f55c4c56324Cd9F87eab +1ms
  debug:LinkToken-Intf   Amount:  2.0 +0ms
  info:GEFAlarm-Test iter count :: 0 +0ms
  debug:GEFAlarm-Test TS @ iter start Sat Sep 19 2020 09:53:06 GMT+0530 (India Standard Time) +12s
  info:GEFAlarm-Test ReqID :: 0xb2f3b3541ca47befb77694735868a60634f6e3ca06da7b831554ef0b5e9133f2 +1m
  debug:GEFAlarm-Test TS @ iter end Sat Sep 19 2020 09:54:29 GMT+0530 (India Standard Time) +1m
  info:GEFAlarm-Test iter count :: 1 +237ms
  debug:GEFAlarm-Test TS @ iter start Sat Sep 19 2020 09:54:29 GMT+0530 (India Standard Time) +0ms
  info:GEFAlarm-Test ReqID :: 0xa4ac8ab59271942566242c1023a6879a4750e173281f30181cdddb46413d59fe +1m
  debug:GEFAlarm-Test TS @ iter end Sat Sep 19 2020 09:55:48 GMT+0530 (India Standard Time) +1m
    ✓ Alaram API Test (162596ms)


  1 passing (3m)

Done in 197.40s.
```

### Howto run "Generate Random Numbers for Smart Contracts using Chainlink VRF" test API

```shell
sbox-v1-proxy$ env DEBUG="debug*,info*,error*" yarn run test ./test/GEFVRF.spec.ts --network kovan
yarn run v1.22.4
$ yarn run test:contracts ./test/GEFVRF.spec.ts --network kovan
$ cross-env SOLPP_FLAGS="FLAG_IS_TEST,FLAG_IS_DEBUG" buidler test --show-stack-traces ./test/GEFVRF.spec.ts --network kovan
$(process.argv.length)
All contracts have already been compiled, skipping compilation.


  ChainLink VRF Api Test
  debug:GEFVRF-Test VRF Impl Cont @ 0x9C087304CCF84FdcD0fFF23A0A18E6f8c6d5efCE +0ms
  debug:GEFVRF-Test wallet LT Balance  :: 199.0 +4s
  debug:GEFVRF-Test impl LT Balance :: 0.0 +0ms
  debug:LinkToken-Intf Transfer +0ms
  debug:LinkToken-Intf   From:    0xAECD01bB15873eC2BE8d28d01f5D176A65D0ACD3 +0ms
  debug:LinkToken-Intf   To:      0x9C087304CCF84FdcD0fFF23A0A18E6f8c6d5efCE +0ms
  debug:LinkToken-Intf   Amount:  2.0 +0ms
  info:GEFVRF-Test iter count :: 0 +0ms
  debug:GEFVRF-Test TS @ iter start Sat Sep 19 2020 11:35:22 GMT+0530 (India Standard Time) +16s
```

## Note on BuidlerConfig | "kovan" network settings

Below settings are imported from env file **".env.shamb0.lab1"**

![](https://i.imgur.com/cRO5X1F.png)

Create and adopt the file **".env.shamb0.lab1"** as per your environment.

![](https://i.imgur.com/onWKT3q.png)
