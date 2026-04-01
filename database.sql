CREATE DATABASE IF NOT EXISTS assignment3_app9;
USE assignment3_app9;

CREATE TABLE IF NOT EXISTS monthly_spending (
  id INT AUTO_INCREMENT PRIMARY KEY,
  month_number INT NOT NULL,
  month_name VARCHAR(20) NOT NULL,
  total DECIMAL(10,2) NOT NULL
);

INSERT INTO monthly_spending (month_number, month_name, total) VALUES
(1, 'Jan', 420.00),
(2, 'Feb', 580.00),
(3, 'Mar', 760.00),
(4, 'Apr', 610.00);
