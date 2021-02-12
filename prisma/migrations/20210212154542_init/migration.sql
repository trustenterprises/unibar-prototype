-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "eth_address" TEXT NOT NULL,
    "signature_password" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "hedera_id" TEXT NOT NULL,
    "public_key" TEXT NOT NULL,
    "enc_skey" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "initial_price" DECIMAL(65,30) NOT NULL,
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

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Holding" (
    "id" SERIAL NOT NULL,
    "tokenId" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "accountId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pool" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tokenId" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "accountId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewardLiquidityPool" (
    "id" SERIAL NOT NULL,
    "depositAccountId" INTEGER NOT NULL,
    "price" DECIMAL(65,30),
    "poolId" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "escrowTreasuryId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EscrowTreasury" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewardLiquidityPreference" (
    "id" SERIAL NOT NULL,
    "liquidityPoolId" INTEGER NOT NULL,
    "poolId" INTEGER NOT NULL,
    "tokenId" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.eth_address_unique" ON "User"("eth_address");

-- CreateIndex
CREATE UNIQUE INDEX "Account.hedera_id_unique" ON "Account"("hedera_id");

-- CreateIndex
CREATE UNIQUE INDEX "Token.token_id_unique" ON "Token"("token_id");

-- AddForeignKey
ALTER TABLE "Account" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD FOREIGN KEY ("creatorId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD FOREIGN KEY ("tokenId") REFERENCES "Token"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pool" ADD FOREIGN KEY ("tokenId") REFERENCES "Token"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pool" ADD FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardLiquidityPool" ADD FOREIGN KEY ("depositAccountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardLiquidityPool" ADD FOREIGN KEY ("poolId") REFERENCES "Pool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardLiquidityPool" ADD FOREIGN KEY ("escrowTreasuryId") REFERENCES "EscrowTreasury"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EscrowTreasury" ADD FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardLiquidityPreference" ADD FOREIGN KEY ("liquidityPoolId") REFERENCES "RewardLiquidityPool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardLiquidityPreference" ADD FOREIGN KEY ("poolId") REFERENCES "Pool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardLiquidityPreference" ADD FOREIGN KEY ("tokenId") REFERENCES "Token"("id") ON DELETE CASCADE ON UPDATE CASCADE;
