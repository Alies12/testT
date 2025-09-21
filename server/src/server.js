const express = require('express');
const cors = require('cors');
const departmentRoutes = require('./routes/department');
const employeeRoutes = require('./routes/employee');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/departments', departmentRoutes);
app.use('/api/employees', employeeRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});