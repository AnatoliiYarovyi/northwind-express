import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';
import { eq } from 'drizzle-orm/expressions';

import { suppliers } from '../tables/suppliersTable';

export class Suppliers {
  private db: BetterSQLite3Database;

  constructor(db: BetterSQLite3Database) {
    this.db = db;
  }

  async getAllSuppliers(limit: number, page: number) {
    const sqlString = `SELECT SupplierID AS Id, CompanyName AS Company, ContactName AS Contact, ContactTitle AS Title, City, Country 
FROM Suppliers
LIMIT ?
OFFSET ?;`;

    const offset: number = (page - 1) * limit;
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
      .limit(limit)
      .offset(offset)
      .all();

    return { sqlString, data };
  }

  async getSupplierById(id: number) {
    const sqlString = `SELECT SupplierID AS Id, CompanyName AS Company, ContactName AS Contact, ContactTitle AS Title, Address, City, Region, PostalCode AS 'Postal Code', Country, Phone 
FROM Suppliers
WHERE SupplierID = ?;`;

    const data = await this.db
      .select(suppliers)
      .fields({
        Id: suppliers.supplierId,
        Company: suppliers.companyName,
        Contact: suppliers.contactName,
        Title: suppliers.contactTitle,
        Address: suppliers.address,
        City: suppliers.city,
        Region: suppliers.region,
        'Postal Code': suppliers.postalCode,
        Country: suppliers.country,
        Phone: suppliers.phone,
      })
      .where(eq(suppliers.supplierId, id))
      .all();

    return { sqlString, data };
  }
}
