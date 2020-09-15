

USE employeeTracker_DB;
INSERT INTO department(name)
VALUES("Marketing"), ("Sales"), ("Human Resource"), ("Retail"), ("Customer Service");

INSERT INTO role(title, salary, department_id)
VALUES ("Manager", 10000, 1), ("Developer", 5000, 2),("sales", 6000, 3), ("Engineer", 7000, 4), ("HR Manager", 8000, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("John", "Adam", 1,null), ("Tahmeena", "Javed", 2, null),("Geeta","Prasad", 3, null), ("Nitika", "Roy",4, null), ("Naghma","Ray",5, null);
