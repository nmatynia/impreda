/*
  Warnings:

  - Added the required column `hex` to the `Color` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Color" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "hex" TEXT NOT NULL,
    "available" INTEGER NOT NULL,
    "itemId" TEXT NOT NULL,
    CONSTRAINT "Color_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Color" ("available", "id", "itemId", "name") SELECT "available", "id", "itemId", "name" FROM "Color";
DROP TABLE "Color";
ALTER TABLE "new_Color" RENAME TO "Color";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
