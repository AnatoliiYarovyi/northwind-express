import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';

import { Orders } from '../data/repositories/Orders';

export class CtrlOrders {
  async getAllOrders(req, res, next) {
    const db: BetterSQLite3Database = req.body.connection;
    const orders = new Orders(db);
    const data = await orders.getAllOrders();

    res.status(200).json({
      status: 'success',
      data,
    });
  }
}
