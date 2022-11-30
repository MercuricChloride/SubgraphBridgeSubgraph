import {
  QueryResultFinalized as QueryResultFinalizedEvent,
  SubgraphBridgeCreation as SubgraphBridgeCreationEvent,
  SubgraphQueryDisputeCreated as SubgraphQueryDisputeCreatedEvent,
  SubgraphResponseAdded as SubgraphResponseAddedEvent
} from "../generated/SubgraphBridgeManager/SubgraphBridgeManager"
import {
  QueryResultFinalized,
  SubgraphBridgeCreation,
  SubgraphQueryDisputeCreated,
  SubgraphResponseAdded
} from "../generated/schema"

export function handleQueryResultFinalized(
  event: QueryResultFinalizedEvent
): void {
  let entity = new QueryResultFinalized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.subgraphBridgeID = event.params.subgraphBridgeID
  entity.requestCID = event.params.requestCID
  entity.response = event.params.response

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSubgraphBridgeCreation(
  event: SubgraphBridgeCreationEvent
): void {
  let entity = new SubgraphBridgeCreation(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.bridgeCreator = event.params.bridgeCreator
  entity.subgraphBridgeId = event.params.subgraphBridgeId
  entity.subgraphDeploymentID = event.params.subgraphDeploymentID

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSubgraphQueryDisputeCreated(
  event: SubgraphQueryDisputeCreatedEvent
): void {
  let entity = new SubgraphQueryDisputeCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.subgraphBridgeID = event.params.subgraphBridgeID
  entity.requestCID = event.params.requestCID
  entity.disputeID = event.params.disputeID

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSubgraphResponseAdded(
  event: SubgraphResponseAddedEvent
): void {
  let entity = new SubgraphResponseAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.queryBridger = event.params.queryBridger
  entity.subgraphBridgeID = event.params.subgraphBridgeID
  entity.subgraphDeploymentID = event.params.subgraphDeploymentID
  entity.response = event.params.response
  entity.attestationData = event.params.attestationData

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
