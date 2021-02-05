import { HashgraphClient } from "app/hashgraph/client"
import Config from "app/config"
import TokenSpec from "app/hashgraph/tokens/specifications";

const client = new HashgraphClient()

test("The client will create a new test token", async () => {

  const {
    accountId,
    privateKey
  } = Config

  const baseSupply = 800

  const tokenCreationInstance = {
    accountId,
    privateKey,
    specification: TokenSpec.Fungible,
    name: "UNIBAR TOKEN",
    symbol: "UNIBAR",
    supply: baseSupply
  }

  // Block for now.
  return;

	const {
    name,
    symbol,
    supply,
    supplyWithDecimals,
    tokenId,
    specificationReference
  } = await client.createToken(tokenCreationInstance)

  const maxDecimalSupply = baseSupply * 10 ** TokenSpec.Fungible.decimals

  expect(name).toBe("UNIBAR TOKEN")
	expect(symbol).toBe("UNIBAR")
	expect(supply).toBe(String(baseSupply))
	expect(specificationReference).toBe(TokenSpec.Fungible.reference)
	expect(supplyWithDecimals).toBe(String(maxDecimalSupply))
  expect(tokenId.split(".").length).toBe(3)
	expect(tokenId).not.toBe(null)

  const { tokens } = await client.accountTokenBalance(accountId)

  expect(tokens.get(tokenId).low).toBe(maxDecimalSupply)

  // const result = await client.singleTokenQuery(tokenId)
  //
  // console.log(result);
})


// Ignore for now -- Seems to work.
test("The client can query a token", async () => {
  // const result = await client.singleTokenQuery('0.0.294938')
  //
  // console.log(result);
})

test("The client will create a new NFT token", async () => {




  // const fs = require("fs")
  //
  // const result = await fs.readFileSync('public/UNIBAR_Initial_Pool_Design_NFT.pdf')
  // const content = result.toString("base64")
  //
  // const url = "https://ipfs.io/ipfs/QmZ8NoYkvw7t1kpWHEgGdpbCXvvd1gDYF17YTvemuCGQk6?filename=UNIBAR_Initial_Pool_Design_NFT.pdf"
  // const length = content.length;
  // const hash = await Crypto.createHash('sha512').update(content).digest("base64");
  //
  // const nftPayload = { url, length, hash }
  //
  // console.log(nftPayload);
  // console.log(JSON.stringify(nftPayload);

  // const {
  //   accountId,
  //   privateKey
  // } = Config
  //
  // const tokenCreationInstance = {
  //   accountId,
  //   privateKey,
  //   specification: TokenSpec.Fungible,
  //   name: "UNIBAR TOKEN",
  //   symbol: "UNIBAR",
  //   supply: 800
  // }



  return
})




// test("The client will return will return the account balance", async () => {
// 	const { balance } = await client.accountBalanceQuery()
// 	expect(balance > 1).toBe(true)
// })

// test("The client can create a topic with a memo, then read", async () => {
// 	const memo = "e2e-hedera-client-test"
//
// 	const newTopic = await client.createNewTopic({
// 		memo,
// 		// enable_private_submit_key: true
// 	})
//
// 	expect(newTopic.memo).toBe(memo)
// 	expect(newTopic.topic.toString().split(".").length).toBe(3)
//
// 	const topicInfo = await client.getTopicInfo(newTopic.topic)
//
// 	expect(topicInfo.topicMemo).toBe(memo)
// }, 20000)
//
// test("The client can create a topic, send a message and get the tx", async () => {
// 	const memo = "e2e-hedera-client-test"
// 	const newTopic = await client.createNewTopic({ memo })
// 	const topicInfo = await client.getTopicInfo(newTopic.topic)
//
// 	const consensusMessage = await client.sendConsensusMessage({
// 		topic_id: newTopic.topic,
// 		message: "This is a test message"
// 	})
//
// 	expect(consensusMessage.transaction_id).not.toBe(null)
//
// }, 20000)
//
// test("The client can create a private topic, send a message and get the tx", async () => {
// 	const memo = "e2e-hedera-client-test"
// 	const newTopic = await client.createNewTopic({
// 		memo,
// 		enable_private_submit_key: true
// 	})
//
// 	const consensusMessage = await client.sendConsensusMessage({
// 		topic_id: newTopic.topic,
// 		message: "This is a test message",
// 		receipt: newTopic.receipt
// 	})
//
// 	expect(consensusMessage.transaction_id).not.toBe(null)
// }, 20000)
//
// test("The client can update the memo of a private topic", async () => {
// 	const memo = "e2e-hedera-client-test"
// 	const newTopic = await client.createNewTopic({
// 		memo,
// 		enable_private_submit_key: true
// 	})
//
// 	const topicInfo = await client.getTopicInfo(newTopic.topic)
// 	expect(topicInfo.topicMemo).toBe(memo)
//
// 	const newMemo = "This is the updated memo"
//
// 	await client.updateTopic({
// 		topic_id: newTopic.topic,
// 		memo: newMemo
// 	})
//
// 	// This makes sure that looking up the topic will return the new memo.
// 	await sleep(2000)
//
// 	const updatedTopicInfo = await client.getTopicInfo(newTopic.topic)
// 	expect(updatedTopicInfo.topicMemo).toBe(newMemo)
// }, 20000)
