import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';

import { customers } from '../tables/customersTable';

export class Customers {
  private db: BetterSQLite3Database;

  constructor(db: BetterSQLite3Database) {
    this.db = db;
  }

  async getAllCustomers() {
    const sqlString = `SELECT CompanyName AS Company, ContactName AS Contact, ContactTitle AS Title, City, Country 
FROM Customers;`;
    const data = await this.db
      .select(customers)
      .fields({
        Company: customers.companyName,
        Contact: customers.contactName,
        Title: customers.contactTitle,
        City: customers.city,
        Country: customers.country,
      })
      .all();

    return { sqlString, data };
  }
}
