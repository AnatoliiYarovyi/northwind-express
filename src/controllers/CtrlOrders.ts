import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';
import { Request } from 'express';

import { Orders } from '../data/repositories/Orders';
import { Metrics } from './Metrics';

export class CtrlOrders {
  async getRowCount(req: Request, res, next) {
    const metrics = new Metrics();
    const db: BetterSQLite3Database = req.body.connection;
    const employees = new Orders(db);

    const time = metrics.startTime();
    const data = await employees.getRowCount();
    const duration = metrics.stopTime(time);

    res.status(200).json({
      status: 'success',
      data: {
        duration,
        ts: metrics.timeStamp(),
        servedBy: 'northwind.db',
        sqlString: data.sqlString,
        data: data.data,
      },
    });
  }

  async getAllOrders(req: Request, res, next) {
    const metrics = new Metrics();
    const db: BetterSQLite3Database = req.body.connection;
    const orders = new Orders(db);
    const { limit, page } = req.query;

    const time = metrics.startTime();
    const data = await orders.getAllOrders(+limit, +page);
    const duration = metrics.stopTime(time);

    res.status(200).json({
      status: 'success',
      data: {
        duration,
        ts: metrics.timeStamp(),
        servedBy: 'northwind.db',
        sqlString: data.sqlString,
        data: data.data,
      },
    });
  }

  async getOrderById(req: Request, res, next) {
    const metrics = new Metrics();
    const db: BetterSQLite3Database = req.body.connection;
    const orders = new Orders(db);
    const { id } = req.params;

    const timeOrder = metrics.startTime();
    let orderInformation: { sqlString: string; data: {}[] };
    const data = await orders.orderInformationById(+id);
    if (data.data[0].Id === null) {
      orderInformation = {
        sqlString: data.sqlString,
        data: [],
      };
    } else {
      orderInformation = data;
    }
    const durationOrder = metrics.stopTime(timeOrder);

    const timeProducts = metrics.startTime();
    const productsInOrder = await orders.productsInOrderById(+id);
    const durationProducts = metrics.stopTime(timeProducts);

    res.status(200).json({
      status: 'success',
      orderInformation: {
        durationOrder,
        ts: metrics.timeStamp(),
        servedBy: 'northwind.db',
        sqlString: orderInformation.sqlString,
        data: orderInformation.data,
      },
      productsInOrder: {
        durationProducts,
        ts: metrics.timeStamp(),
        servedBy: 'northwind.db',
        sqlString: productsInOrder.sqlString,
        data: productsInOrder.data,
      },
    });
  }
}
