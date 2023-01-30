export const getEpmloyeById = (id: number) => {
  return `SELECT em.EmployeeID AS Id, em.FirstName, em.LastName, em.Title, em.TitleOfCourtesy AS 'Title Of Courtesy', em.BirthDate AS 'Birth Date', 
em.HireDate AS 'Hire Date', em.Address, em.City, em.PostalCode AS 'Postal Code', em.Country, em.HomePhone AS 'Home Phone', em.Extension, em.Notes, 
em.ReportsTo AS 'Reports To', e.EmployeeID AS ReportEmployeeID, e.FirstName AS ReportFirstName, e.LastName AS ReportLastName
FROM Employees AS em
JOIN Employees AS e ON em.ReportsTo= e.EmployeeID  
WHERE em.EmployeeID = ${id};`
}

export const getEmployeeOrder = (id: number): string => {
  return `SELECT o.OrderID AS Id, CustomerID AS 'Customer Id', ShipName AS 'Ship Name', COUNT(od.OrderID) AS 'Total Products', 
  SUM(od.Quantity) AS 'Total Quantity', SUM(od.Quantity * p.UnitPrice * (1 - od.Discount)) AS 'Total Price', 
  SUM(od.Quantity * p.UnitPrice * od.Discount) AS 'Total Discount', s.CompanyName AS 'Ship Via', Freight, 
  OrderDate AS 'Order Date', RequiredDate AS 'Required Date', ShippedDate AS 'Shipped Date', ShipCity AS 'Ship City', 
  ShipRegion AS 'Ship Region', ShipPostalCode AS 'Ship Postal Code', ShipCountry AS 'Ship Country'
  FROM Orders AS o
  JOIN Shippers AS s ON o.ShipVia = s.ShipperID  
  JOIN OrderDetails AS od ON o.OrderID = od.OrderID
  JOIN Products AS p ON od.ProductID = p.ProductID
  WHERE Id = ${id};`;
}