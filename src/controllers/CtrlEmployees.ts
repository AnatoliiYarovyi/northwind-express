import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';

import { Employees } from '../data/repositories/Employees';

export class CtrlEmployees {
  async getAllEmployees(req, res, next) {
    const db: BetterSQLite3Database = req.body.connection;
    const { limit, page } = req.query;

    const employees = new Employees(db);
    const { sqlString, data } = await employees.getAllEmployees(
      +limit,
      +page,
    );

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
}
