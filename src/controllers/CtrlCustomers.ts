import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';
import { Request } from 'express';

import { Customers } from '../data/repositories/Customers';

export class CtrlCustomers {
  async getAllCustomers(req: Request, res, next) {
    const db: BetterSQLite3Database = req.body.connection;
    const { limit, page } = req.query;

    const customers = new Customers(db);
    const data = await customers.getAllCustomers(+limit, +page);

    res.status(200).json({
      status: 'success',
      data,
    });
  }

  async getCustomerById(req: Request, res, next) {
    const db: BetterSQLite3Database = req.body.connection;
    const { id } = req.params;

    const customers = new Customers(db);
    const data = await customers.getCustomersById(id);

    res.status(200).json({
      status: 'success',
      data,
    });
  }
}
