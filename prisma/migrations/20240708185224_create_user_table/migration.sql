-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publicKey" TEXT,
    "privateKey" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
