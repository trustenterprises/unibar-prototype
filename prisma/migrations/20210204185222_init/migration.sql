-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eth_address" TEXT NOT NULL,
    "signature_password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "hedera_id" TEXT NOT NULL,
    "public_key" TEXT NOT NULL,
    "enc_skey" TEXT NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Token" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "initial_price" REAL NOT NULL,
    "asset_contract" TEXT,
    "is_synthetic" BOOLEAN NOT NULL DEFAULT false,
    "symbol" TEXT NOT NULL,
    "supply" TEXT NOT NULL,
    "decimals" INTEGER NOT NULL,
    "supplyWithDecimals" TEXT NOT NULL,
    "token_id" TEXT NOT NULL,
    "spec_ref" TEXT NOT NULL,
    "has_kyc" BOOLEAN NOT NULL DEFAULT false,
    "has_freeze" BOOLEAN NOT NULL DEFAULT false,
    "creatorId" INTEGER NOT NULL,
    FOREIGN KEY ("creatorId") REFERENCES "Account" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Holding" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tokenId" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "accountId" INTEGER,
    FOREIGN KEY ("tokenId") REFERENCES "Token" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pool" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "tokenId" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    FOREIGN KEY ("tokenId") REFERENCES "Token" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RewardLiquidityPool" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "depositAccountId" INTEGER NOT NULL,
    "poolId" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "escrowTreasuryId" INTEGER NOT NULL,
    FOREIGN KEY ("depositAccountId") REFERENCES "Account" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("poolId") REFERENCES "Pool" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("escrowTreasuryId") REFERENCES "EscrowTreasury" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EscrowTreasury" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accountId" INTEGER NOT NULL,
    FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RewardLiquidityPreference" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "liquidityPoolId" INTEGER NOT NULL,
    "poolId" INTEGER NOT NULL,
    "tokenId" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    FOREIGN KEY ("liquidityPoolId") REFERENCES "RewardLiquidityPool" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("poolId") REFERENCES "Pool" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("tokenId") REFERENCES "Token" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User.eth_address_unique" ON "User"("eth_address");

-- CreateIndex
CREATE UNIQUE INDEX "Account.hedera_id_unique" ON "Account"("hedera_id");

-- CreateIndex
CREATE UNIQUE INDEX "Token.token_id_unique" ON "Token"("token_id");
