import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address } from "@graphprotocol/graph-ts"
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
  subgraphDeploymentID: Bytes
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
