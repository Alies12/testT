const db = require('../db/db');

exports.getAll = async (req, res) => {
  try {
    const departments = await db.any('SELECT * FROM departments');
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const department = await db.oneOrNone('SELECT * FROM departments WHERE id = $1', [id]);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.create = async (req, res) => {
  const { name, budget, established, employee_count } = req.body;
  try {
    const newDepartment = await db.one(
      'INSERT INTO departments (name, budget, established, employee_count) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, budget, established, employee_count]
    );
    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, budget, established, employee_count } = req.body;
  try {
    const updatedDepartment = await db.one(
      'UPDATE departments SET name=$1, budget=$2, established=$3, employee_count=$4 WHERE id=$5 RETURNING *',
      [name, budget, established, employee_count, id]
    );
    res.json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.result('DELETE FROM departments WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.json({ message: 'Department deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};