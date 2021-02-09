import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type Account = {
  userId: number,
  hedera_id: string | null,
  enc_skey: string,
  public_key: string
}

function createHederaAccount(account: Account) {
  return prisma.account.create({
    data: account
  })
}

export default {
  createHederaAccount
}


