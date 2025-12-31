import 'dotenv/config';
import bcrypt from 'bcrypt';
import { pool } from '../lib/mysql_db';
import { v4 as uuidv4 } from 'uuid';

// 👉 Replace with your actual placeholder-data imports
import { users, customers, invoices, revenue } from '../lib/placeholder-data';

async function seedUsers() {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )
  `);

    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const id = user.id || uuidv4();

        await pool.query(
            `INSERT INTO users (id, name, email, password)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE id=id`,
            [id, user.name, user.email, hashedPassword]
        );
    }
}

async function seedCustomers() {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS customers (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    )
  `);

    for (const customer of customers) {
        const id = customer.id || uuidv4();
        await pool.query(
            `INSERT INTO customers (id, name, email, image_url)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE id=id`,
            [id, customer.name, customer.email, customer.image_url]
        );
    }
}

async function seedInvoices() {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS invoices (
      id VARCHAR(36) PRIMARY KEY,
      customer_id VARCHAR(36) NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      FOREIGN KEY (customer_id) REFERENCES customers(id)
    )
  `);

    for (const invoice of invoices) {
        const id = uuidv4();
        await pool.query(
            `INSERT INTO invoices (id, customer_id, amount, status, date)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE id=id`,
            [id, invoice.customer_id, invoice.amount, invoice.status, invoice.date]
        );
    }
}

async function seedRevenue() {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) PRIMARY KEY,
      revenue INT NOT NULL
    )
  `);

    for (const rev of revenue) {
        await pool.query(
            `INSERT INTO revenue (month, revenue)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE month=month`,
            [rev.month, rev.revenue]
        );
    }
}

async function main() {
    try {
        await seedUsers();
        await seedCustomers();
        await seedInvoices();
        await seedRevenue();
        console.log('✅ Database seeded successfully');
    } catch (err) {
        console.error('❌ Error seeding database:', err);
    } finally {
        await pool.end();
    }
}

main();
