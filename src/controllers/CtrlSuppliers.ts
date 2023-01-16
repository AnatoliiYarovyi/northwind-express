import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';
import { Request } from 'express';

import { Suppliers } from '../data/repositories/Suppliers';
import { Metrics } from './Metrics';

export class CtrlSuppliers {
  async getRowCount(req: Request, res, next) {
    const metrics = new Metrics();
    const db: BetterSQLite3Database = req.body.connection;
    const employees = new Suppliers(db);

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

  async getAllSuppliers(req: Request, res, next) {
    const metrics = new Metrics();
    const db: BetterSQLite3Database = req.body.connection;
    const suppliers = new Suppliers(db);
    const { limit, page } = req.query;

    const time = metrics.startTime();
    const data = await suppliers.getAllSuppliers(+limit, +page);
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

  async getSupplierById(req: Request, res, next) {
    const metrics = new Metrics();
    const db: BetterSQLite3Database = req.body.connection;
    const suppliers = new Suppliers(db);
    const { id } = req.params;

    const time = metrics.startTime();
    const data = await suppliers.getSupplierById(+id);
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
