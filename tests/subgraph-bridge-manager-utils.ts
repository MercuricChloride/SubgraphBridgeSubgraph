import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  QueryResultFinalized,
  SubgraphBridgeCreation,
  SubgraphQueryDisputeCreated,
  SubgraphResponseAdded
} from "../generated/SubgraphBridgeManager/SubgraphBridgeManager"

export function createQueryResultFinalizedEvent(
  subgraphBridgeID: Bytes,
  requestCID: Bytes,
  response: string
): QueryResultFinalized {
  let queryResultFinalizedEvent = changetype<QueryResultFinalized>(
    newMockEvent()
  )

  queryResultFinalizedEvent.parameters = new Array()

  queryResultFinalizedEvent.parameters.push(
    new ethereum.EventParam(
      "subgraphBridgeID",
      ethereum.Value.fromFixedBytes(subgraphBridgeID)
    )
  )
  queryResultFinalizedEvent.parameters.push(
    new ethereum.EventParam(
      "requestCID",
      ethereum.Value.fromFixedBytes(requestCID)
    )
  )
  queryResultFinalizedEvent.parameters.push(
    new ethereum.EventParam("response", ethereum.Value.fromString(response))
  )

  return queryResultFinalizedEvent
}

export function createSubgraphBridgeCreationEvent(
  bridgeCreator: Address,
  subgraphBridgeId: Bytes,
  subgraphDeploymentID: Bytes,
  queryFirstChunk: Bytes,
  queryLastChunk: Bytes,
  responseDataType: BigInt,
  proposalFreezePeriod: BigInt,
  responseDataOffset: i32,
  minimumSlashableGRT: BigInt
): SubgraphBridgeCreation {
  let subgraphBridgeCreationEvent = changetype<SubgraphBridgeCreation>(
    newMockEvent()
  )

  subgraphBridgeCreationEvent.parameters = new Array()

  subgraphBridgeCreationEvent.parameters.push(
    new ethereum.EventParam(
      "bridgeCreator",
      ethereum.Value.fromAddress(bridgeCreator)
    )
  )
  subgraphBridgeCreationEvent.parameters.push(
    new ethereum.EventParam(
      "subgraphBridgeId",
      ethereum.Value.fromFixedBytes(subgraphBridgeId)
    )
  )
  subgraphBridgeCreationEvent.parameters.push(
    new ethereum.EventParam(
      "subgraphDeploymentID",
      ethereum.Value.fromFixedBytes(subgraphDeploymentID)
    )
  )
  subgraphBridgeCreationEvent.parameters.push(
    new ethereum.EventParam(
      "queryFirstChunk",
      ethereum.Value.fromBytes(queryFirstChunk)
    )
  )
  subgraphBridgeCreationEvent.parameters.push(
    new ethereum.EventParam(
      "queryLastChunk",
      ethereum.Value.fromBytes(queryLastChunk)
    )
  )
  subgraphBridgeCreationEvent.parameters.push(
    new ethereum.EventParam(
      "responseDataType",
      ethereum.Value.fromUnsignedBigInt(responseDataType)
    )
  )
  subgraphBridgeCreationEvent.parameters.push(
    new ethereum.EventParam(
      "proposalFreezePeriod",
      ethereum.Value.fromUnsignedBigInt(proposalFreezePeriod)
    )
  )
  subgraphBridgeCreationEvent.parameters.push(
    new ethereum.EventParam(
      "responseDataOffset",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(responseDataOffset))
    )
  )
  subgraphBridgeCreationEvent.parameters.push(
    new ethereum.EventParam(
      "minimumSlashableGRT",
      ethereum.Value.fromUnsignedBigInt(minimumSlashableGRT)
    )
  )

  return subgraphBridgeCreationEvent
}

export function createSubgraphQueryDisputeCreatedEvent(
  subgraphBridgeID: Bytes,
  requestCID: Bytes,
  disputeID: Bytes
): SubgraphQueryDisputeCreated {
  let subgraphQueryDisputeCreatedEvent = changetype<
    SubgraphQueryDisputeCreated
  >(newMockEvent())

  subgraphQueryDisputeCreatedEvent.parameters = new Array()

  subgraphQueryDisputeCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "subgraphBridgeID",
      ethereum.Value.fromFixedBytes(subgraphBridgeID)
    )
  )
  subgraphQueryDisputeCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "requestCID",
      ethereum.Value.fromFixedBytes(requestCID)
    )
  )
  subgraphQueryDisputeCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "disputeID",
      ethereum.Value.fromFixedBytes(disputeID)
    )
  )

  return subgraphQueryDisputeCreatedEvent
}

export function createSubgraphResponseAddedEvent(
  queryBridger: Address,
  subgraphBridgeID: Bytes,
  subgraphDeploymentID: Bytes,
  response: string,
  attestationData: Bytes
): SubgraphResponseAdded {
  let subgraphResponseAddedEvent = changetype<SubgraphResponseAdded>(
    newMockEvent()
  )

  subgraphResponseAddedEvent.parameters = new Array()

  subgraphResponseAddedEvent.parameters.push(
    new ethereum.EventParam(
      "queryBridger",
      ethereum.Value.fromAddress(queryBridger)
    )
  )
  subgraphResponseAddedEvent.parameters.push(
    new ethereum.EventParam(
      "subgraphBridgeID",
      ethereum.Value.fromFixedBytes(subgraphBridgeID)
    )
  )
  subgraphResponseAddedEvent.parameters.push(
    new ethereum.EventParam(
      "subgraphDeploymentID",
      ethereum.Value.fromFixedBytes(subgraphDeploymentID)
    )
  )
  subgraphResponseAddedEvent.parameters.push(
    new ethereum.EventParam("response", ethereum.Value.fromString(response))
  )
  subgraphResponseAddedEvent.parameters.push(
    new ethereum.EventParam(
      "attestationData",
      ethereum.Value.fromBytes(attestationData)
    )
  )

  return subgraphResponseAddedEvent
}
