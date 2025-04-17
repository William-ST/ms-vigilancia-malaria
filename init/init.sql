CREATE TABLE IF NOT EXISTS malaria (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ano INT,
  semana INT,
  departamento VARCHAR(100),
  provincia VARCHAR(100),
  distrito VARCHAR(100),
  ubigeo VARCHAR(10),
  falciparum INT,
  vivax INT
);

LOAD DATA INFILE '/docker-entrypoint-initdb.d/datos_abiertos_vigilancia_malaria_2000_2008.csv'
INTO TABLE malaria
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(ano, semana, departamento, provincia, distrito, ubigeo, falciparum, vivax);