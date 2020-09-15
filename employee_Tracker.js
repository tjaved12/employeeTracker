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
   afterConnection();
});

function afterConnection() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err;
    console.log(res);
    updateProduct()
  });
}
function updateProduct() {
  console.log("Updating all employees...\n");
   connection.query(
    "UPDATE role SET id =33 WHERE? ",
    [
      
      {
        title: "Rocky Road"
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " roles updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      deleteProduct();
    }
  );

  function deleteProduct() {
    console.log("Deleting all role...\n");
    connection.query(
      "DELETE FROM role WHERE ?",
      {
        title: "Engineer"
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " roles deleted!\n");
        // Call readProducts AFTER the DELETE completes
        readProducts();
      }
    );
  }
  
  function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM role", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      connection.end();
    });
  }
}