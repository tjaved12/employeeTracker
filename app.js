//Defining Dependencies
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const Table = require("cli-table")


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

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});


function createTables() {
    const table = new Table({
        head: ['ID', 'title'],
        colWidths: [50, 50]
    });
    connection.query("CREATE TABLE department (id INT PRIMARY KEY, title VARCHAR(30))"),
        function (err, res) {
            if (err) throw err;
            console.log("success");
        }
    connection.query("INSERT INTO department(id,title) VALUES (433 ,'developer');"),

        function (err, res) {
            if (err) throw err;
            console.log("success");
        }

    table.push([433, "Developer"]);
    console.log(table.toString());

}

function afterConnection() {

    inquirer.prompt([{

        type: "list",
        name: "response",
        message: "What would you like to do?",
        choices: [
            "View all Employees by Department",
            "View all Employees by Manager",
            "View all Employees",
            "Add Employee",
            "Delete Employee",
            "Update Employee"
        ]

    }]).then(function (data) {

        console.log(data.response)
        switch(data.response) {
            case "View all Employees by Department":
            getDepartment();
            break;
            case "View all Employees": 
            getAll()
            break; 
            case "Delete Employee":
            removeEmployee();
            break;
        }
        
    })
}

function getDepartment() {
    connection.query("select * from department", function (err, data) {
        if (err) throw err;
        console.table(data)
        afterConnection(); 
    })
}

function removeEmployee() {
    connection.query("select * from employee", function (err, data) {
       
        // if (err) throw err;
        // console.table(data)

        const names = data.map(employee => {
            return {
                name: `${employee.first_name} ${employee.last_name}`,
                id: employee.id
            }
       
    })

    inquirer.prompt([{

        type: "list",
        name: "deleteName",
        message: "What would you like to do?",
        choices: names

    }]).then(response => {
        console.log(response.deleteName)
    })



   

}); 

}

function getAll() {
    connection.query("select * from employee", function (err, data) {
        if (err) throw err;
        console.table(data)
        afterConnection(); 
    })
}

function getManager() {
    connection.query("select * from role", function (err, data) {
        if (err) throw err;
        console.table(data)
        afterConnection(); 
    })
};
