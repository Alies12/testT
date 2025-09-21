-- init-db.sql
-- Этот скрипт создаёт базу данных my_project_db (если она не существует), таблицы departments и employees,
-- и вставляет тестовые данные. Выполняется в одной команде psql -f init-db.sql.

-- Подключение к системной базе postgres для создания базы данных
\connect postgres;

-- Проверка и создание базы данных my_project_db
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'my_project_db') THEN
        PERFORM dblink_exec('dbname=postgres', 'CREATE DATABASE my_project_db');
    END IF;
END $$;

-- Подключение к базе my_project_db
\connect my_project_db;

-- Создание таблицы departments
CREATE TABLE IF NOT EXISTS departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    budget NUMERIC(10, 2) NOT NULL,
    established DATE NOT NULL,
    employee_count INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    department_id INTEGER NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    salary NUMERIC(8, 2) NOT NULL,
    hire_date DATE NOT NULL,
    age INTEGER NOT NULL
);

INSERT INTO departments (name, budget, established, employee_count) VALUES
('Инженеры', 500000.00, '2010-01-15', 50),
('Маркейтинг', 300000.00, '2012-05-20', 30),
('Финансы', 400000.00, '2008-03-10', 20);

INSERT INTO employees (department_id, first_name, last_name, salary, hire_date, age) VALUES
(1, 'Андрей', 'Имершен', 80000.00, '2020-06-01', 35),
(1, 'Мария', 'Васницова', 90000.00, '2019-04-15', 28),
(2, 'Алиса', 'Новикова', 60000.00, '2021-02-10', 42),
(2, 'Вова', 'Нежданов', 65000.00, '2018-11-05', 31),
(3, 'Аркадий', 'Паравозов', 75000.00, '2022-01-20', 39);