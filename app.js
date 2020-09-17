//Defining Dependencies
const inquirer = require("inquirer");
const table = require('console.table');

//setting connection with MySQL
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Falak@2019",
    database: "employeetracker_db"
});
//connection established
connection.connect(function (err) {
    if (err) throw err;
    console.log("Success! connected as id " + connection.threadId);
    startApplication();
});

//Function to start application and present questions for the user
function startApplication() {
    inquirer.prompt([{
        type: "list",
        name: "response",
        message: "What would you like to do?",
        choices: [
            "View All Employees by Department",
            "View All Employees by Manager",
            "View All Employees",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "End Connection"
        ]
        // Based on user selection the related function will be executed
    }]).then(function (data) {

        console.log(data.response)
        switch (data.response) {
            case "View All Employees by Department":
                getDepartment();
                break;
            case "View All Employees by Manager":
                getManager();
                break;
            case "View All Employees":
                getAll()
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Remove Employee":
                removeEmployee();
                break;
            case "Update Employee Role":
                updateRole();
                break;
            case "End Connection":
                endConnection();
                break;
        }
    })
}
// This function will end the connection
function endConnection() {
    connection.end();
    console.log("Connection Ended")
}
// Get the table by department
function getDepartment() {
    connection.query("select first_name, last_name,role_id, manager_id, title, salary, department_id, name  FROM role, employee, department where department.id = role.department_id and employee.role_id=role.id;",
    function (err, data) {
        if (err) throw err;
        console.table(data)
    
    const department = data.map(department => {
        return {
            id: `${department.name}`,
            value: department.name
        }
    })

    inquirer.prompt([{
            type: "list",
            name: "departments",
            message: "Which Department list you want to view?",
            choices: department
        
    }]).then(function (data) {
    connection.query("select * FROM employee, department where name = '" + data.departments + "';", function (err, data) {
        if (err) throw err;
        console.table(data)
        startApplication();
    })

    })
})
}

function getAll() {
    connection.query("select first_name, last_name,role_id, manager_id, title, salary, department_id, name FROM role, employee, department where department.id = role.department_id and employee.role_id=role.id;", function (err, data) {
        if (err) throw err;
        console.table(data)
        startApplication();
    })
}
// Get the data by Manager
function getManager() {
    connection.query("select first_name, last_name,role_id, manager_id, title, salary, department_id, name  FROM role, employee, department where department.id = role.department_id and employee.role_id=role.id;",
    function (err, data) {
        if (err) throw err;
        console.table(data)
    
    const manager = data.map(employee => {
        return {
            id: `${employee.manager_id}`,
            value: employee.manager_id
        }
    })

    inquirer.prompt([{
            type: "list",
            name: "managers",
            message: "Which Manager list you want to view?",
            choices: manager
        
    }]).then(function (data) {
    connection.query("select * FROM  employee where manager_id = " + data.managers + ";", function (err, data) {
        if (err) throw err;
        console.table(data)
        startApplication();
    })

    })
})
}

// Function to remove employee data
function removeEmployee() {
    connection.query("select * from employee", function (err, data) {

        if (err) throw err;
        console.table(data)

        const names = data.map(employee => {
            return {
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }
        })

        inquirer.prompt([{

            type: "list",
            name: "deleteName",
            message: "What would you like to do?",
            choices: names

        }]).then(response => {
            console.log(response.deleteName)

            console.log("Deleting Employee...\n");
            //query to delete employee data from My SQL
            connection.query(
                "DELETE FROM employee WHERE ?", {
                    id: (response.deleteName)
                },

                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " Employee deleted!\n");
                    startApplication()
                },
            )
        })
    })
};
// Function to update employee role
function updateRole() {
   // connection.query("select first_name, last_name,role_id, manager_id, title, salary, department_id, name  FROM role, employee, department where department.id = role.department_id and employee.role_id=role.id;",
   connection.query("select * from role" ,   
   function (err, data) {
            if (err) throw err;
            console.table(data)
          

            const rolesMap = data.map(role => {
                return {
                    value: role.id,
                    name: role.title
                }

             })
            connection.query("select first_name, last_name, id FROM employee", function(err, roles) {

                const names = roles.map(employee => {
                    return {
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id
                    }
                })

            inquirer.prompt([{
                    type: "list",
                    name: "updateRecord",
                    message: "What data you would like to update?",
                    choices: names
                },
                {
                    type: "list",
                    name: "updateRole",
                    message: "What role you would like to update?",
                    choices: rolesMap
                }
            ]).then(response => {
                // var roleSelected = response.updateRole
                // console.log(roleSelected)
                console.log(response)

                console.log("Updating Employee Role..\n");
                connection.query(
                    `UPDATE employee SET role_id =${response.updateRole}
                     WHERE?`, {
                        id: (response.updateRecord)
                    },


                    function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " Employee Role Updated!\n");
                        startApplication()
                    },
                )
            })
        })
        })
}
// Function to add employee role
function addEmployee() {
    connection.query("select first_name, last_name,role_id, manager_id, title, salary, department_id, name  FROM role, employee, department where department.id = role.department_id and employee.role_id=role.id;",
        function (err, data) {
            if (err) throw err;
            console.table(data)

            const roles = data.map(role => {
                return {
                    id: `${role.id}`,
                    value: role.title
                }
            })

            inquirer.prompt([{
                    type: "input",
                    name: "firstName",
                    message: "What is employee's first name?",
                },
                {
                    type: "input",
                    name: "lastName",
                    message: "What is employee's Last name?",
                },
                {
                    type: "list",
                    name: "title",
                    message: "What is employee's Title",
                    choices: roles
                },
                {
                    type: "input",
                    name: "departmentId",
                    message: "What is your Department ID?",
                },
                {
                    type: "input",
                    name: "roleId",
                    message: "What is your ID?",
                }

            ]).then(function (data) {
                console.log(data.firstName)
                //console.log("Adding Employee...\n")
                var sql = "INSERT INTO employee (first_name, last_name, role_id) VALUE('" + data.firstName + "', '" + data.lastName + "',  " + data.roleId + ")";
                var sql2 = "INSERT INTO role(title)VALUE('" + data.title + "', " + data.departmentId + ")";


                connection.query(sql, sql2, function (err, result) {
                    if (err) throw err;
                    console.log("1 record inserted");
                    connection.query("select * from employee;", function (err, data) {
                        if (err) throw err;
                        console.table(data)
                        startApplication();
                    });

                });

            });
        })
}