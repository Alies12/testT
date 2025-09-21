const EmployeeModel = require("../models/employee");

class EmployeeController {
  async getAll(req, res) {
    try {
      const employees = await EmployeeModel.getAll();
      res.json(employees);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getById(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid employee ID" });
    }
    try {
      const employee = await EmployeeModel.getById(id);
      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }
      res.json(employee);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getByDepartmentId(req, res) {
    const departmentId = parseInt(req.params.id);
    if (isNaN(departmentId)) {
      return res.status(400).json({ error: "Invalid department ID" });
    }
    try {
      const employees = await EmployeeModel.getByDepartmentId(departmentId);
      if (employees.length === 0) {
        return res
          .status(404)
          .json({ error: "No employees found for this department" });
      }
      res.json(employees);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async create(req, res) {
    const { department_id, first_name, last_name, salary, hire_date, age } =
      req.body;
    if (
      !department_id ||
      !first_name ||
      !last_name ||
      !salary ||
      !hire_date ||
      !age
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (
      isNaN(department_id) ||
      isNaN(salary) ||
      isNaN(age) ||
      new Date(hire_date).toString() === "Invalid Date"
    ) {
      return res.status(400).json({ error: "Invalid data format" });
    }
    try {
      const newEmployee = await EmployeeModel.create({
        department_id,
        first_name,
        last_name,
        salary,
        hire_date,
        age,
      });
      res.status(201).json(newEmployee);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req, res) {
    const id = parseInt(req.params.id);
    const { department_id, first_name, last_name, salary, hire_date, age } =
      req.body;
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid employee ID" });
    }
    if (
      !department_id ||
      !first_name ||
      !last_name ||
      !salary ||
      !hire_date ||
      !age
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (
      isNaN(department_id) ||
      isNaN(salary) ||
      isNaN(age) ||
      new Date(hire_date).toString() === "Invalid Date"
    ) {
      return res.status(400).json({ error: "Invalid data format" });
    }
    try {
      const updatedEmployee = await EmployeeModel.update(id, {
        department_id,
        first_name,
        last_name,
        salary,
        hire_date,
        age,
      });
      if (!updatedEmployee) {
        return res.status(404).json({ error: "Employee not found" });
      }
      res.json(updatedEmployee);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async delete(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid employee ID" });
    }
    try {
      const deletedCount = await EmployeeModel.delete(id);
      if (deletedCount === 0) {
        return res.status(404).json({ error: "Employee not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new EmployeeController();
