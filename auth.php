CREATE TABLE login(
    id INT AUTO_INCREMENT  PRIMARY KEY,
    user_name VARCHAR(250) NOT NULL,
    password INT(11) NOT NULL,
    created_by VARCHAR(250) NOT NULL,
    Updated_at DATE NOT NULL
 );