import { sql } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';
import { eq, like } from 'drizzle-orm/expressions';

import { connecting } from '../../db/connecting';
import { products } from '../tables/productsTable';
import { suppliers } from '../tables/suppliersTable';

export class Products {
  private db: BetterSQLite3Database = connecting();
  private getOffset(limit: number, page: number): number {
    return (page - 1) * limit;
  }

  async getRowCount() {
    const sqlString = `SELECT COUNT(*)
FROM Products;`;
    const data = this.db
      .select(products)
      .fields({
        RowCount: sql`count(${products.productId})`.as<number>(),
      })
      .all();

    return { sqlString, data };
  }

  async getAllProducts(limit: number, page: number) {
    const offset = this.getOffset(page, limit);
    const sqlString = `SELECT ProductID AS Id, ProductName AS Name, QuantityPerUnit AS 'Qt per unit', UnitPrice AS Price, UnitsInStock AS Stock, UnitsOnOrder AS Orders 
FROM Products
LIMIT ${limit}
OFFSET ${offset};`;

    const data = this.db
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

  async getProductById(id: number) {
    const sqlString = `SELECT ProductID AS Id, ProductName AS Name, s.CompanyName AS Supplier, QuantityPerUnit AS 'Qt per unit', UnitPrice AS 'Unit price', 
UnitsInStock AS 'Units in stock', UnitsOnOrder AS 'Units on order', ReorderLevel AS 'Reorder level', Discontinued 
FROM Products AS p
JOIN Suppliers AS s ON p.SupplierID = s.SupplierID 
WHERE Id = ?;`;

    const data = this.db
      .select(products)
      .fields({
        Id: products.productId,
        ProductName: products.productName,
        SupplierId: suppliers.supplierId,
        Supplier: suppliers.companyName,
        'Quantity per unit': products.quantityPerUnit,
        'Unit price': products.unitPrice,
        'Units in stock': products.unitsInStock,
        'Units on order': products.unitsOnOrder,
        'Reorder level': products.reorderLevel,
        Discontinued: products.discontinued,
      })
      .leftJoin(suppliers, eq(products.supplierId, suppliers.supplierId))
      .where(eq(products.productId, id))
      .all();

    return { sqlString, data };
  }

  getSearchProducts = async (value: string) => {
    const sqlString = `SELECT ProductID AS Id, ProductName AS Name, QuantityPerUnit AS 'Quantity Per Unit', UnitPrice AS Price, UnitsInStock AS Stock
FROM Products
WHERE Products.ProductName LIKE '%${value}%';`;
    const data = this.db
      .select(products)
      .fields({
        Id: products.productId,
        Name: products.productName,
        'Qt per unit': products.quantityPerUnit,
        Price: products.unitPrice,
        Stock: products.unitsInStock,
      })
      .where(like(products.productName, `%${value}%`))
      .all();

    return {
      sqlString,
      data,
    };
  };
}
