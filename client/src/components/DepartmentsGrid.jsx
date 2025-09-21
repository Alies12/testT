import React, { useState, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import DepartmentModal from "./DepartmentModal";

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const DepartmentsGrid = () => {
  const [rowData, setRowData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const columnDefs = [
    {
      headerName: "ID",
      field: "id",
      sortable: true,
      filter: true,
      checkboxSelection: true,
    },
    { headerName: "Имя", field: "name", sortable: true, filter: true },
    { headerName: "Бюджет", field: "budget", sortable: true, filter: true },
    {
      headerName: "Дата добавления",
      field: "established",
      sortable: true,
      filter: true,
      valueFormatter: (params) => formatDate(params.value),
    },
    {
      headerName: "Колличество сотрудников",
      field: "employee_count",
      sortable: true,
      filter: true,
    },
  ];

  const fetchDepartments = useCallback(() => {
    fetch("http://localhost:3000/api/departments")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {

        setRowData(data);
      })
      .catch((error) => {

        setRowData([]);
        alert("Ошибка загрузки департаментов: " + error.message);
      });
  }, []);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  const onSelectionChanged = useCallback((event) => {
    setSelectedRows(event.api.getSelectedRows());
  }, []);

  const handleAdd = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleEdit = () => {
    if (selectedRows.length === 1) {
      setEditData(selectedRows[0]);
      setIsModalOpen(true);
    } else {
      alert("Выберите ровно одну строку для редактирования");
    }
  };

  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      const ids = selectedRows.map((row) => row.id);
      try {
        await Promise.all(
          ids.map((id) =>
            fetch(`http://localhost:3000/api/departments/${id}`, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            }).then((response) => {
              if (!response.ok) {
                throw new Error(`Ошибка при удалении департамента ${id}`);
              }
            })
          )
        );
        fetchDepartments();
        setSelectedRows([]);
        alert("Департаменты успешно удалены");
      } catch (error) {
        alert("Не удалось удалить департамент: " + error.message);
      }
    } else {
      alert("Выберите хотя бы одну строку для удаления");
    }
  };

  const handleSave = async (formData) => {
    try {
      if (editData) {
        const response = await fetch(
          `http://localhost:3000/api/departments/${editData.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
        if (!response.ok) {
          throw new Error("Ошибка при обновлении департамента");
        }
        await response.json();
      } else {
        const response = await fetch("http://localhost:3000/api/departments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error("Ошибка при добавлении департамента");
        }
        await response.json();
      }
      fetchDepartments();
      alert(
        editData
          ? "Департамент успешно обновлён"
          : "Департамент успешно добавлен"
      );
    } catch (error) {
      alert("Не удалось сохранить департамент: " + error.message);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={handleAdd}>Добавить</button>
        <button onClick={handleEdit} disabled={selectedRows.length !== 1}>
          Изменить
        </button>
        <button onClick={handleDelete} disabled={selectedRows.length === 0}>
          Удалить
        </button>
      </div>
      <DepartmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editData}
      />
      <div className="ag-theme-quartz" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection={{ mode: "multiRow", checkboxes: true }}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50, 100]}
          onSelectionChanged={onSelectionChanged}
        />
      </div>
    </div>
  );
};

export default DepartmentsGrid;
