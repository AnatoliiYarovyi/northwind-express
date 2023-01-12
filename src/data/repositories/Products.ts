import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';

import { products } from '../tables/productsTable';

export class Products {
  private db: BetterSQLite3Database;

  constructor(db: BetterSQLite3Database) {
    this.db = db;
  }

  async getAllProducts(limit: number, page: number) {
    const sqlString = `SELECT ProductID AS Id, ProductName AS Name, QuantityPerUnit AS 'Qt per unit', UnitPrice AS Price, UnitsInStock AS Stock, UnitsOnOrder AS Orders 
FROM Products
LIMIT ?
OFFSET ?;`;

    const offset: number = (page - 1) * limit;
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
      .limit(limit)
      .offset(offset)
      .all();

    return { sqlString, data };
  }
}
