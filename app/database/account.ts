import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type Account = {
  userId: number,
  hedera_id: string | null,
  enc_skey: string,
  public_key: string
}

function accountExists(hedera_id: string) {
  return prisma.account.findFirst({
    where: {
      hedera_id
    }
  })
}

function createHederaAccount(account: Account) {
  return prisma.account.create({
    data: account
  })
}

export default {
  createHederaAccount,
  accountExists
}


