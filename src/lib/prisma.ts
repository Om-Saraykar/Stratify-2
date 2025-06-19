// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    // --- ADD THIS LOGGING TEMPORARILY ---
    console.log("Prisma connecting with URL:", process.env.DATABASE_URL ? "URL provided" : "URL NOT PROVIDED");
    if (process.env.DATABASE_URL) {
      console.log("First few chars of URL:", process.env.DATABASE_URL.substring(0, 50) + "...");
    }
    // --- END TEMPORARY LOGGING ---
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;