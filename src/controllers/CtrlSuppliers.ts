import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';

import { Suppliers } from '../data/repositories/Suppliers';

export class CtrlSuppliers {
  async getAllSuppliers(req, res, next) {
    const db: BetterSQLite3Database = req.body.connection;
    const suppliers = new Suppliers(db);
    const data = await suppliers.getAllSuppliers();

    res.status(200).json({
      status: 'success',
      data,
    });
  }
}
