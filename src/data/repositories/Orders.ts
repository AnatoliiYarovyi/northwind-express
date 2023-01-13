import { sql } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';
import { and, asc, desc, eq, or } from 'drizzle-orm/expressions';
import { orderDetails } from '../tables/orderDetailsTable';

import { orders } from '../tables/ordersTable';
import { products } from '../tables/productsTable';
import { shippers } from '../tables/shippersTable';

export class Orders {
  private db: BetterSQLite3Database;

  constructor(db: BetterSQLite3Database) {
    this.db = db;
  }

  async getAllOrders(limit: number, page: number) {
    const sqlString = `SELECT o.OrderID AS Id, (od.Quantity * p.UnitPrice) AS 'Total Price', od.ProductID AS Products, od.Quantity AS Quantity, ShippedDate AS Shipped, ShipName  AS 'Ship Name', ShipCity AS City, ShipCountry AS Country
FROM Orders AS o
JOIN OrderDetails AS od ON o.OrderID = od.OrderID
JOIN Products AS p ON od.ProductID = p.ProductID
LIMIT ?
OFFSET ?;`;

    const offset: number = (page - 1) * limit;
    const data = await this.db
      .select(orders)
      .fields({
        Id: orders.orderId,
        'Total Price':
          sql`(${orderDetails.quantity} * ${products.unitPrice} * (1 - ${orderDetails.discount}))`.as<number>(),
        Products: orderDetails.productId,
        Quantity: orderDetails.quantity,
        Shipped: orders.shippedDate,
        'Ship Name': orders.shipName,
        City: orders.shipCity,
        Country: orders.shipCountry,
      })
      .leftJoin(orderDetails, eq(orders.orderId, orderDetails.orderId))
      .leftJoin(products, eq(orderDetails.productId, products.productId))
      .limit(limit)
      .offset(offset)
      .all();

    return { sqlString, data };
  }

  async orderInformationById(id: number) {
    const sqlString = `SELECT o.OrderID AS Id, CustomerID AS 'Customer Id', ShipName AS 'Ship Name', COUNT(od.OrderID) AS 'Total Products', 
SUM(od.Quantity) AS 'Total Quantity', SUM(od.Quantity * p.UnitPrice * (1 - od.Discount)) AS 'Total Price', 
SUM(od.Quantity * p.UnitPrice * od.Discount) AS 'Total Discount', s.CompanyName AS 'Ship Via', Freight, 
OrderDate AS 'Order Date', RequiredDate AS 'Required Date', ShippedDate AS 'Shipped Date', ShipCity AS 'Ship City', 
ShipRegion AS 'Ship Region', ShipPostalCode AS 'Ship Postal Code', ShipCountry AS 'Ship Country'
FROM Orders AS o
JOIN Shippers AS s ON o.ShipVia = s.ShipperID  
JOIN OrderDetails AS od ON o.OrderID = od.OrderID
JOIN Products AS p ON od.ProductID = p.ProductID
WHERE Id = 10248;`;

    const dataOrderInformation = await this.db
      .select(orders)
      .fields({
        Id: sql`count(${orders.orderId})`,
        'Customer Id': orders.customerId,
        'Ship Name': orders.shipName,
        'Total Products': sql`count(${orderDetails.orderId})`.as<number>(),
        'Total Quantity': sql`sum(${orderDetails.quantity})`.as<number>(),
        'Total Price':
          sql`sum(${orderDetails.quantity} * ${products.unitPrice} * (1 - ${orderDetails.discount}))`.as<number>(),
        'Total Discount':
          sql`sum(${orderDetails.quantity} * ${products.unitPrice} * ${orderDetails.discount})`.as<number>(),
        'Ship Via': shippers.companyName,
        Freight: orders.freight,
        'Order Date': orders.orderDate,
        'Required Date': orders.requiredDate,
        'Shipped Date': orders.shippedDate,
        'Ship City': orders.shipCity,
        'Ship Region': orders.shipRegion,
        'Ship Postal Code': orders.shipPostalCode,
        'Ship Country': orders.shipCountry,
      })
      .leftJoin(shippers, eq(orders.shipVia, shippers.shipperId))
      .leftJoin(orderDetails, eq(orders.orderId, orderDetails.orderId))
      .leftJoin(products, eq(orderDetails.productId, products.productId))
      .where(eq(orders.orderId, id))
      .all();

    return { sqlString, dataOrderInformation };
  }

  async productsInOrderById(id: number) {
    const sqlString = `SELECT o.OrderID AS OrderId, p.ProductID AS ProductID, p.ProductName AS Product, od.Quantity AS Quantity, p.UnitPrice AS 'Order Price', 
(od.Quantity * p.UnitPrice* (1 - od.Discount)) AS 'Total Price', (100 * od.Discount) AS Discount
FROM Orders AS o
JOIN OrderDetails AS od ON o.OrderID = od.OrderID
JOIN Products AS p ON od.ProductID = p.ProductID
WHERE o.OrderID = 10248;`;

    const dataProducts = await this.db
      .select(orders)
      .fields({
        Id: orders.orderId,
        ProductId: products.productId,
        Product: products.productName,
        Quantity: orderDetails.quantity,
        'Order Price': products.unitPrice,
        'Total Price':
          sql`${orderDetails.quantity} * ${products.unitPrice} * (1 - ${orderDetails.discount})`.as<number>(),
        Discount: sql`100 * ${orderDetails.discount}`,
      })
      .leftJoin(orderDetails, eq(orders.orderId, orderDetails.orderId))
      .leftJoin(products, eq(orderDetails.productId, products.productId))
      .where(eq(orders.orderId, id))
      .all();

    return { sqlString, dataProducts };
  }
}
