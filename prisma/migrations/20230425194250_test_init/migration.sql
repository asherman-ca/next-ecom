-- CreateTable
CREATE TABLE "Todo" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" STRING NOT NULL,
    "done" BOOL NOT NULL DEFAULT false,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
