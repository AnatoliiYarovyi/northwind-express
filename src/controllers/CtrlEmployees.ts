import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';
import { Request } from 'express';

import { Employees } from '../data/repositories/Employees';

export class CtrlEmployees {
  async getAllEmployees(req: Request, res, next) {
    const db: BetterSQLite3Database = req.body.connection;
    const { limit, page } = req.query;

    const employees = new Employees(db);
    const { sqlString, data } = await employees.getAllEmployees(+limit, +page);

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
        sqlString,
        data: changedName,
      },
    });
  }

  async getEmployeeById(req: Request, res, next) {
    const db: BetterSQLite3Database = req.body.connection;
    const employees = new Employees(db);
    const { id } = req.params;

    const { sqlString, data } = await employees.getEmployeeById(id);

    const { ReportsTo } = data[0];
    const { employeeAcceptsReport } = await employees.getEmployeeAcceptsReport(
      ReportsTo,
    );

    const changedName = data.reduce((acc, el) => {
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
        ReportsToId: el['Reports To'],
        'Reports To': `${employeeAcceptsReport[0].FirstName} ${employeeAcceptsReport[0].LastName}`,
      });
      return acc;
    }, []);

    res.status(200).json({
      status: 'success',
      data: {
        sqlString,
        data: changedName,
      },
    });
  }
}
