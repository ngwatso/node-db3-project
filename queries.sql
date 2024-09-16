-- ?? Multi-Table Query Practice

-- ** Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT ProductName, CategoryName
FROM Product as P
JOIN Category as C
ON P.CategoryId = C.Id;

-- ** Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
SELECT O.Id, OrderDate, CompanyName
FROM [Order] as O
JOIN Shipper as S
ON O.ShipVia = S.Id
WHERE OrderDate < '2012-08-09';

-- ** Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
SELECT OrderId, ProductName, quantity
FROM OrderDetail as O
JOIN Product as P
ON O.ProductId = P.Id
WHERE OrderId = 10251
ORDER BY ProductName;

-- ** Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
SELECT O.Id as 'Order ID', CompanyName as 'Customer Name', LastName as 'Employee Last Name'
FROM [Order] as O
JOIN Employee as E
ON O.EmployeeId = E.Id
JOIN Customer as C
ON O.CustomerId = C.Id;
