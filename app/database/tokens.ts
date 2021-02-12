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

function storeToken(token) {
  return prisma.token.create({
    data: token
  })
}

function addHolding(holding) {
  return prisma.holding.create({
    data: holding
  })
}

async function adjustHolding(holding) {

  const { accountId, tokenId, amount } = holding

  const current = await prisma.holding.findFirst({
    where: {
      accountId,
      tokenId
    }
  })

  if (!current) {
    return addHolding(holding)
  }

  return prisma.holding.update({
    where: { id: current.id },
    data: {
      ...current,
      // @ts-ignore
      amount: parseFloat(current.amount) + parseFloat(holding.amount)
    }
  })
}

function find(token_id) {
  return prisma.token.findFirst({
    where: {
      token_id
    },
    include: {
      Pool: {
        select: {
          tokenId: true,
          account: true,
          amount: true,
          id: true
        }
      }
    }
  })
}

function getUserTokenHolding(holdingQry) {
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
  getUserTokenHolding,
  adjustHolding
}


