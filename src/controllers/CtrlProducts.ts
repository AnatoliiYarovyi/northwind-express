import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';
import { Request } from 'express';

import { Products } from '../data/repositories/Products';

export class CtrlProducts {
  async getAllProducts(req: Request, res, next) {
    const db: BetterSQLite3Database = req.body.connection;
    const { limit, page } = req.query;

    const products = new Products(db);
    const data = await products.getAllProducts(+limit, +page);

    res.status(200).json({
      status: 'success',
      data,
    });
  }

  async getProductsById(req: Request, res, next) {
    const db: BetterSQLite3Database = req.body.connection;
    const { id } = req.params;
    const products = new Products(db);
    const data = await products.getProductById(+id);

    res.status(200).json({
      status: 'success',
      data,
    });
  }
}
