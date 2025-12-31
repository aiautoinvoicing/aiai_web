import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import { users, customers, invoices, revenue } from "@/app/lib/placeholder-data";

export async function GET() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: { rejectUnauthorized: false }, // ⚠️ use CA cert in production
        });

        // 1. Users
        await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id CHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `);

        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await connection.execute(
                `INSERT IGNORE INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`,
                [user.id, user.name, user.email, hashedPassword]
            );
        }

        // 2. Customers
        await connection.execute(`
      CREATE TABLE IF NOT EXISTS customers (
        id CHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      )
    `);

        for (const customer of customers) {
            await connection.execute(
                `INSERT IGNORE INTO customers (id, name, email, image_url) VALUES (?, ?, ?, ?)`,
                [customer.id, customer.name, customer.email, customer.image_url]
            );
        }

        // 3. Invoices
        await connection.execute(`
      CREATE TABLE IF NOT EXISTS invoices (
        id CHAR(36) PRIMARY KEY,
        customer_id CHAR(36) NOT NULL,
        amount INT NOT NULL,
        status VARCHAR(255) NOT NULL,
        date DATE NOT NULL
      )
    `);

        for (const invoice of invoices) {
            await connection.execute(
                `INSERT IGNORE INTO invoices (id, customer_id, amount, status, date) VALUES (UUID(), ?, ?, ?, ?)`,
                [invoice.customer_id, invoice.amount, invoice.status, invoice.date]
            );
        }

        // 4. Revenue
        await connection.execute(`
  CREATE TABLE IF NOT EXISTS revenue (
    id CHAR(36) PRIMARY KEY,        -- add a primary key
    month VARCHAR(10) NOT NULL UNIQUE,
    revenue INT NOT NULL
  )
`);

        for (const rev of revenue) {
            await connection.execute(
                `INSERT IGNORE INTO revenue (id, month, revenue) VALUES (UUID(), ?, ?)`,
                [rev.month, rev.revenue]
            );
        }


        await connection.end();
        return NextResponse.json({ message: "Database seeded successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
