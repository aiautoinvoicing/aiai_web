import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

// Load SSL cert if available (Aiven usually provides ca.pem)
let ssl: any = undefined;
if (process.env.DB_SSL_CA_PATH) {
    const caPath = path.resolve(process.cwd(), process.env.DB_SSL_CA_PATH);
    ssl = {
        ca: fs.readFileSync(caPath),
    };
} else {
    // fallback if no CA file — accepts the server cert (less secure)
    ssl = { rejectUnauthorized: false };
}

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl,
    connectionLimit: 10, // adjust as needed
});
