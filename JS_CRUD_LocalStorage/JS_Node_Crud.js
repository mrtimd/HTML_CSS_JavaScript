// server.js
const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');

const app = express();
app.use(bodyParser.json());

// SQL Server connection configuration
const dbConfig = {
  user: 'your_username',
  password: 'your_password',
  server: 'localhost',
  database: 'AdventureWorksLT2022',
  options: {
    encrypt: true, // Use encryption for Azure SQL
    trustServerCertificate: true, // For local development
  },
};

// GET all customers
app.get('/customers', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query('SELECT FirstName, LastName FROM SalesLT.Customer');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// CREATE a new customer
app.post('/customers', async (req, res) => {
  const { FirstName, LastName } = req.body;
  try {
    const pool = await sql.connect(dbConfig);
    await pool.request()
      .input('FirstName', sql.NVarChar, FirstName)
      .input('LastName', sql.NVarChar, LastName)
      .query('INSERT INTO SalesLT.Customer (FirstName, LastName) VALUES (@FirstName, @LastName)');
    res.send('Customer added successfully!');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// UPDATE a customer
app.put('/customers/:id', async (req, res) => {
  const { id } = req.params;
  const { FirstName, LastName } = req.body;
  try {
    const pool = await sql.connect(dbConfig);
    await pool.request()
      .input('CustomerID', sql.Int, id)
      .input('FirstName', sql.NVarChar, FirstName)
      .input('LastName', sql.NVarChar, LastName)
      .query('UPDATE SalesLT.Customer SET FirstName = @FirstName, LastName = @LastName WHERE CustomerID = @CustomerID');
    res.send('Customer updated successfully!');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE a customer
app.delete('/customers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(dbConfig);
    await pool.request()
      .input('CustomerID', sql.Int, id)
      .query('DELETE FROM SalesLT.Customer WHERE CustomerID = @CustomerID');
    res.send('Customer deleted successfully!');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
