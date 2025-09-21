const db = require('../db/db');

class DepartmentModel {
  async getAll() {
    return await db.any('SELECT * FROM departments');
  }

  async getAllWithPagination(offset, limit) {
    const rows = await db.any(
      'SELECT * FROM departments ORDER BY id ASC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    const totalCount = await db.one('SELECT COUNT(*) FROM departments');
    return { rows, totalCount: parseInt(totalCount.count) };
  }

  async getById(id) {
    return await db.oneOrNone('SELECT * FROM departments WHERE id = $1', [id]);
  }

  async create(data) {
    const { name, budget, established, employee_count } = data;
    return await db.one(
      'INSERT INTO departments (name, budget, established, employee_count) ' +
      'VALUES ($1, $2, $3, $4) RETURNING *',
      [name, budget, established, employee_count]
    );
  }

  async update(id, data) {
    const { name, budget, established, employee_count } = data;
    return await db.oneOrNone(
      'UPDATE departments SET name = $1, budget = $2, established = $3, employee_count = $4 ' +
      'WHERE id = $5 RETURNING *',
      [name, budget, established, employee_count, id]
    );
  }

  async delete(id) {
    return await db.result('DELETE FROM departments WHERE id = $1', [id], r => r.rowCount);
  }
}

module.exports = new DepartmentModel();