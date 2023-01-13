import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';
import { Request } from 'express';

import { Products } from '../data/repositories/Products';

export class CtrlProducts {
  async getRowCount(req: Request, res, next) {
    const db: BetterSQLite3Database = req.body.connection;
    const employees = new Products(db);

    const data = await employees.getRowCount();

    res.status(200).json({
      status: 'success',
      data,
    });
  }

  async getAllProducts(req: Request, res, next) {
    const db: BetterSQLite3Database = req.body.connection;
    const products = new Products(db);
    const { limit, page } = req.query;

    const data = await products.getAllProducts(+limit, +page);

    res.status(200).json({
      status: 'success',
      data,
    });
  }

  async getProductsById(req: Request, res, next) {
    const db: BetterSQLite3Database = req.body.connection;
    const products = new Products(db);
    const { id } = req.params;
    const data = await products.getProductById(+id);

    res.status(200).json({
      status: 'success',
      data,
    });
  }
}
