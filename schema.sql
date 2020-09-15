DROP DATABASE IF EXISTS employeeTracker_DB;
CREATE DATABASE employeetracker_db;

use employeetracker_db;

create table department(
    id int not null AUTO_INCREMENT,
    name varchar(30),
    PRIMARY Key(id)
);



create table role(
    id int not null AUTO_INCREMENT,
    title varchar(30),
    salary DECIMAL(10,2),
    department_id int,
    PRIMARY Key(id)
);

create table employee(
    id int not null AUTO_INCREMENT,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int,
    PRIMARY Key(id)
);