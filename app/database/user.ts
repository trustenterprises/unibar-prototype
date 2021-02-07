import { PrismaClient } from "@prisma/client"
import Bcrypt from "app/utils/bcrypt";

const prisma = new PrismaClient()

type User = {
  eth_address: string,
  signature_password: string
}

type AppUser = {
  account: string,
  signature: string
}

function createUser(user: User) {
  return prisma.user.create({
    data: user
  })
}

async function hasUserAuth({
   account,
   signature
 }: AppUser) {
  const user = await prisma.user.findFirst({
    where: {
      eth_address: account
    },
    include: {
      accounts: {
        include:  {
          // mintedTokens: true, // Not needed
          holdings: true
        }
      }
    }
  })

  if (user) {
    const authed = Bcrypt.canAuthenticate(signature, user.signature_password)

    if (authed) {
      return user
    }
  }

  return false
}

async function getUserAndAccounts(appUser: AppUser) {
  return await hasUserAuth(appUser)
}

export default {
  hasUserAuth,
  createUser,
  getUserAndAccounts
}


