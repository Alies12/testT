import React, { useState, useEffect } from "react";

const DepartmentModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    budget: "",
    established: "",
    employee_count: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        budget: initialData.budget ? initialData.budget.toString() : "",
        established: initialData.established
          ? initialData.established.split("T")[0]
          : "",
        employee_count: initialData.employee_count
          ? initialData.employee_count.toString()
          : "",
      });
      setErrors({});
    } else {
      setFormData({
        name: "",
        budget: "",
        established: "",
        employee_count: "",
      });
      setErrors({});
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Название обязательно";
    if (
      !formData.budget ||
      isNaN(formData.budget) ||
      parseFloat(formData.budget) <= 0
    ) {
      newErrors.budget = "Бюджет должен быть положительным числом";
    }
    if (!formData.established)
      newErrors.established = "Дата основания обязательна";
    if (
      !formData.employee_count ||
      isNaN(formData.employee_count) ||
      parseInt(formData.employee_count, 10) < 0
    ) {
      newErrors.employee_count =
        "Количество сотрудников должно быть неотрицательным числом";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const submitData = {
        name: formData.name.trim(),
        budget: parseFloat(formData.budget),
        established: formData.established,
        employee_count: parseInt(formData.employee_count, 10),
      };
      onSave(submitData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal">
        <h2>
          {initialData ? "Редактировать департамент" : "Добавить департамент"}
        </h2>
        <div>
          <label>Название:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Название"
            required
          />
          {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
        </div>
        <div>
          <label>Бюджет:</label>
          <input
            name="budget"
            type="number"
            step="0.01"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Бюджет"
            required
          />
          {errors.budget && (
            <span style={{ color: "red" }}>{errors.budget}</span>
          )}
        </div>
        <div>
          <label>Дата основания:</label>
          <input
            name="established"
            type="date"
            value={formData.established}
            onChange={handleChange}
            required
          />
          {errors.established && (
            <span style={{ color: "red" }}>{errors.established}</span>
          )}
        </div>
        <div>
          <label>Количество сотрудников:</label>
          <input
            name="employee_count"
            type="number"
            value={formData.employee_count}
            onChange={handleChange}
            placeholder="Количество сотрудников"
            required
          />
          {errors.employee_count && (
            <span style={{ color: "red" }}>{errors.employee_count}</span>
          )}
        </div>
        <div style={{ marginTop: "10px" }}>
          <button onClick={handleSubmit}>Сохранить</button>
          <button onClick={onClose}>Отмена</button>
        </div>
      </div>
    </>
  );
};

export default DepartmentModal;
