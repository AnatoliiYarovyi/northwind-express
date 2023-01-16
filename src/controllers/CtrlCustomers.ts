import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';
import { Request } from 'express';

import { Customers } from '../data/repositories/Customers';
import { Metrics } from './Metrics';

export class CtrlCustomers {
  async getRowCount(req: Request, res, next) {
    const metrics = new Metrics();
    const db: BetterSQLite3Database = req.body.connection;
    const customers = new Customers(db);

    const time = metrics.startTime();
    const data = await customers.getRowCount();
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

  async getAllCustomers(req: Request, res, next) {
    const metrics = new Metrics();
    const db: BetterSQLite3Database = req.body.connection;
    const customers = new Customers(db);
    const { limit, page } = req.query;

    const time = metrics.startTime();
    const data = await customers.getAllCustomers(+limit, +page);
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

  async getCustomerById(req: Request, res, next) {
    const metrics = new Metrics();
    const db: BetterSQLite3Database = req.body.connection;
    const customers = new Customers(db);
    const { id } = req.params;

    const time = metrics.startTime();
    const data = await customers.getCustomersById(id);
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
