import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';
import { Request } from 'express';

import { Orders } from '../data/repositories/Orders';

export class CtrlOrders {
  async getRowCount(req: Request, res, next) {
    const db: BetterSQLite3Database = req.body.connection;
    const employees = new Orders(db);

    const data = await employees.getRowCount();

    res.status(200).json({
      status: 'success',
      data,
    });
  }

  async getAllOrders(req: Request, res, next) {
    const db: BetterSQLite3Database = req.body.connection;
    const orders = new Orders(db);
    const { limit, page } = req.query;

    const data = await orders.getAllOrders(+limit, +page);

    res.status(200).json({
      status: 'success',
      data,
    });
  }

  async getOrderById(req: Request, res, next) {
    const db: BetterSQLite3Database = req.body.connection;
    const orders = new Orders(db);
    const { id } = req.params;

    const orderInformation = await orders.orderInformationById(+id);
    const productsInOrder = await orders.productsInOrderById(+id);

    res.status(200).json({
      status: 'success',
      orderInformation,
      productsInOrder,
    });
  }
}
