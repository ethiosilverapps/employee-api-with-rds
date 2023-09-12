-- Use this quires to setup tables and some sample data 

CREATE DATABASE emp;

USE emp;

-- Drop all tables if they exist
DROP TABLE employee;
DROP TABLE person;
DROP TABLE job_title;
DROP TABLE department;

-- Create all the tables we need 
CREATE TABLE person (
	person_id int NOT NULL AUTO_INCREMENT, 
    first_name varchar(255) NOT NULL, 
    last_name varchar(255) NOT NULL, 
    email varchar(255) NOT NULL, 
    PRIMARY KEY (person_id)
);
CREATE TABLE job_title (
	job_title_id int NOT NULL AUTO_INCREMENT, 
    title_name varchar(255) NOT NULL, 
    base_salary decimal(10,2), 
    PRIMARY KEY (job_title_id)
);
CREATE TABLE department (
	department_id int NOT NULL AUTO_INCREMENT, 
    department_name varchar(255) NOT NULL, 
    required_num_emp int, 
    PRIMARY KEY (department_id)
);
CREATE TABLE employee (
	employee_id int NOT NULL AUTO_INCREMENT, 
    person_id int NOT NULL, 
    job_title_id int NOT NULL, 
    department_id int NOT NULL, 
    start_date date, 
    PRIMARY KEY (employee_id), 
    FOREIGN KEY (person_id) REFERENCES person(person_id), 
    FOREIGN KEY (job_title_id) REFERENCES job_title(job_title_id), 
    FOREIGN KEY (department_id) REFERENCES department(department_id)
);

SHOW tables;

-- Insert Data
INSERT INTO person (first_name, last_name, email) VALUES ('Nahom', 'Abebe', 'nabebe@example.com');
Set @person1 = last_insert_id();
INSERT INTO person (first_name, last_name, email) VALUES ('Melat', 'Bekele', 'mbekele@example.com');
Set @person2 = last_insert_id();

-- job_title
INSERT INTO job_title (title_name, base_salary) VALUES ('Software Engineer', 120000.00);
Set @job_title1 = last_insert_id();
INSERT INTO job_title (title_name, base_salary) VALUES ('HR Manager', 140000.00);
Set @job_title2 = last_insert_id();

-- department
INSERT INTO department (department_name, required_num_emp) VALUES ('IT', 250);
Set @department1 = last_insert_id();
INSERT INTO department (department_name, required_num_emp) VALUES ('HR', 10);
Set @department2 = last_insert_id();


-- employee
INSERT INTO employee (person_id, job_title_id, department_id, start_date) VALUES (@person1,  @job_title1, @department1, curdate());
INSERT INTO employee (person_id, job_title_id, department_id, start_date) VALUES (@person2,  @job_title2, @department2, curdate());


SELECT * FROM person;
SELECT emp.employee_id, p.first_name, p.last_name, t.title_name, d.department_name
FROM employeeDB.employee emp, employeeDB.person p, employeeDB.job_title t, employeeDB.department d
WHERE emp.person_id=p.person_id AND emp.job_title_id=t.job_title_id AND emp.department_id=d.department_id;




