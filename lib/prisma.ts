import { PrismaClient } from '@/prisma/generated/mysql-client';

// Ensure a single PrismaClient instance in development (to avoid exhausting connections
// during HMR / fast refresh). In production we create a normal instance.
declare global {
  // eslint-disable-next-line no-var
  var __mysql_prisma: PrismaClient | undefined;
}

const prisma = globalThis.__mysql_prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__mysql_prisma = prisma;
}

export default prisma;
