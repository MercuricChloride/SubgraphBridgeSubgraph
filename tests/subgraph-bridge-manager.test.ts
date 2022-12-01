import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { QueryResultFinalized } from "../generated/schema"
import { QueryResultFinalized as QueryResultFinalizedEvent } from "../generated/SubgraphBridgeManager/SubgraphBridgeManager"
import { handleQueryResultFinalized } from "../src/subgraph-bridge-manager"
import { createQueryResultFinalizedEvent } from "./subgraph-bridge-manager-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let subgraphBridgeID = Bytes.fromI32(1234567890)
    let requestCID = Bytes.fromI32(1234567890)
    let response = "Example string value"
    let newQueryResultFinalizedEvent = createQueryResultFinalizedEvent(
      subgraphBridgeID,
      requestCID,
      response
    )
    handleQueryResultFinalized(newQueryResultFinalizedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("QueryResultFinalized created and stored", () => {
    assert.entityCount("QueryResultFinalized", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "QueryResultFinalized",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "subgraphBridgeID",
      "1234567890"
    )
    assert.fieldEquals(
      "QueryResultFinalized",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "requestCID",
      "1234567890"
    )
    assert.fieldEquals(
      "QueryResultFinalized",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "response",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
