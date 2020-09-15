//Defining Dependencies
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const Table= require("cli-table")


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

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
     createTables();
  });
  

function createTables(){
    const table = new Table({
        head: ['ID', 'title'],
        colWidths: [50, 50]
    });
    connection.query("CREATE TABLE department (id INT PRIMARY KEY, title VARCHAR(30))"),
    function(err, res) {
        if (err) throw err;
        console.log("success");}
    connection.query("INSERT INTO department(id,title) VALUES (433 ,'developer');"),
  
    function(err, res) {
        if (err) throw err;
        console.log("success");}

    table.push ([433,"Developer"]);
    console.log(table.toString());
     
}
     
     


// function readProducts() {
//     console.log("Selecting all products...\n");

//     connection.query("SELECT * FROM role", function(err, res) {
//         if (err) throw err;
//         console.log(res);
//         //updateProduct()
//       });
//     }
// function showTable(){
//     connection.query("show tables;", function(err, res) {
   
//      if (err) throw err;
//       // Log all results of the SELECT statement
//       //shows tables
//       console.log(res);
//       //connection.end();
      
//    });const table = new Table({
//     head: ['ID', 'First Name', 'Last Name','Role', 'Salary', 'Manager']
//   , colWidths: [20, 20,20,20,20,20]
// });

// // table is an Array, so you can `push`, `unshift`, `splice` and friends
// for (i=0; i<3; i++){
// table.push(
//     [1+i, 'Tahmeena', 'Javed','developer', '150000', 'todd']
// );}
// console.log(table.toString());}
   
  
//   afterConnection()
// function afterConnection(){

//     inquirer.prompt([{

       
//         //asks Department ID of Team member
//         type: "checkbox",
//         name: "response",
//         message: "What would you like to view?",
//         choices:[
// "View  all Employees by Department",
// "View all Employees by Manager",
// "View all Employees"


//         ]
                  
//     },
// ]).then(function (data) {

//     if(data.response =="View  all Employees by Department"){
//         getDepartment()
//         }
           
//           if (data.response =="View all Employees"){
//           getAll()

//           }
//           else{
//               getManager()
//           }         
//         })
//         function getDepartment(){
//             connection.query("select* from department")
//             console.log("success")
          

//         }
//         function  getAll(){
//             connection.query("select* from employee")
//             console.log("All")
//             showTable()
//             readProducts();

      

//         }
// function getManager(){
//     connection.query("select* from role")
//     console.log("Manager")

// }
//     }
