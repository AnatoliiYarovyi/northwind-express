import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';
import { Request } from 'express';

import { Products } from '../data/repositories/Products';
import { Metrics } from './Metrics';

export class CtrlProducts {
  async getRowCount(req: Request, res, next) {
    const metrics = new Metrics();
    const db: BetterSQLite3Database = req.body.connection;
    const employees = new Products(db);

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

  async getAllProducts(req: Request, res, next) {
    const metrics = new Metrics();
    const db: BetterSQLite3Database = req.body.connection;
    const products = new Products(db);
    const { limit, page } = req.query;

    const time = metrics.startTime();
    const data = await products.getAllProducts(+limit, +page);
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

  async getProductsById(req: Request, res, next) {
    const metrics = new Metrics();
    const db: BetterSQLite3Database = req.body.connection;
    const products = new Products(db);
    const { id } = req.params;

    const time = metrics.startTime();
    const data = await products.getProductById(+id);
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

  async getSearchProducts(req: Request, res, next) {
    const metrics = new Metrics();
    const db: BetterSQLite3Database = req.body.connection;
    const products = new Products(db);
    const { value } = req.query;

    const time = metrics.startTime();
    const data = await products.getSearchProducts(`${value}`);
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
}
