-- CreateTable
CREATE TABLE "user" (
    "_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT,
    "image" TEXT,
    "emailVerified" BOOLEAN,

    CONSTRAINT "user_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "account" (
    "_id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "token_type" TEXT,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "id_token" TEXT,
    "scope" TEXT,
    "session_state" TEXT,
    "expires_at" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "s3ImageId" TEXT NOT NULL,
    "creatorId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "account_provider_providerAccountId_key" ON "account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_s3ImageId_key" ON "Product"("s3ImageId");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
