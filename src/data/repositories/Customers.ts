import { sql } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';
import { eq, like } from 'drizzle-orm/expressions';

import { connecting } from '../../db/connecting';
import { customers } from '../tables/customersTable';

export class Customers {
  private db: BetterSQLite3Database = connecting();
  private getOffset(limit: number, page: number): number {
    return (page - 1) * limit;
  }

  async getRowCount() {
    const sqlString = `SELECT COUNT(*)
FROM Customers;`;
    const data = this.db
      .select(customers)
      .fields({
        RowCount: sql`count(${customers.customerId})`.as<number>(),
      })
      .all();

    return { sqlString, data };
  }

  async getAllCustomers(limit: number, page: number) {
    const offset = this.getOffset(page, limit);
    const sqlString = `SELECT CustomerId AS Id, CompanyName AS Company, ContactName AS Contact, ContactTitle AS Title, City, Country 
FROM Customers
LIMIT ${limit}
OFFSET ${offset};`;

    const data = this.db
      .select(customers)
      .fields({
        Id: customers.customerId,
        Company: customers.companyName,
        Contact: customers.contactName,
        Title: customers.contactTitle,
        City: customers.city,
        Country: customers.country,
      })
      .limit(limit)
      .offset(offset)
      .all();

    return { sqlString, data };
  }

  async getCustomersById(id: string) {
    const sqlString = `SELECT CustomerID AS Id, CompanyName AS 'Company Name', ContactName AS 'Contact Name', ContactTitle AS 'Contact Title',
Address, City, PostalCode AS 'Postal Code', Region, Country, Phone, Fax  
FROM Customers
WHERE CustomerID = '${id}';`;

    const data = this.db
      .select(customers)
      .fields({
        Id: customers.customerId,
        'Company Name': customers.companyName,
        'Contact Name': customers.contactName,
        'Contact Title': customers.contactTitle,
        Address: customers.address,
        City: customers.city,
        'Postal Code': customers.postalCode,
        Region: customers.region,
        Country: customers.country,
        Phone: customers.phone,
        Fax: customers.fax,
      })
      .where(eq(customers.customerId, id))
      .all();

    return { sqlString, data };
  }

  getSearchCustomers = async (value: string) => {
    const sqlString = `SELECT CustomerID AS Id, CompanyName AS Name, ContactName AS Contact, ContactTitle AS Title, Phone 
FROM Customers
WHERE Customers.CompanyName LIKE '%${value}%'`;
    const data = this.db
      .select(customers)
      .fields({
        Id: customers.customerId,
        Name: customers.companyName,
        Contact: customers.contactName,
        Title: customers.contactTitle,
        Phone: customers.phone,
      })
      .where(like(customers.companyName, `%${value}%`))
      .all();

    return {
      sqlString,
      data,
    };
  };
}
