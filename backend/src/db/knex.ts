import knex from 'knex';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

export const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.join(__dirname, '../../database.sqlite')
    },
    useNullAsDefault: true,
    pool: { min: 0, max: 10 },
});
