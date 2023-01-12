import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';

import { customers } from '../tables/customersTable';

export class Customers {
  private db: BetterSQLite3Database;

  constructor(db: BetterSQLite3Database) {
    this.db = db;
  }

  async getAllCustomers(limit: number, offset: number) {
    const sqlString = `SELECT CompanyName AS Company, ContactName AS Contact, ContactTitle AS Title, City, Country 
FROM Customers
LIMIT ?
OFFSET ?;`;

    const data = await this.db
      .select(customers)
      .fields({
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
}
