const inquirer = require("inquirer");
const mysql = require("mysql2/promise");

const { viewDeptSQL, viewRolesSQL, viewEmployeesSQL, addDeptSQL, addRoleSQL, addEmployeeSQL, updateEmployeeSQL } = require("./db/query");

let db;
(async function () {
    db = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "employee_db",
        multipleStatements: true
    });
    console.log("Connected to database");
})();

const questions = [
    {
        type: "list",
        name: "options",
        message: "Select from the available choices",
        choices: [
            "View departments",
            "View roles",
            "View employees",
            "Add department",
            "Add role",
            "Add employee",
            "Update employee",
            "Exit",
        ],
    },
];

const addDeptInq = [
    {
        type: "input",
        name: "newDept",
        message: "Enter department name",
    },
];

const addRoleInq = [
    {
        type: "input",
        name: "roleName",
        message: "Enter role name",
    },
    {
        type: "number",
        name: "salary",
        message: "Enter role salary",
    },
    {
        type: "list",
        name: "department",
        message: "Enter role department",
        choices: [],
    },
];

const addEmployeeInq = [
    {
        type: "input",
        name: "employeeFirstName",
        message: "Enter employee first name",
    },
    {
        type: "input",
        name: "employeeLastName",
        message: "Enter employee last name",
    },
    {
        type: "list",
        name: "roleTitle",
        message: "Select employee role",
        choices: [],
    },
    {
        type: "list",
        name: "managerName",
        message: "Select employee manager",
        choices: [],
    },
];

const updateEmployeeInq = [
    {
        type: "list",
        name: "employee",
        message: "Select employee to update",
        choices: [],
    },
    {
        type: "list",
        name: "employeeRole",
        message: "Select role for employee",
        choices: [],
    },
];

async function employeeTracker() {
    try {
        const answers = await inquirer.prompt(questions);

        switch (answers.options) {
            case "View departments": {
                const [rows] = await db.query(viewDeptSQL);
                console.table(rows);
                console.log("View departments");
                employeeTracker();
                break;
            }

            case "View roles": {
                const [rows] = await db.execute(viewRolesSQL);
                console.table(rows);
                employeeTracker();
                break;
            }

            case "View employees": {
                const [rows] = await db.execute(viewEmployeesSQL);
                console.table(rows);
                employeeTracker();
                break;
            }

            case "Add department": {
                async function addDept() {
                    try {
                        const answers = await inquirer.prompt(addDeptInq);
                        console.log("New department:", answers.newDept);
                        const [rows] = await db.query(addDeptSQL, [answers.newDept]);
                        console.log("All departments:");
                        console.table(rows[1]);
                        console.log("Successfully added department");
                        employeeTracker();
                    } catch (error) {
                        console.error(error.message);
                        employeeTracker();
                    }
                }
                addDept();
                break;
            }

            case "Add role": {
                async function addRole() {
                    try {
                        const [departments] = await db.query(viewDeptSQL);
                        addRoleInq[2].choices = departments.map((e) => e.name);
                        const { roleName, salary, department } = await inquirer.prompt(
                            addRoleInq
                        );
                        const depId = departments.find((e) => e.name === department).id;
                        const [rows] = await db.query(addRoleSQL, [
                            roleName,
                            salary,
                            depId,
                        ]);
                        console.log("Successfully added role");
                        const roles = await db.query(viewRolesSQL);
                        console.table(roles[0]);
                        employeeTracker();
                    } catch (error) {
                        console.error(error.message);
                        employeeTracker();
                    }
                }
                addRole();
                break;
            }

            case "Add employee": {
                async function addEmployee() {
                    try {
                        const [roles] = await db.query(viewRolesSQL);
                        addEmployeeInq[2].choices = roles.map((e) => e.title);

                        const [employees] = await db.query(viewEmployeesSQL);
                        addEmployeeInq[3].choices = employees.map((e) => e.first_name);

                        const {
                            employeeFirstName,
                            employeeLastName,
                            roleTitle,
                            managerName,
                        } = await inquirer.prompt(addEmployeeInq);

                        console.log(roles);
                        console.log(employees);

                        const roleId = roles.find((e) => e.title === roleTitle).role_id;
                        const managerId = employees.find(
                            (e) => e.first_name === managerName
                        ).employee_id;

                        const [rows] = await db.query(addEmployeeSQL, [
                            employeeFirstName,
                            employeeLastName,
                            roleId,
                            managerId,
                        ]);

                        console.log(
                            "Successfully added employee"
                        );
                        const [viewEmployee] = await db.query(viewEmployeesSQL);
                        console.table(viewEmployee);
                        employeeTracker();
                    } catch (error) {
                        console.error(error.message);
                        employeeTracker();
                    }
                }
                addEmployee();
                break;
            }

            case "Update employee": {
                async function updateEmployee() {
                    try {
                        const [employees] = await db.query(viewEmployeesSQL);
                        updateEmployeeInq[0].choices = employees.map((e) => e.first_name);

                        const [roles] = await db.query(viewRolesSQL);
                        updateEmployeeInq[1].choices = roles.map((e) => e.title);

                        const { employee, employeeRole } = await inquirer.prompt(
                            updateEmployeeInq
                        );

                        const employeeId = employees.find(
                            (e) => e.first_name === employee
                        ).employee_id;
                        const roleId = roles.find((e) => e.title === employeeRole).role_id;

                        const [rows] = await db.query(updateEmployeeSQL, [
                            roleId,
                            employeeId,
                        ]);

                        console.log("Successfully updated employee info");
                        employeeTracker();
                    } catch (error) {
                        console.error(error.message);
                        employeeTracker();
                    }
                }
                updateEmployee();
                break;
            }
            case "Exit": {
                db.end();
            };
        }
    } catch (error) {
        console.error(error.message);
    }
};

employeeTracker();