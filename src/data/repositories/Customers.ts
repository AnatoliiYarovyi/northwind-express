import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';
import { eq } from 'drizzle-orm/expressions';

import { customers } from '../tables/customersTable';

export class Customers {
  private db: BetterSQLite3Database;

  constructor(db: BetterSQLite3Database) {
    this.db = db;
  }

  async getAllCustomers(limit: number, page: number) {
    const offset: number = (page - 1) * limit;
    const sqlString = `SELECT CustomerId AS Id, CompanyName AS Company, ContactName AS Contact, ContactTitle AS Title, City, Country 
FROM Customers
LIMIT ${limit}
OFFSET ${offset};`;

    const data = await this.db
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

    const data = await this.db
      .select(customers)
      .fields({
        Id: customers.customerId,
        'Company Name': customers.companyName,
        'Contact Name': customers.contactName,
        'Contact Title': customers.contactTitle,
        Adress: customers.address,
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
}
