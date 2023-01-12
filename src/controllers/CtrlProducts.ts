import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';

import { Products } from '../data/repositories/Products';

export class CtrlProducts {
  async getAllProducts(req, res, next) {
    const db: BetterSQLite3Database = req.body.connection;
    const { limit, page } = req.query;

    const products = new Products(db);
    const data = await products.getAllProducts(+limit, +page);

    res.status(200).json({
      status: 'success',
      data,
    });
  }
}
