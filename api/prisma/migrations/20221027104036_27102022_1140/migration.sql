/*
  Warnings:

  - The primary key for the `subscription` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `subscription` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_id_fkey";

-- AlterTable
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_pkey",
DROP COLUMN "id",
ADD COLUMN     "subscriptionId" SERIAL NOT NULL,
ADD CONSTRAINT "subscription_pkey" PRIMARY KEY ("subscriptionId");

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
