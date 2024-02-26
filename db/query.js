const viewDept =
    `SELECT * FROM department`;

const viewRoles =
    `SELECT title, role.id as role_id, salary, department.name as department
FROM role
LEFT JOIN department ON role.department_id = department.id;`

const viewEmployees =
    `SELECT employee.id as employee_id, employee.first_name, employee.last_name, role.title as job_title, department.name as department, role.salary, manager.manager_first_name
FROM employee
JOIN role ON role.id = employee.role_id
JOIN department ON role.department_id = department.id
LEFT OUTER JOIN (SELECT employee.id as manager_id, employee.first_name as manager_first_name, employee.last_name as manager_last_name FROM employee) manager ON employee.manager_id = manager.manager_id;`


const addDept =
    `INSERT INTO department (name)
VALUES (?);
SELECT * FROM department;`;

const addRole = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`;

const addEmployee =
    `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    SELECT ?, ?, role.id, employee.id
    FROM role, employee
    WHERE role.id = ? 
    AND employee.id = ?`

const updateEmployee =
    `UPDATE employee
    SET role_id = (SELECT role.id FROM role WHERE role.id = ?)
    WHERE id = ?;`


module.exports = { viewDept, viewRoles, viewEmployees, addDept, addRole, addEmployee, updateEmployee }