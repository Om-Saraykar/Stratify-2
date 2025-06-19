// app/api/health/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Your Prisma client instance

export async function GET() {
  try {
    // Attempt a simple, lightweight query to test the connection
    // For example, count users, or use Prisma's $queryRaw for a direct DB command
    await prisma.$queryRaw`SELECT 1`;
    // Or, if you prefer to test a model:
    // await prisma.user.count(); 

    console.log('Database connection successful!');
    return NextResponse.json({ status: 'Database Connected', message: 'Successfully connected to the database.' }, { status: 200 });
  } catch (error) {
    console.error('Database connection failed:', error);
    return NextResponse.json({ status: 'Database Disconnected', message: 'Failed to connect to the database.' }, { status: 500 });
  }
}