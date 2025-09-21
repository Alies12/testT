import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return dateString;
  }
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const EmployeesGrid = () => {
  const [rowData, setRowData] = useState([]);

  const columnDefs = [
    { headerName: "ID", field: "id", sortable: true, filter: true },
    {
      headerName: "ID департамента",
      field: "department_id",
      sortable: true,
      filter: true,
    },
    { headerName: "Имя", field: "first_name", sortable: true, filter: true },
    { headerName: "Фамилия", field: "last_name", sortable: true, filter: true },
    { headerName: "Зарплата", field: "salary", sortable: true, filter: true },
    {
      headerName: "Дата найма",
      field: "hire_date",
      sortable: true,
      filter: true,
      valueFormatter: (params) => formatDate(params.value),
    },
    { headerName: "Возраст", field: "age", sortable: true, filter: true },
  ];

  useEffect(() => {
    fetch("http://localhost:3000/api/employees")
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
        alert("Ошибка загрузки сотрудников: " + error.message);
      });
  }, []);

  return (
    <div className="ag-theme-quartz" style={{ height: 400, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 50, 100]}
      />
    </div>
  );
};

export default EmployeesGrid;
