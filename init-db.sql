\connect postgres;

DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'my_project_db') THEN
        PERFORM dblink_exec('dbname=postgres', 'CREATE DATABASE my_project_db');
    END IF;
END $$;

\connect my_project_db;

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
('IT Department', 800000.00, '2013-01-12', 55),
('Sales', 420000.00, '2015-04-20', 40),
('Accounting', 350000.00, '2009-08-15', 22),
('Logistics', 510000.00, '2011-06-10', 35),
('Marketing', 470000.00, '2014-10-05', 28),
('Human Resources', 250000.00, '2012-03-18', 18),
('Production', 900000.00, '2008-11-25', 65),
('Research', 620000.00, '2016-02-14', 30),
('Security', 380000.00, '2010-07-22', 20),
('Legal', 300000.00, '2017-05-30', 12),
('Customer Support', 340000.00, '2015-12-08', 25),
('Design', 290000.00, '2018-03-15', 15),
('Maintenance', 430000.00, '2009-09-10', 24),
('Analytics', 400000.00, '2013-11-27', 18),
('Procurement', 370000.00, '2011-10-05', 22),
('Advertising', 330000.00, '2014-07-19', 20),
('Finance', 490000.00, '2008-04-12', 32),
('Software Development', 700000.00, '2016-09-28', 48),
('Project Management', 410000.00, '2012-12-15', 14),
('Testing', 360000.00, '2015-06-22', 16),
('Training', 280000.00, '2018-01-09', 12),
('Public Relations', 310000.00, '2010-05-03', 15);

INSERT INTO employees (department_id, first_name, last_name, salary, hire_date, age) VALUES
(1, 'James', 'Wilson', 85000.00, '2020-04-10', 33),
(1, 'Emma', 'Taylor', 98000.00, '2019-08-15', 28),
(1, 'Michael', 'Brown', 79000.00, '2021-10-22', 35),
(2, 'Sophie', 'Davis', 69000.00, '2022-03-05', 30),
(2, 'Liam', 'Clark', 73000.00, '2020-07-18', 37),
(2, 'Olivia', 'Lewis', 67000.00, '2021-05-12', 29),
(3, 'William', 'Walker', 71000.00, '2019-01-20', 41),
(3, 'Isabella', 'Hall', 75000.00, '2019-06-25', 36),
(4, 'Daniel', 'Allen', 70000.00, '2020-03-14', 34),
(4, 'Charlotte', 'Young', 72000.00, '2021-09-10', 31),
(5, 'Henry', 'King', 68000.00, '2022-02-15', 28),
(5, 'Amelia', 'Scott', 74000.00, '2019-11-05', 35),
(6, 'Thomas', 'Green', 63000.00, '2020-08-22', 39),
(6, 'Mia', 'Adams', 65000.00, '2021-04-18', 27),
(7, 'Charles', 'Baker', 88000.00, '2018-12-10', 44),
(7, 'Ava', 'Gonzalez', 82000.00, '2019-05-15', 33),
(8, 'Joseph', 'Nelson', 90000.00, '2020-07-05', 38),
(8, 'Harper', 'Carter', 87000.00, '2021-10-12', 30),
(9, 'David', 'Mitchell', 67000.00, '2022-01-25', 35),
(9, 'Ella', 'Perez', 69000.00, '2020-11-08', 32),
(10, 'Benjamin', 'Roberts', 71000.00, '2021-06-15', 29),
(10, 'Grace', 'Turner', 73000.00, '2019-09-20', 37),
(11, 'Lucas', 'Phillips', 66000.00, '2020-10-05', 31),
(11, 'Lily', 'Campbell', 68000.00, '2021-07-22', 28),
(12, 'Mason', 'Parker', 70000.00, '2022-02-10', 34),
(12, 'Chloe', 'Evans', 72000.00, '2020-01-15', 32),
(13, 'Ethan', 'Edwards', 69000.00, '2019-06-12', 36),
(13, 'Zoe', 'Collins', 71000.00, '2021-05-30', 29),
(14, 'Jacob', 'Stewart', 73000.00, '2020-09-25', 38),
(14, 'Mila', 'Sanchez', 75000.00, '2019-12-10', 35),
(15, 'Alexander', 'Morris', 67000.00, '2021-03-05', 31),
(15, 'Aria', 'Rogers', 69000.00, '2020-06-18', 30);