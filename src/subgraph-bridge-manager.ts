import {
  QueryResultFinalized as QueryResultFinalizedEvent,
  SubgraphBridgeCreation as SubgraphBridgeCreationEvent,
  SubgraphQueryDisputeCreated as SubgraphQueryDisputeCreatedEvent,
  SubgraphResponseAdded as SubgraphResponseAddedEvent,
} from "../generated/SubgraphBridgeManager/SubgraphBridgeManager";
import { QueryResultFinalized, SubgraphBridgeCreation, SubgraphQueryDisputeCreated, SubgraphResponseAdded, QueryBridger } from "../generated/schema";
import { ByteArray, Bytes, crypto, log } from "@graphprotocol/graph-ts";

export function handleQueryResultFinalized(event: QueryResultFinalizedEvent): void {
  let entity = new QueryResultFinalized(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.subgraphBridgeID = event.params.subgraphBridgeID;
  entity.requestCID = event.params.requestCID;
  entity.response = event.params.response;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSubgraphBridgeCreation(event: SubgraphBridgeCreationEvent): void {
  let entity = new SubgraphBridgeCreation(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.bridgeCreator = event.params.bridgeCreator;
  entity.subgraphBridgeId = event.params.subgraphBridgeId;
  entity.subgraphDeploymentID = event.params.subgraphDeploymentID;
  entity.queryFirstChunk = event.params.queryFirstChunk.toString();
  entity.queryLastChunk = event.params.queryLastChunk.toString();
  entity.responseDataType = event.params.responseDataType;
  entity.proposalFreezePeriod = event.params.proposalFreezePeriod;
  entity.responseDataOffset = event.params.responseDataOffset;
  entity.minimumSlashableGRT = event.params.minimumSlashableGRT;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSubgraphQueryDisputeCreated(event: SubgraphQueryDisputeCreatedEvent): void {
  let entity = new SubgraphQueryDisputeCreated(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.subgraphBridgeID = event.params.subgraphBridgeID;
  entity.requestCID = event.params.requestCID;
  entity.disputeID = event.params.disputeID;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSubgraphResponseAdded(event: SubgraphResponseAddedEvent): void {
  let entity = new SubgraphResponseAdded(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.queryBridger = event.params.queryBridger;
  entity.subgraphBridgeID = event.params.subgraphBridgeID;
  entity.subgraphDeploymentID = event.params.subgraphDeploymentID;
  entity.response = event.params.response;
  entity.attestationData = event.params.attestationData;
  entity.unlocksAt = event.params.unlocksAt;
  entity.requestCID = event.params.requestCID;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let queryBridger = getOrCreateQueryBridger();

  queryBridger.users = queryBridger.users.concat([event.params.queryBridger]);

  queryBridger.merkleRoot = createMerkleRoot(queryBridger.users);

  queryBridger.save();

  entity.save();
}

function getOrCreateQueryBridger(): QueryBridger {
  let queryBridger = QueryBridger.load("0");
  if (queryBridger == null) {
    queryBridger = new QueryBridger("0");
    queryBridger.users = [];
    queryBridger.save();
  }
  return queryBridger;
}

function createMerkleRoot(addresses: Bytes[]): Bytes {
  if (addresses.length == 0) return Bytes.fromHexString("0x0000000000000000000000000000000000000000000000000000000000000000");

  if (addresses.length == 1) return Bytes.fromByteArray(crypto.keccak256(addresses[0]));

  let leaves: Bytes[] = addresses.map<Bytes>((address) => {
    log.debug("address: {}", [address.toHexString()]);
    let hash = Bytes.fromByteArray(crypto.keccak256(address));
    log.debug("hash: {}", [hash.toHexString()]);
    return hash;
  });

  while (leaves.length > 1) {
    let newLeaves: Bytes[] = [];

    for (let i = 0; i < leaves.length; i += 2) {
      let left: Bytes = leaves[i];
      if (i + 1 < leaves.length) {
        let right: Bytes = leaves[i + 1];
        let combined = left.concat(right);
        log.debug("combined: {}", [combined.toHexString()]);
        let hash = Bytes.fromByteArray(crypto.keccak256(combined));
        log.debug("combined hash: {}", [hash.toHexString()]);
        newLeaves.push(hash);
      } else {
        newLeaves.push(left);
      }
    }

    leaves = newLeaves;
  }
  return leaves[0];
}
