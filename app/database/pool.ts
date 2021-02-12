import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// type Pool = {
//   name: string; // Name of the symbol
//   tokenId: number;
//   amount: number; // Initially zer0
// }

type UpdatePoolAmount = {
  pool: object;
  amount: number;
}

function createPool(pool) {
  return prisma.pool.create({
    data: pool
  })
}

async function depositToPool(poolUpdate) {
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
}) {

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

function updatePoolAmount({
  pool,
  amount
}) {
  const updatedAmount =  parseFloat(pool.amount) - parseFloat(amount)

  return prisma.pool.update({
    where: {
      id: pool.id,
    },
    data: {
      amount: updatedAmount
    }
  })
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
        token_id: tokenId,
      }
    },
    include: {
      rewardLiquidityPool: {
        select: {
          amount: true,
          escrowTreasuryAccount: {
            select: {
              accountId: true,
              account: true
            }
          }
        }
      },
      token: {
        select: {
          id: true,
          creatorId: false,
          token_id: true,
          symbol: true,
          initial_price: true
        }
      },
      account: true
    }
  })
}


function all() {
  return prisma.pool.findMany({
    include: {
      token: true
    }
  })
}

function proxyRewardPool(id) {
  return prisma.account.findFirst({
    where: {
      id
    },
    include: {
      holdings: {
        include: {
          token: true
        }
      },
      EscrowTreasury: {
        include: {
          RewardLiquidityPool: {
            include: {
              Pool: {
                include: {
                  account: {
                    include: {
                      holdings: {
                        include: {
                          token: true
                        }
                      }
                    }
                  },
                }
              },
            }
          }
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
  getRewardLiquidityPool,
  updatePoolAmount,
  proxyRewardPool,
  all
}


