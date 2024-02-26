INSERT INTO department (name)
VALUES  ("Research"),
        ("Engineering"),
        ("Marketing"),
        ("Human Resources"),
        ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES  ("Research Manager", 120000, 1),
        ("Research Lead", 80000, 1),
        ("Research Assistant", 60000, 1),
        ("Engineering Manager", 120000, 2),
        ("Lead Engineer", 80000, 2),
        ("Software Engineer", 70000, 2),
        ("Marketing Manager", 100000, 3),
        ("Data Analyst", 70000, 3),
        ("Community Manager", 60000, 3),
        ("Human Resources Manager", 100000, 4),
        ("Human Resources Specialist", 70000, 4),
        ("Human Resources Assistant", 60000, 4),
        ("Legal Manager", 120000, 5),
        ("Lawyer", 100000, 5),
        ("Accountant", 60000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Al", "Schwartz",  1, NULL),
        ("Ben", "Benson",  2, 1),
        ("Charlie", "Charleston",  3, 1), 
        ("Dan", "Phantom",  4, NULL), 
        ("Emily", "Dickons",  5, 2),
        ("Frank", "Dukes",  6, 2), 
        ("Gojo", "Satoru",  7, NULL), 
        ("Henry", "Ford",  8, 3), 
        ("Ian", "Francis",  9, 3), 
        ("Jessica", "Alba",  10, NULL), 
        ("Karl", "Marx",  11, 4), 
        ("Larry", "Lobster",  12, 4),
        ("Marissa", "Marie",  13, NULL), 
        ("Natasha", "Nash",  14, 5), 
        ("Oedipus", "Thebes",  15, 5);