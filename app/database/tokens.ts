import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type TokenStore = {
  initial_price: number;
  asset_contract: string | null;
  is_synthetic: boolean;
  symbol: string;
  supply: string;
  decimals: number;
  supplyWithDecimals: string;
  token_id: string;
  spec_ref: string;
  has_kyc: boolean;
  has_freeze: boolean;
  creatorId: number;
}

type Holding = {
  tokenId: number;
  amount: string;
  accountId: number;
}

function storeToken(token: TokenStore) {
  return prisma.token.create({
    data: token
  })
}

function addHolding(holding: Holding) {
  return prisma.holding.create({
    data: holding
  })
}

function find(token_id: String) {
  return prisma.token.findFirst({
    where: {
      token_id
    },
    include: {
      Pool: {
        select: {
          tokenId: true,
          account: true
        }
      }
    }
  })
}

function getUserTokenHolding(holdingQry: Holding) {
  return prisma.holding.findFirst({
    where: {
      tokenId: holdingQry.tokenId,
      accountId: holdingQry.accountId
    },
    include: {
      token: true
    }
  })
}

export default {
  storeToken,
  addHolding,
  find,
  getUserTokenHolding
}


