import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';

import { suppliers } from '../tables/suppliersTable';

export class Suppliers {
  private db: BetterSQLite3Database;

  constructor(db: BetterSQLite3Database) {
    this.db = db;
  }

  async getAllSuppliers() {
    const sqlString = `SELECT SupplierID AS Id, CompanyName AS Company, ContactName AS Contact, ContactTitle AS Title, City, Country 
    FROM Suppliers;`;
    const data = await this.db
      .select(suppliers)
      .fields({
        Id: suppliers.supplierId,
        Company: suppliers.companyName,
        Contact: suppliers.contactName,
        Title: suppliers.contactTitle,
        City: suppliers.city,
        Country: suppliers.country,
      })
      .all();

    return { sqlString, data };
  }
}
