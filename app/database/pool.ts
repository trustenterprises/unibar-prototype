import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type Pool = {
  name: string; // Name of the symbol
  tokenId: number;
  amount: number; // Initially zer0
}

function createPool(pool: Pool) {
  return prisma.pool.create({
    data: pool
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

// When tokens are added to a pool, depositi
function depositToPool(pool: Pool) {

}

export default {
  find,
  createPool,
  // addToPool
}


