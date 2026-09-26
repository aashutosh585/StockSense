import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@generated/prisma/client";
import pg from "pg";

declare global {
  var prismaDB: PrismaClient | undefined;
  var prismaPool: pg.Pool | undefined;
}

const connectionString = `${process.env.DATABASE_URL}`;
const pool = globalThis.prismaPool || new pg.Pool({ connectionString });

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaPool = pool;
}

const adapter = new PrismaPg(pool);

export const db = globalThis.prismaDB || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaDB = db;
}
