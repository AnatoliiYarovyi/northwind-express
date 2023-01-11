import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';

import { products } from '../tables/productsTable';

export class Products {
  private db: BetterSQLite3Database;

  constructor(db: BetterSQLite3Database) {
    this.db = db;
  }

  async getAllProducts() {
    const sqlString = `SELECT ProductID AS Id, ProductName AS Name, QuantityPerUnit AS 'Qt per unit', UnitPrice AS Price, UnitsInStock AS Stock, UnitsOnOrder AS Orders 
    FROM Products;`;
    const data = await this.db
      .select(products)
      .fields({
        Id: products.productId,
        Name: products.productName,
        'Qt per unit': products.quantityPerUnit,
        Price: products.unitPrice,
        Stock: products.unitsInStock,
        Orders: products.unitsOnOrder,
      })
      .all();

    return { sqlString, data };
  }
}