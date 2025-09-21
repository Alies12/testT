import React from "react";
import DepartmentsGrid from "./DepartmentsGrid";
import EmployeesGrid from "./EmployeesGrid";

const Dashboard = () => {
  return (
    <div>
      <div className="header">
        <div className="header__title"></div>
        <div className="header__user">
          <div className="header__user-avatar">АС</div>
          <span>Сингаевский Андрей</span>
        </div>
      </div>
      <div className="card">
        <h2 className="card__title">Отделы</h2>
        <DepartmentsGrid />
      </div>
      <div className="card">
        <h2 className="card__title">Сотрудники</h2>
        <EmployeesGrid />
      </div>
    </div>
  );
};

export default Dashboard;
