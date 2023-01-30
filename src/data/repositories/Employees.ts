import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';
import { eq } from 'drizzle-orm/expressions';
import { sql } from 'drizzle-orm';

import { connecting } from '../../db/connecting';
import { employees } from '../tables/employeesTable';

export class Employees {
  private db: BetterSQLite3Database = connecting();
  private getOffset(limit: number, page: number): number {
    return (page - 1) * limit;
  }

  async getRowCount() {
    const sqlString = `SELECT COUNT(*)
FROM Employees;`;
    const data = this.db
      .select(employees)
      .fields({
        RowCount: sql`count(${employees.employeeId})`.as<number>(),
      })
      .all();

    return { sqlString, data };
  }

  async getAllEmployees(limit: number, page: number) {
    const offset = this.getOffset(page, limit);
    const sqlString = `SELECT EmployeeID AS Id, FirstName AS Name, LastName, Title, City, HomePhone AS Phone, Country  
FROM Employees
LIMIT ${limit}
OFFSET ${offset};`;

    const data = this.db
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

  async getEmployeeById(id: string) {
    const sqlString = `SELECT EmployeeID AS Id, FirstName, LastName, Title, TitleOfCourtesy AS 'Title Of Courtesy', BirthDate AS 'Birth Date', 
HireDate AS 'Hire Date', Address, City, PostalCode AS 'Postal Code', Country, HomePhone AS 'Home Phone', Extension, Notes, 
(SELECT FirstName FROM Employees WHERE ReportsTo = EmployeeID) AS 'Reports To'
FROM Employees 
WHERE EmployeeID = ${id};`;

    const data = this.db
      .select(employees)
      .fields({
        Id: employees.employeeId,
        FirstName: employees.firstName,
        LastName: employees.lastName,
        Title: employees.title,
        'Title Of Courtesy': employees.titleOfCourtesy,
        'Birth Date': employees.birthDate,
        'Hire Date': employees.hireDate,
        Address: employees.address,
        City: employees.city,
        'Postal Code': employees.postalCode,
        Country: employees.country,
        'Home Phone': employees.homePhone,
        Extension: employees.extension,
        Notes: employees.notes,
        ReportsToId: employees.reportsTo,
      })
      .where(eq(employees.employeeId, id))
      .all();

    return { sqlString, data };
  }

  async getEmployeeAcceptsReport(id: number) {
    const sqlString = `SELECT EmployeeID AS Id, FirstName, LastName 
FROM Employees
WHERE EmployeeID = ${id};`;
    const employeeAcceptsReport = this.db
      .select(employees)
      .fields({
        Id: employees.employeeId,
        FirstName: employees.firstName,
        LastName: employees.lastName,
      })
      .where(eq(employees.employeeId, `${id}`))
      .all();

    return { sqlString, employeeAcceptsReport };
  }
}
