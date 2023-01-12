import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';

import { employees } from '../tables/employeesTable';

export class Employees {
  private db: BetterSQLite3Database;

  constructor(db: BetterSQLite3Database) {
    this.db = db;
  }

  async getAllEmployees(limit: number, offset: number) {
    const sqlString = `SELECT EmployeeID AS Id, FirstName AS Name, LastName, Title, City, HomePhone AS Phone, Country  
FROM Employees
LIMIT ?
OFFSET ?;`;

    const data = await this.db
      .select(employees)
      .fields({
        Id: employees.employeeId,
        FirstName: employees.firstName,
        LastName: employees.lastName,
        Title: employees.title,
        City: employees.city,
        Phone: employees.homePhone,
        Country: employees.country,
      })
      .limit(limit)
      .offset(offset)
      .all();

    return { sqlString, data };
  }
}
