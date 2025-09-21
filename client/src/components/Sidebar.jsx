import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Отделы и Сотрудники', icon: '📊' },
    { path: '/settings', label: 'Настройки', icon: '⚙️' },
    { path: '/reports', label: 'Отчёты', icon: '📈' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <h3>TestTask</h3>
      </div>
      <ul className="sidebar__nav">
        {menuItems.map((item) => (
          <li key={item.path} className="sidebar__item">
            <Link
              to={item.path}
              className={`sidebar__link ${location.pathname === item.path ? 'sidebar__link--active' : ''}`}
            >
              <span className="sidebar__link-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;