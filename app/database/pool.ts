import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type Pool = {
  name: string; // Name of the symbol
  tokenId: number;
  amount: number; // Initially zer0
}

type UpdatePoolAmount = {
  pool: object;
  amount: number;
}

function createPool(pool: Pool) {
  return prisma.pool.create({
    data: pool
  })
}

async function depositToPool(poolUpdate: UpdatePoolAmount) {
  return prisma.pool.update({
    where: { id: poolUpdate.pool.id },
    data: {
      amount: parseFloat(poolUpdate.pool.amount) + parseFloat(poolUpdate.amount)
    }
  })
}

type RewardLPPoolCreation = {
  escrowAccount: object;
  depositeeAccount: object;
  pool: object;
  price: number;
  amount: number;
}

async function createRewardLiquidityPool({
  escrowAccount,
  depositeeAccount,
  pool,
  price,
  amount
}: RewardLPPoolCreation) {

  const escrow = await prisma.escrowTreasury.create({
    data: { accountId: escrowAccount.id }
  })

  const rlpPool = await prisma.rewardLiquidityPool.create({
    data: {
      depositAccountId: depositeeAccount.id,
      poolId: pool.id,
      escrowTreasuryId: escrow.id,
      price,
      amount,
    }
  })

  return rlpPool
}

function getRewardLiquidityPool({
  account,
  pool
}) {
  return prisma.rewardLiquidityPool.findFirst({
    where: {
      depositAccountId: account.id,
      poolId: pool.id
    }
  })
}

function find(tokenId: string) {
  return prisma.pool.findFirst({
    where: {
      token: {
        token_id: tokenId
      }
    },
    include: {
      rewardLiquidityPool: true,
      token: {
        select: {
          creatorId: false,
          token_id: true,
          symbol: true,
        }
      }
    }
  })
}

export default {
  find,
  createPool,
  depositToPool,
  createRewardLiquidityPool,
  getRewardLiquidityPool
}


