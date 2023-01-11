import { sql } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';
import { and, asc, desc, eq, or } from 'drizzle-orm/expressions';
import { orderDetails } from '../tables/orderDetailsTable';

import { orders } from '../tables/ordersTable';
import { products } from '../tables/productsTable';

export class Orders {
  private db: BetterSQLite3Database;

  constructor(db: BetterSQLite3Database) {
    this.db = db;
  }

  async getAllOrders() {
    const sqlString = `SELECT o.OrderID AS Id, (od.Quantity * p.UnitPrice) AS 'Total Price', od.ProductID AS Products, od.Quantity AS Quantity, ShippedDate AS Shipped, ShipName  AS 'Ship Name', ShipCity AS City, ShipCountry AS Country
FROM Orders AS o
JOIN OrderDetails AS od ON o.OrderID = od.OrderID
JOIN Products AS p ON od.ProductID = p.ProductID;`;
    const data = await this.db
      .select(orders)
      .fields({
        Id: orders.orderId,
        'Total Price':
          sql`(${orderDetails.quantity} * ${products.unitPrice})`.as<number>(),
        Products: orderDetails.productId,
        Quantity: orderDetails.quantity,
        Shipped: orders.shippedDate,
        'Ship Name': orders.shipName,
        City: orders.shipCity,
        Country: orders.shipCountry,
      })
      .leftJoin(orderDetails, eq(orders.orderId, orderDetails.orderId))
      .leftJoin(products, eq(orderDetails.productId, products.productId))
      .all();

    return { sqlString, data };
  }
}
