/*
  Warnings:

  - You are about to drop the column `query` on the `Alert` table. All the data in the column will be lost.
  - Added the required column `destination` to the `Alert` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Alert" DROP COLUMN "query",
ADD COLUMN     "destination" TEXT NOT NULL;
