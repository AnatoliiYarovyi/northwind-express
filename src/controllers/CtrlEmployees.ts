import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';
import { Request } from 'express';

import { Employees } from '../data/repositories/Employees';
import { Metrics } from './Metrics';

export class CtrlEmployees {
  async getRowCount(req: Request, res, next) {
    const metrics = new Metrics();
    const db: BetterSQLite3Database = req.body.connection;
    const employees = new Employees(db);

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

  async getAllEmployees(req: Request, res, next) {
    const metrics = new Metrics();
    const db: BetterSQLite3Database = req.body.connection;
    const employees = new Employees(db);
    const { limit, page } = req.query;

    const time = metrics.startTime();
    const { sqlString, data } = await employees.getAllEmployees(+limit, +page);
    const duration = metrics.stopTime(time);
    const changedName = data.reduce((acc, el) => {
      acc.push({
        Id: el.Id,
        Name: `${el.FirstName} ${el.LastName}`,
        Title: el.Title,
        City: el.City,
        Phone: el.Phone,
        Country: el.Country,
      });
      return acc;
    }, []);

    res.status(200).json({
      status: 'success',
      data: {
        duration,
        ts: metrics.timeStamp(),
        servedBy: 'northwind.db',
        sqlString,
        data: changedName,
      },
    });
  }

  async getEmployeeById(req: Request, res, next) {
    const metrics = new Metrics();
    const db: BetterSQLite3Database = req.body.connection;
    const employees = new Employees(db);
    const { id } = req.params;

    const time = metrics.startTime();
    const { sqlString, data } = await employees.getEmployeeById(id);

    let changedName: {}[];
    if (data[0] === undefined) {
      changedName = [];
    } else {
      const { ReportsToId } = data[0];
      const { employeeAcceptsReport } =
        await employees.getEmployeeAcceptsReport(ReportsToId);

      changedName = data.reduce((acc, el) => {
        acc.push({
          Id: el.Id,
          Name: `${el.FirstName} ${el.LastName}`,
          Title: el.Title,
          'Title Of Courtesy': el['Title Of Courtesy'],
          'Birth Date': el['Birth Date'],
          'Hire Date': el['Hire Date'],
          Address: el.Address,
          City: el.City,
          'Postal Code': el['Postal Code'],
          Country: el.Country,
          'Home Phone': el['Home Phone'],
          Extension: el.Extension,
          Notes: el.Notes,
          ReportsToId: employeeAcceptsReport[0].Id,
          'Reports To': `${employeeAcceptsReport[0].FirstName} ${employeeAcceptsReport[0].LastName}`,
        });
        return acc;
      }, []);
    }
    const duration = metrics.stopTime(time);

    res.status(200).json({
      status: 'success',
      data: {
        duration,
        ts: metrics.timeStamp(),
        servedBy: 'northwind.db',
        sqlString,
        data: changedName,
      },
    });
  }
}
