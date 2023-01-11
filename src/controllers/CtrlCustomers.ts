import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';

import { Customers } from '../data/repositories/Customers';

export class CtrlCustomers {
  async getAllCustomers(req, res, next) {
    const db: BetterSQLite3Database = req.body.connection;
    const customers = new Customers(db);
    const data = await customers.getAllCustomers();

    res.status(200).json({
      status: 'success',
      data,
    });
  }
}
