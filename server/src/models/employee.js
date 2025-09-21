const db = require('../db/db');

class EmployeeModel {
  async getAll() {
    return await db.any('SELECT * FROM employees');
  }

  async getById(id) {
    return await db.oneOrNone('SELECT * FROM employees WHERE id = $1', [id]);
  }

  async getByDepartmentId(departmentId) {
    return await db.any(
      'SELECT e.*, d.name AS department_name ' +
      'FROM employees e ' +
      'JOIN departments d ON e.department_id = d.id ' +
      'WHERE e.department_id = $1',
      [departmentId]
    );
  }

  async create(data) {
    const { department_id, first_name, last_name, salary, hire_date, age } = data;
    return await db.one(
      'INSERT INTO employees (department_id, first_name, last_name, salary, hire_date, age) ' +
      'VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [department_id, first_name, last_name, salary, hire_date, age]
    );
  }

  async update(id, data) {
    const { department_id, first_name, last_name, salary, hire_date, age } = data;
    return await db.oneOrNone(
      'UPDATE employees SET department_id = $1, first_name = $2, last_name = $3, ' +
      'salary = $4, hire_date = $5, age = $6 WHERE id = $7 RETURNING *',
      [department_id, first_name, last_name, salary, hire_date, age, id]
    );
  }

  async delete(id) {
    return await db.result('DELETE FROM employees WHERE id = $1', [id], r => r.rowCount);
  }
}

module.exports = new EmployeeModel();