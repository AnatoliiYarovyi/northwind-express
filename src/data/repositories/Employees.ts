import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';

import { employees } from '../tables/employeesTable';

export class Employees {
  private db: BetterSQLite3Database;

  constructor(db: BetterSQLite3Database) {
    this.db = db;
  }

  async getAllEmployees() {
    const sqlString = `SELECT EmployeeID AS Id, FirstName AS Name, LastName, Title, City, HomePhone AS Phone, Country  
FROM Employees;`;
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
      .all();

    return { sqlString, data };
  }
}