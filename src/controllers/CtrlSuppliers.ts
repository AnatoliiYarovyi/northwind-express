import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';
import { Request } from 'express';

import { Suppliers } from '../data/repositories/Suppliers';

export class CtrlSuppliers {
  async getAllSuppliers(req: Request, res, next) {
    const db: BetterSQLite3Database = req.body.connection;
    const { limit, offset } = req.query;

    const suppliers = new Suppliers(db);
    const data = await suppliers.getAllSuppliers(+limit, +offset);

    res.status(200).json({
      status: 'success',
      data,
    });
  }

  async getSupplierById(req: Request, res, next) {
    const db: BetterSQLite3Database = req.body.connection;
    const { id } = req.params;
    const suppliers = new Suppliers(db);
    const data = await suppliers.getSupplierById(+id);

    res.status(200).json({
      status: 'success',
      data,
    });
  }
}
